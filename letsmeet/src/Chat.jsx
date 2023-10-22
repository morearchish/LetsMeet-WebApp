import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hello {username}</h1>
      <p>CHAT WITH ...</p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {users.map((post, index) => (
          <button key={index} style={{ marginBottom: "10px", height: "50px", width: "200px", backgroundColor: "blue" }}>
            <p style={{ color: "white" }}>{post.username}</p>
          </button>
        ))}

      </div>

      <div style={{ borderRadius: "10px", height: "500px", width: "400px", backgroundColor: "grey", position: "absolute", bottom: "2px", right: "3px",padding:"10px",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
        <div>

        </div>
        <textarea style={{backgroundColor:"black",height:"50px",width:"100%",border:"0px",color:"white",alignContent:""}}></textarea>

      </div>




    </div>
  )
}

export default Chat;
