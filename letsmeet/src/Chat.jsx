import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import "./Chat.css"

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
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(""); // Add state for the message
  const [chatHistory, setChatHistory] = useState([]); // Track chat history

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

  const handleSend = () => {
    // Append the message to the chat history
    const x = [...chatHistory, message]
    setChatHistory(x);
    // Clear the textarea after sending the message
    setMessage("");
  };
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      const lastMessage = container.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [chatHistory]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hello {username}</h1>
      <p>CHAT WITH ...</p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {users.map((post, index) => (
          <button onClick={() => setName(post.username)} key={index} style={{ marginBottom: "10px", height: "50px", width: "200px", backgroundColor: "blue" }}>
            <p style={{ color: "white" }}>{post.username}</p>
          </button>
        ))}
      </div>

      {name && (
        <div className='chat-menu' style={{ backgroundColor: "#ccffff", borderRadius: "10px", height: "500px", width: "400px", position: "absolute", bottom: "2px", right: "3px", padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
          <div style={{ display: "flex", height: "50px", width: "100%", alignItems: "center", gap: "20px" }}>
            <button onClick={() => setName("")} style={{ height: "100%", backgroundColor: "blue", color: "white", borderRadius: "5px" }}>
              Go Back
            </button>
            <h3>You are chatting with {name}</h3>
          </div>

          <div style={{ height: "100%", padding: "10px", width: "100%", borderRadius: "7px", backgroundColor: "white", scrollBehavior: "smooth", gap: "10px", display: "flex", flexDirection: "column", overflowY: "auto" }} ref={chatContainerRef}>
            {chatHistory.map((chat, index) => (
              <div key={index} style={{marginLeft:"auto",fontSize: "20px", width: "200px", backgroundColor: "purple", padding: "4px", color: "white", borderRadius: "7px", wordWrap: "break-word",float:"right" }}>{chat}</div>
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
