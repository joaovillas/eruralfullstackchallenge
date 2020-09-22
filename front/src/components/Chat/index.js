import React, { useEffect, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
import socketIOClient from "socket.io-client";

import "./styles.css";
let socket;

export default function Chat() {
  const ENDPOINT = "http://localhost:4000";
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState(localStorage.getItem(`socket_id`));
  const room = localStorage.getItem('uri');
  const user = localStorage.getItem('name');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userData = {
      user,
      room
    }

    if (!saved) {
      socket = socketIOClient(ENDPOINT);
      setSaved(true);
    }
    socket.emit("join", userData);
    socket.on('socketid', data => {
      setSocketId(data.socket_id);
      localStorage.setItem('socket_id', data.socket_id);
    });

  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('message', data => {
      const msg = { message: data.message, senderName: data.user, created_at: data.created_at };
      if (data.socket_id === socketId) {
        msg.id = 0;
      } else {
        msg.id = data.user;
      }
      setMessages([...messages, new Message(msg)]);
    });

  }, [messages]);

  function sendMessage() {
    const msg = {
      message,
      room,
      user,
    }
    console.log(messages);
    socket.emit('sendMessage', msg);
    setMessage('');
  }

  return (
    <div className="chat-container">
      <div className="chat-root">
        <ChatFeed
          messages={messages} // Array: list of message objects
          isTyping={false} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName={true}// show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          bubbleStyles={
            {
              text: {
                fontSize: 30
              },
              chatbubble: {
                borderRadius: 70
              }
            }
          }
        />
      </div>
      <div className="chat-utils">
        <input value={message} onChange={evt => setMessage(evt.target.value)} placeholder="Digite sua mensagem aqui" />
        <button onClick={sendMessage} className="btn-chat"> Enviar</button>
      </div>
    </div>
  )
}