import os
import pymongo
from langchain_groq import ChatGroq

from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://Nidhish:Nidhish@coephackathon.pbuvv.mongodb.net/?retryWrites=true&w=majority&appName=CoepHackathon"

client = MongoClient(uri)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# groq_chat = ChatGroq(groq_api_key=os.getenv('GROQ_API_KEY'), model_name='mixtral-8x7b-32768')
# groq_chat1 = ChatGroq(groq_api_key=os.getenv('GROQ_API_KEY'), model_name='mixtral-8x7b-32768')



# db=client["mytestdb"]
# collection=db["mytestcollection"]

# def process_file(file_path):
#     with open(file_path, 'r') as file:
#         code = file.read()

#     # Send the code content to Groq for generating description and tags
    
#     prompt1 = (
#     f"You are a helpful coding assistant that supports in analysing code and generating description of that code in one sentence. "
#     f"User Query: {code}\n"
#     )
#     prompt2 = (
#     f"You are a helpful coding assistant that supports in analysing code generating technical tags"
#     f"User Query: {code}\n"
#     )
#     description_response = groq_chat.invoke(prompt1)
#     tags_response = groq_chat1.invoke(prompt2)

#     # Extract content from the response (assuming `description_response` and `tags_response` are AIMessage objects)
#     description = description_response['content'] if isinstance(description_response, dict) else description_response.content
#     tags = tags_response['content'] if isinstance(tags_response, dict) else tags_response.content
    
#     # Create the document to be inserted in MongoDB
#     document = {
#         "repository": "Repo3",  # Replace with actual repo name or fetch dynamically
#         "file_path": file_path,
#         "code_snippet": code,
#         "fullplot": description,
#         "tags": tags
#     }

#     # print(document)
#     # print("\n")
    
#     # Insert into MongoDB
#     # collection.insert_one(document)
#     # print(f"Inserted document for {file_path}")

# # Directory to scan for code files
# directory_path = 'Cloned_repo'

# # Iterate through all files in the directory
# for root, dirs, files in os.walk(directory_path):
#     for file in files:
#         file_path = os.path.join(root, file)
#         process_file(file_path)