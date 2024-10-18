import os
import streamlit as st
from langchain_groq import ChatGroq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Streamlit app
st.title("AI-Powered Coding Assistant")

# Get the Groq API key from environment variables
groq_api_key = os.getenv("GROQ_API_KEY")

# Initialize Groq chat with model
groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name='mixtral-8x7b-32768')

# Input code query from the user
query = st.text_area("Enter the code you want to analyze", height=200)

# Set up the prompt for the Groq model
prompt = (
    f"You are a helpful coding assistant that supports new developers. "
    f"When responding, make sure to address what technical guidelines have been followed and what custom guidelines should be followed. "
    f"Just write the guidelines, don't write any code.\n"
    f"User Query: {query}\n"
)

# Button to trigger the analysis
if st.button("Analyze Code"):
    if query.strip() == "":
        st.error("Please enter a valid code to analyze.")
    else:
        with st.spinner("Analyzing code..."):
            try:
                # Invoke Groq model with the prompt
                result = groq_chat.invoke(prompt)

                # Extract the content from the AIMessage object
                if hasattr(result, 'content'):
                    clean_result = result.content.replace("\\n", "\n")
                else:
                    clean_result = str(result).replace("\\n", "\n")

                st.success("Analysis completed!")

                # Display the result using markdown for clean formatting
                    

            except Exception as e:
                st.error(f"An error occurred: {str(e)}")
