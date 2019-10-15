import React, { useState} from "react";
import Popup from "reactjs-popup";
import "./index.css";
import {Card,Content, Message, Delete, Button} from "rbx";

    const copyCode = (message) => {
      const x = document.createElement('textarea');
      x.value = message
      document.body.appendChild(x);
      x.select();
      document.execCommand('copy');
      document.body.removeChild(x);
      return;
    }

const Linkgenerator= ({message, title} ) => {

    const [copied, setCopied] = useState("Copy");

    return(
  <Popup trigger={<Button className="button" style={{backgroundColor:"lightgreen"}}>✉️</Button>} modal>
    {close => (
        <div>
    
<Card>
<Message.Header>
   <p></p>
   <Delete as="button"
   onClick={() => {
       close();
       setCopied("Copy");
     }} />
 </Message.Header>
  <Card.Content>
    <Content textAlign='centered'>
      {message}
    </Content>
  </Card.Content>
  <Card.Footer>
    <Card.Footer.Item 
      textAlign='centered'
      as="a" 
      href="#" 
      onClick={() => {
        copyCode(message);
        setCopied("Copied!");
      }}> 
      {copied}
    </Card.Footer.Item>
  </Card.Footer>
</Card>

</div>
)}
</Popup>

// {/* <Popup
//     trigger={open => (
//       <button className="button">Trigger - {open ? "Opened" : "Closed"}</button>
//     )}
//     position="right center"
//     closeOnDocumentClick
//   >
//     <span> Popup content </span>
//   </Popup> */}
    
    )
};

export default Linkgenerator;