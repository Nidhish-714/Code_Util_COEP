import "./App.css";
import gptLogo from "./assets/chatgpt1.png";
import tiestoeverylogo from "./assets/tietologo.png";
import addBtn from "./assets/add-30.png";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/my-face.jpg";
import gptImgLogo from "./assets/chat_bot_icon.jpeg";
import { useEffect, useRef, useState } from "react";
// import { saveChatToCache, saveCacheToDb, fetchChatFromDb, fetchChats } from './services/api';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Markdown from 'markdown-to-jsx';


function App() {
  
  const MyMarkdownComponent = ({ markdownText }) => {
    return (
      <div className="markdown-container">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {markdownText}
        </ReactMarkdown>
      </div>
    );
  };
  function addBulletPoints(text) {
    // Split the text into lines
    const lines = text.split('\n');
    // Initialize variables
    let inList = false;
    const result = [];
    
    // Process each line
    for (let line of lines) {
      // Trim whitespace from the beginning and end of the line
      line = line.trim();
      // console.log(line)
      
      // Check if the line is a header
      if (line.startsWith('**') && line.endsWith('**')) {
        // If we were in a list, add an extra newline to separate it from the header
        if (inList) {
          result.push('');
          inList = false;
        }
        result.push(line);
      } 
      // Check if the line is a separator
      else if (line.startsWith('====') || line.startsWith('----')) {
        // If we were in a list, add an extra newline to separate it from the separator
        if (inList) {
          result.push('');
          inList = false;
        }
        result.push(line);
      }
      // Check if the line is not empty and not already a bullet point
      else if (line && !line.startsWith('*')) {
        // Add a bullet point to the line
        result.push(` * ${line} \n `);
        inList = true;
      } 
      // If the line is empty, just add it as is
      else {
        result.push(line);
        inList = false;
      }
    }
    
    // Join the processed lines back into a single string
    console.log(result.join('\n'))
    return result.join('\n');
  }

  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("Generation");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [similarQuestion, setSimilarQuestion] = useState("");
  const [previousResponses, setPreviousResponses] = useState([]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  // useEffect(() => {
  //   const loadChats = async () => {
  //     try {
  //       const chats = await fetchChats();
  //       setPreviousChats(chats);
  //     } catch (error) {
  //       console.error('Error loading chats', error);
  //     }
  //   };
  //   loadChats();
  // }, []);

  const clearSimilarQuestion = () => {
    setSimilarQuestion("");
  };

  const handleSend = async () => {
    const text = input;
    setInput("");

    const userMessage = { text, isBot: false, option };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setPreviousResponses((prevResponses) => [...prevResponses, userMessage]);

    try {
      // const response = await saveChatToCache([userMessage]);
      // console.log({body: {
      //   'query': text,
      // },})
      const response = await fetch("http://127.0.0.1:5000/fetch-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({
          // Stringify the body
          query: text, // Ensure 'text' is defined and has a value
        }),
      });

      if (!response) {
        throw new Error("Unexpected API response format");
      }

      // const chatData = response.chat_data;
      // const similarQ = response.similar_question || "";

      // setSimilarQuestion(similarQ);

      // const botResponses = chatData.filter(msg => msg.isBot);
      // if (botResponses.length > 0) {
      //   const botMessages = botResponses.map(botResponse => ({
      //     text: botResponse.text,
      //     isBot: true,
      //     option
      //   }));

      const data = await response.json();  // Parse the JSON response
      // const data = {
      //   analysis_results: [
      //     "**Technical Guidelines Followed in the Code** \n =====================================================\n\n* **Flask Application Structure**: The code follows the standard structure for a Flask web application. It starts with importing the required modules, loading environment variables, and then defines the application routes.\n\n* **API Route Protection**: The code checks the request method to ensure that only POST requests are allowed for the `/generate_lesson_plan` endpoint. This helps prevent unwanted requests and ensures the security of the API.\n\n* **Error Handling**: The code includes error handling for cases where the required `topic` parameter is missing or when an exception occurs during lesson plan generation. This provides useful error messages to the API users and helps with debugging.\n\n* **Environment Variable Management**: The code uses the `dotenv` library to load environment variables from a `.env` file. This is a good practice for managing sensitive information like API keys and other configuration settings.\n\n* **Logging and Debugging**: The code runs the Flask application in debug mode (`app.run(debug=True)`). This enables features like automatic reloading of the application when code changes are detected and provides detailed error messages for debugging purposes.\n\n**Custom Guidelines Followed in the Code**\n==========================================\n\n* **Custom Model Configuration**: The code creates a custom LLM (Large Language Model) configuration using the `config.LLMConfig` class from the `educhain` library. This allows for specifying a custom model (in this case, `llama`) and its API key.\n\n* **Predefined Instructions**: The code defines a custom instruction (`custom_instructions`) that is used when generating lesson plans. This instruction is specific to the application and can be modified as needed.\n\n* **Custom API Key Management**: The code uses an environment variable (`GROQ_API_KEY`) to store the API key for the custom model. This is a good practice for managing sensitive information and keeping it separate from the code.\n\n* **Custom Lesson Plan Generation**: The code uses the `client.content_engine.generate_lesson_plan` method to generate lesson plans based on the provided topic and custom instructions. This is a custom implementation specific to the `educhain` library and the application's requirements.\n\n**Improvement Suggestions**\n==========================\n\n* **Input Validation**: While the code checks for the presence of the `topic` parameter, it does not perform any validation on the input data. Consider adding checks to ensure that the topic is a valid string and not empty.\n\n* **API Key Security**: Although the code uses an environment variable to store the API key, it is still important to ensure that the key is kept secure and not committed to the version control system.\n\n* **Error Handling**: While the code includes error handling for some cases, it may be beneficial to add more specific error handling for other potential exceptions that may occur during lesson plan generation.\n\n* **Code Organization**: The code is relatively simple and self-contained. However, as the application grows, it may be beneficial to consider breaking it down into separate modules or classes to improve organization and maintainability.",
      //   ],
      //   analysis_results1: [
      //     "**Code Analysis**\n================\n\n### Industry-Specific Coding Standards\n\nThe code does not explicitly follow a specific industry-standard coding style. However, it appears to follow a mix of PEP 8 (Python's official style guide) and Flask's coding conventions.\n\n### Code Readability\n\n* The code is well-structured and easy to follow.\n* It uses meaningful variable names and function names.\n* The code is properly indented, and each block of code has a clear purpose.\n* There are no long lines of code; each line is reasonably short.\n* The code does not use unnecessary comments, but it would benefit from more comments explaining the purpose of each function and the logic behind the code.\n\n### Meaningful Names\n\n* The variable names are descriptive and follow a consistent naming convention (e.g., `custom_instructions`, `llama`, `llm_config`).\n* The function names are also descriptive (e.g., `generate_lesson_plan`).\n* The code uses a consistent naming convention throughout.\n\n### Avoid Using Single Identifier for Multiple Purposes\n\n* The code does not reuse variable names or function names for different purposes.\n* Each variable and function has a unique and descriptive name.\n\n### Add Comments and Prioritize Documentation\n\n* The code lacks comments explaining the purpose of each function and the logic behind the code.\n* There are no comments explaining the purpose of the variables or functions.\n* The code could benefit from more comments to make it easier for others to understand.\n\n### Efficient Data Processing\n\n* The code does not appear to have any inefficient data processing or algorithms.\n* The code uses a simple and straightforward approach to generating lesson plans.\n\n### Effective Version Control and Collaboration\n\n* The code does not appear to have any version control or collaboration features.\n* It is not clear how the code is being managed or updated.\n\n### Effective Code Review and Refactoring\n\n* The code does not appear to have undergone any code reviews or refactoring.\n* It is not clear how the code is being reviewed or updated.\n\n### Exception Handling\n\n* The code does not have any exception handling mechanisms in place.\n* It would benefit from adding try-catch blocks to handle potential errors or exceptions.\n\n### Security and Privacy Considerations\n\n* The code does not appear to have any security or privacy considerations.\n* It is not clear how the code is handling sensitive data or user input.\n\n### Standardize Headers for Different Modules\n\n* The code does not have any standardized headers for different modules.\n* It would benefit from adding headers to explain the purpose of each module or function.\n\n### Turn Daily Backups into an Instinct\n\n* The code does not appear to have any backup mechanisms in place.\n* It would benefit from adding a backup system to ensure that the code is regularly backed up.\n\n### When Choosing Standards, Think Closed vs. Open\n\n* The code does not appear to follow any specific coding standard.\n* It would benefit from adopting a consistent coding standard, such as PEP 8 or Flask's coding conventions.\n\n### Conclusion\n\nOverall, the code is well-structured and easy to follow, but it could benefit from more comments, exception handling, and security considerations. It would also benefit from adopting a consistent coding standard and adding headers to explain the purpose of each module or function.",
      //   ],
      //   combined_information:
      //     'Code snippet: from flask import Flask, request, jsonify\nfrom educhain import Educhain\nfrom educhain.core import config\nfrom langchain.chat_models import ChatOpenAI\nfrom dotenv import load_dotenv\nimport os\n\n# Load environment variables\nload_dotenv()\n\n# Replace with your OpenAI API credentials\ncustom_instructions = "Include real-world examples"  # Predefined instruction\n\nllama = ChatOpenAI(\n    model="llama-3.1-70b-versatile",\n    openai_api_base="https://api.groq.com/openai/v1",\n    openai_api_key=os.getenv(\'GROQ_API_KEY\')  # Replace with your actual key\n)\n\nllm_config = config.LLMConfig(\n    custom_model=llama\n)\n\nclient = Educhain(llm_config)\n\napp = Flask(__name__)\n\n\n@app.route("/generate_lesson_plan", methods=["POST"])\ndef generate_lesson_plan():\n    if request.method == "POST":\n        data = request.get_json(force=True)  # Get data from the request body\n\n        topic = data.get("topic")\n\n        if not topic:\n            return jsonify({"error": "Missing required parameter: topic"}), 400\n\n        try:\n            lesson_plan = client.content_engine.generate_lesson_plan(\n                topic=topic, custom_instructions=custom_instructions\n            )\n            return jsonify(lesson_plan.json())\n        except Exception as e:\n            return jsonify({"error": str(e)}), 500\n\n    return jsonify({"error": "Invalid request method"}), 405\n\n\nif __name__ == "__main__":\n    app.run(debug=True) \nFull plot: This code sets up a Flask server with an endpoint for generating lesson plans using a customized instance of the Langchain ChatOpenAI language model, which is configured with the Educhain content engine.\nFile path: testdir/Clonedrepo/lessonPlan.py\n\n',
      //   file_paths: ["testdir/Clonedrepo/lessonPlan.py"],
      //   fullplots: [
      //     "This code sets up a Flask server with an endpoint for generating lesson plans using a customized instance of the Langchain ChatOpenAI language model, which is configured with the Educhain content engine.",
      //   ],
      //   titles: [
      //     'from flask import Flask, request, jsonify\nfrom educhain import Educhain\nfrom educhain.core import config\nfrom langchain.chat_models import ChatOpenAI\nfrom dotenv import load_dotenv\nimport os\n\n# Load environment variables\nload_dotenv()\n\n# Replace with your OpenAI API credentials\ncustom_instructions = "Include real-world examples"  # Predefined instruction\n\nllama = ChatOpenAI(\n    model="llama-3.1-70b-versatile",\n    openai_api_base="https://api.groq.com/openai/v1",\n    openai_api_key=os.getenv(\'GROQ_API_KEY\')  # Replace with your actual key\n)\n\nllm_config = config.LLMConfig(\n    custom_model=llama\n)\n\nclient = Educhain(llm_config)\n\napp = Flask(__name__)\n\n\n@app.route("/generate_lesson_plan", methods=["POST"])\ndef generate_lesson_plan():\n    if request.method == "POST":\n        data = request.get_json(force=True)  # Get data from the request body\n\n        topic = data.get("topic")\n\n        if not topic:\n            return jsonify({"error": "Missing required parameter: topic"}), 400\n\n        try:\n            lesson_plan = client.content_engine.generate_lesson_plan(\n                topic=topic, custom_instructions=custom_instructions\n            )\n            return jsonify(lesson_plan.json())\n        except Exception as e:\n            return jsonify({"error": str(e)}), 500\n\n    return jsonify({"error": "Invalid request method"}), 405\n\n\nif __name__ == "__main__":\n    app.run(debug=True) ',
      //   ],
      // };
      // console.log(data);
      const botMessages = [];
      let resmessage = "";
      for (const [key, value] of Object.entries(data)) {
        const newvalue = value;
        console.log(key);
    
        if (Array.isArray(newvalue) && newvalue.length > 0) {
            if (key === "combined_information" || key === "titles") {
                // Wrap the array in code block markdown
                resmessage += `\n\n # ${key.charAt(0).toUpperCase() + key.slice(1)}\n\`\`\`\n${newvalue.join(", ")}\n\`\`\`\n\n`; // Add extra \n here for vertical space
            } else if (key === "analysis_results" || key === "analysis_results1") {
                // Handle markdown for bullet points in array values
                const bulletPoints = addBulletPoints(newvalue.join(", "));
                resmessage += `\n\n # ${key.charAt(0).toUpperCase() + key.slice(1)}:\n${bulletPoints}\n\n`; // Add extra \n here for vertical space
            } else {
                // Default handling for arrays
                resmessage += `\n\n # ${key.charAt(0).toUpperCase() + key.slice(1)}:\n ${newvalue.join(", ")}\n\n`; // Add extra \n here for vertical space
            }
        } else if (typeof newvalue === "string" && newvalue) {
          
            if (key === "combined_information" || key === "titles") {
                if(key === "titles") k="Code Snippets";
                // Wrap the string in code block markdown
                resmessage += `\n\n # ${key.charAt(0).toUpperCase() + key.slice(1)}\n\`\`\`\n${newvalue}\n\`\`\`\n\n`; // Add extra \n here for vertical space
            } else if (key === "analysis_results" || key === "analysis_results1") {
                // Handle markdown for bullet points in string values
                const bulletPoints = addBulletPoints(newvalue);
                resmessage += `\n\n # ${key.charAt(0).toUpperCase() + key.slice(1)}:\n${bulletPoints}\n\n`; // Add extra \n here for vertical space
            } else {
                resmessage += `\n\n # ${key.charAt(0).toUpperCase() + key.slice(1)}:\n ${newvalue}\n\n`; // Add extra \n here for vertical space
            }
        }
    }
    
    console.log(resmessage);
    botMessages.push({
        text: resmessage,
        isBot: true, // Add isBot field set to true
    });
    
      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
      setPreviousResponses((prevResponses) => [
        ...prevResponses,
        ...botMessages,
      ]);

      // clearSimilarQuestion();
      // } else {
      //   console.error('No bot response found');
      // }
    } catch (error) {
      console.error("Error during chat processing:", error.message);

      const errorMessage = {
        text: "Error processing message",
        isBot: true,
        option,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setPreviousResponses((prevResponses) => [...prevResponses, errorMessage]);

      clearSimilarQuestion();
    }
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleNewChat = async () => {
    try {
      if (messages.length > 0) {
        await saveCacheToDb(chatId);
      }
    } catch (error) {
      console.error("Error saving cache to db", error);
    }

    setMessages([]);
    setChatId(null);
    setSimilarQuestion("");
    setPreviousResponses([]);

    try {
      const updatedChats = await fetchChats();
      setPreviousChats(updatedChats);
    } catch (error) {
      console.error("Error loading updated chats", error);
    }
  };

  const loadPreviousChat = async (id) => {
    try {
      const chatData = await fetchChatFromDb(id);
      setMessages(chatData);
      setPreviousResponses(chatData);
      setChatId(id);
      setSimilarQuestion("");
    } catch (error) {
      console.error("Error fetching chat from db", error);
    }
  };
  // const markdownText = '# Sample Header\n* **Bullet 1**\n* Bullet 2 \n* Bullet 3\n';



  return (
    <div className="App">
      <div className="sidebar">
        <div className="fixedContent">
          <img src={tiestoeverylogo} alt="logo" className="logo" />
          <span className="brand"></span>

          <button className="midBtn" onClick={handleNewChat}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
        </div>
        <div className="scrollableContent">
          {previousChats.map((chat) => (
            <button
              key={chat.id}
              className="query"
              onClick={() => loadPreviousChat(chat.id)}
            >
              Chat {chat.id} - {new Date(chat.created_at).toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div className="main">
        <div className="chats scrollableContent">
        {/* <MyMarkdownComponent markdownText={markdownText} /> */}
          {previousResponses.map((message, i) => (
            <div key={i} className={message.isBot ? "chatright" : "chatleft"}>
              <img
                className="chatImg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt=""
              />
              <p className="txt">
                <MyMarkdownComponent markdownText={message.text} />
              </p>
            </div>
          ))}
          <div ref={msgEnd}></div>
        </div>

        <div className="chatFooter">
          {similarQuestion && (
            <div
              className="similarQuestion"
              onClick={() => setInput(similarQuestion)}
            >
              Similar Question: {similarQuestion}
            </div>
          )}
          <div className="inp">
            {/* <select value={option} onChange={(e) => setOption(e.target.value)}>
              <option value="Generation">Generation</option>
              <option value="Retrieval">Retrieval</option>
              <option value="Comparative">Comparative</option>
            </select> */}
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
