import os
from flask import Flask, request, jsonify
from langchain_groq import ChatGroq
from bson.objectid import ObjectId
from sentence_transformers import SentenceTransformer, util
from pymongo.mongo_client import MongoClient
from pinecone import Pinecone
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Initialize Groq chat with the model
groq_api_key = os.getenv("GROQ_API_KEY")
groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name='mixtral-8x7b-32768')

# MongoDB connection
uri = "mongodb+srv://Nidhish:Nidhish@coephackathon.pbuvv.mongodb.net/?retryWrites=true&w=majority&appName=CoepHackathon"
client = MongoClient(uri)
db = client["mytestdb"]
collection = db["mytestcollection"]

# Pinecone setup
pc = Pinecone(api_key="f68b6c67-0cfd-47b3-980b-5c29ea360fbf")
index = pc.Index("mongo")

# Load SentenceTransformer model
embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def get_result(query, similar_result=1):
    embedding = embedding_model.encode(query)
    embedding = embedding.tolist()

    result = index.query(
        vector=embedding,
        top_k=similar_result,
    )
    return result

def get_combined_information(query):
    result = get_result(query)
    mylist = []
    
    # Retrieve relevant documents from database using the query
    for i in range(len(result["matches"])):
        value = result["matches"][i]['id']
        mylist.append(collection.find_one({"_id": ObjectId(value)}))
    
    combined_information = ""
    titles = []
    fullplots = []
    file_paths = []
    
    for i in range(len(mylist)):
        title = mylist[i]["code_snippet"]
        fullplot = mylist[i]["fullplot"]
        file_path = mylist[i].get("file_path", "No file path available")
        
        titles.append(title)
        fullplots.append(fullplot)
        file_paths.append(file_path)
        
        combined_information += f"Code snippet: {title}\nFull plot: {fullplot}\nFile path: {file_path}\n\n"
    
    return combined_information, titles, fullplots, file_paths

def analyze_code_snippets(titles, file_paths):
    results = []
    
    for i in range(len(titles)):
        code_snippet = titles[i]
        file_path = file_paths[i]
        
        prompt = f"You are an AI coding assistant. Analyze the following code snippet:\n\nCode snippet:\n{code_snippet}\nFile path: {file_path}\n\n"

        try:
            result = groq_chat.invoke(prompt)
            if hasattr(result, 'content'):
                clean_result = result.content.replace("\\n", "\n")
            else:
                clean_result = str(result).replace("\\n", "\n")
            results.append(clean_result)
        except Exception as e:
            results.append(f"Error analyzing code snippet at {file_path}: {str(e)}")
    
    return results

@app.route('/fetch-code', methods=['POST'])
def fetch_code_information():
    query = request.json.get('query')
    if not query:
        return jsonify({"error": "Please enter a valid query."}), 400

    combined_information, titles, fullplots, file_paths = get_combined_information(query)

    analysis_results = analyze_code_snippets([titles[0]], [file_paths[0]])

    return jsonify({
        "combined_information": combined_information,
        "titles": titles,
        "fullplots": fullplots,
        "file_paths": file_paths,
        "analysis_results": analysis_results
    })

if __name__ == '__main__':
    app.run(debug=True)
