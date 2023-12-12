import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Chat.css"
// import {Langchain} from "langchain";
import { OpenAI } from "langchain/llms/openai";

//Import the BufferMemory module
import { BufferMemory } from "langchain/memory";

//Import the Chains module
import { LLMChain } from "langchain/chains";

//Import the PromptTemplate module
import { PromptTemplate } from "langchain/prompts";

//Load environment variables (populate process.env from .env file)
// import * as dotenv from "dotenv";
// dotenv.config();



const posts = [
  {
    username: "Sanjana",
    password: "0092",
  },
  {
    username: "Archish",
    password: "0210",
  },
  {
    username: "Harmanpreet",
    password: "0239",
  },
  {
    username: "Riya",
    password: "0091",
  }
];

function Chat() {
  const location = useLocation();
  const access_token = location.state?.access_token;

  const [username, setusername] = useState("");
  const [bot, setBot] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(""); // Add state for the message
  const [chatHistory, setChatHistory] = useState([]); // Track chat history
  const [botchatHistory, setBotChatHistory] = useState([{ "message": "please upload your resume", "type": "bot" }]);
  const [botmessage, setBotMessage] = useState("");
  const [browse, setBrowse] = useState("");
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState("");

  const users = posts.filter(post => post.username !== username);

  useEffect(() => {
    if (access_token) {
      axios.get('http://localhost:4000/posts', {
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      })
        .then(function (response) {
          console.log(response)
          setusername(response.data.username);
          setPassword(response.data.password);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [access_token]);

  // const headers = {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer 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`,
  // };

  // const personas = [
  //   'Lou Adler',
  //   'Stacy Donovan Zapa',
  //   'Johnny Campbell',
  //   'Greg Savage',
  //   'Maisha Cannon',
  //   'Glen Cathey'
  // ];

  // const styles = [
  //   'Captivating',
  //   'Enticing',
  //   'Witty',
  //   'Appealing',
  //   'Engaging',
  //   'Impactful',
  //   'Dynamic',
  //   'Exciting',
  //   'Professional'
  // ];

  // const [userInput, setUserInput] = useState({
  //   system: '',
  //   user: '',
  //   assistant: '',
  //   prompt: '',
  //   model: 'gpt-3.5-turbo-16k',
  //   persona: 'Lou Adler',
  //   style: 'Captivating'
  // });

  const [loading, setLoading] = useState(false);


  const handleSend = () => {
    const x = [...chatHistory, message]
    setChatHistory(x);
    setMessage("");
  };

  const handleSend1 = () => {
    // Append the user's input to the botchatHistory
    const userMessage = { "message": botmessage, "type": "user" };
    const updatedBotChatHistory = [...botchatHistory, userMessage];
    setBotChatHistory(updatedBotChatHistory);

    // Clear the textarea of chatbot after sending the message
    setBotMessage("");

    // Call the function to send the user's input to the bot and update botchatHistory with the bot's response
    handleSendMessage(botmessage, updatedBotChatHistory);
  };

  // const langchain = new Langchain();

  // const handleSendMessage = async (prompt, updatedBotChatHistory) => {
  //   setLoading(true);

  //   const resumePrompt = resume
  //     ? `User's Resume:\n${resume}\n\n`
  //     : '';

  //   const langchainPrompt = `you are an expert interview agent who will be taking an interview of the user, the resume details of the user is ${resume}. you have to ask just one question at a time.`;

  //   try {
  //     const enhancedPrompt = await langchain.enhance(langchainPrompt);

  //     const data = {
  //       model: userInput.model,
  //       messages: [
  //         {
  //           role: 'system',
  //           content: enhancedPrompt,
  //         },
  //         {
  //           role: 'user',
  //           content: prompt,
  //         },
  //       ],
  //       temperature: 0.5,
  //       max_tokens: 2049,
  //     };

  //     const response = await axios.post(
  //       'https://api.openai.com/v1/chat/completions',
  //       data,
  //       { headers }
  //     );

  //     const { choices } = response.data;
  //     const assistantResponse = choices[0].message.content;
  //     setLoading(false);

  //     // Update chat history with the assistant's response
  //     const botResponse = { "message": assistantResponse, "type": "bot" };
  //     const finalBotChatHistory = [...updatedBotChatHistory, botResponse];
  //     setBotChatHistory(finalBotChatHistory);
  //     setBotMessage("");

  //   } catch (error) {
  //     console.error('An error occurred:', error.message);
  //   }
  // };

  // const langchain = new Langchain();

  const handleSendMessage = async (prompt1, updatedBotChatHistory) => {
    const memory = new BufferMemory({ memoryKey: "chat_history" });
    const model = new OpenAI({ openAIApiKey: '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', temperature: 0.9 });

    const template = `you are an expert interview agent who will be taking an interview, resume of the person of whom you are taking interview is  ${resume}. be an strict interviewer and ask questions related to the resume.
    Current conversation:
      {chat_history}
      Human: {input}
      AI:`;
    const prompt = PromptTemplate.fromTemplate(template);
    const chain = new LLMChain({ llm: model, prompt, memory });
    const res = await chain.call({ input: prompt1 });

    const response = res.text;
    console.log(response)
    const botResponse = { "message": response, "type": "bot" };
    const finalBotChatHistory = [...updatedBotChatHistory, botResponse];
    setBotChatHistory(finalBotChatHistory);
    setBotMessage("");


  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:4000/data', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {

          const Result = await response.json();
          console.log('Result:', Result);
          setResume(Result);
        } else {

          console.error('Error uploading file');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setBrowse("");

  }
  const handleChange = (e) => {
    const ff = e.target.files[0];
    setBrowse("abc")
    setFile(ff)
    console.log(ff.type)

  }





  const chatContainerRef = useRef(null);
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      const lastMessage = container.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [chatHistory, botchatHistory]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hello {username}</h1>
      <p>CHAT WITH ...</p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => setBot("ChatBot")} style={{ marginBottom: "10px", height: "100px", width: "500px", backgroundColor: "green" }}>
          <p style={{ color: "white", fontSize: "25px" }}>{"ChatBot"}</p>
        </button>
        {users.map((post, index) => (
          <button onClick={() => setName(post.username)} key={index} style={{ marginBottom: "10px", height: "100px", width: "500px", backgroundColor: "blue" }}>
            <p style={{ color: "white", fontSize: "25px" }}>{post.username}</p>
          </button>
        ))}

      </div>

      {bot && (
        <div className='chat-menu' style={{ backgroundColor: "#ccffff", borderRadius: "10px", height: "800px", width: "600px", position: "absolute", bottom: "2px", right: "3px", padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
          <div style={{ display: "flex", height: "50px", width: "100%", alignItems: "center", gap: "20px" }}>
            <button onClick={() => setBot("")} style={{ height: "100%", backgroundColor: "blue", color: "white", borderRadius: "5px" }}>
              Go Back
            </button>
            <h3>You are chatting with {bot}</h3>
          </div>

          <div style={{ height: "100%", padding: "10px", width: "100%", borderRadius: "7px", backgroundColor: "white", scrollBehavior: "smooth", gap: "10px", display: "flex", flexDirection: "column", overflowY: "auto" }} ref={chatContainerRef}>
            {botchatHistory.map((chat, index) => (
              <div
                key={index}
                style={{
                  marginLeft: chat.type === "user" ? "auto" : "0px",
                  fontSize: "20px",
                  width: "200px",
                  backgroundColor: chat.type === "user" ? "purple" : "gray",
                  padding: "4px",
                  color: "white",
                  borderRadius: "7px",
                  wordWrap: "break-word",
                }}
              >
                {chat.message}
              </div>
            ))}

          </div>


          <div style={{ display: "flex", gap: "10px" }}>
            <textarea
              value={botmessage}
              onChange={(e) => setBotMessage(e.target.value)}
              style={{ fontSize: "25px", borderRadius: "7px", backgroundColor: "grey", height: "60px", width: "100%", border: "0px", color: "white", alignContent: "" }}
            ></textarea>

            {
              !resume && <form onSubmit={(e) => { handleSubmit(); e.preventDefault(); }}>
                <input type="file" onChange={handleChange} style={{ width: "100px" }} />
                {browse && <button type="submit" style={{ backgroundColor: "blue", borderRadius: "5px", color: "white", width: "100px" }}>Upload</button>}
              </form>

            }


            {!browse && <button onClick={handleSend1} style={{ backgroundColor: "blue", borderRadius: "5px", color: "white", width: "100px" }}>
              Send
            </button>}
          </div>

        </div>
      )}

      {name && (
        <div className='chat-menu' style={{ backgroundColor: "#ccffff", borderRadius: "10px", height: "800px", width: "600px", position: "absolute", bottom: "2px", right: "3px", padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
          <div style={{ display: "flex", height: "50px", width: "100%", alignItems: "center", gap: "20px" }}>
            <button onClick={() => setName("")} style={{ height: "100%", backgroundColor: "blue", color: "white", borderRadius: "5px" }}>
              Go Back
            </button>
            <h3>You are chatting with {name}</h3>
          </div>

          <div style={{ height: "100%", padding: "10px", width: "100%", borderRadius: "7px", backgroundColor: "white", scrollBehavior: "smooth", gap: "10px", display: "flex", flexDirection: "column", overflowY: "auto" }} ref={chatContainerRef}>
            {chatHistory.map((chat, index) => (
              <div key={index} style={{ marginLeft: "auto", fontSize: "20px", width: "200px", backgroundColor: "purple", padding: "4px", color: "white", borderRadius: "7px", wordWrap: "break-word", float: "right" }}>{chat}</div>
            ))}
          </div>


          <div style={{ display: "flex", gap: "10px" }}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ fontSize: "25px", borderRadius: "7px", backgroundColor: "grey", height: "60px", width: "100%", border: "0px", color: "white", alignContent: "" }}
            ></textarea>


            <button onClick={handleSend} style={{ backgroundColor: "blue", borderRadius: "5px", color: "white", width: "100px" }}>
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Chat;
