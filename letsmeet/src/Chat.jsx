import React from 'react'

import {useLocation} from 'react-router-dom';


function Chat() {
  
   const location = useLocation();
   const access_token = location.state?.access_token;

   return (
    <div>
        
        
      
    </div>
  )
}

export default Chat
