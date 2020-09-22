import React, { useState } from 'react';
import RootComponent from '../../components/RootComponent';
import './style.css';
import chatImage from '../../static/undraw_Chat_re_re1u.svg';
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function FindChat() {
  const urlReq = 'http://localhost:3001/rooms';
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const history = useHistory();
  
  async function handleSubmit() {

    if (name.length > 0) {
      localStorage.setItem('name', name);
    }

    if (roomId.length > 0) {
      try {
        const response = await axios.get(`${urlReq}/${roomId}`);
        const { room_title, is_active, video_url, uri } = response.data;
       
        if (!is_active) {
          console.log('erro sala finalizada');
        }
        
        localStorage.setItem('room_title', room_title);
        localStorage.setItem('video_url', video_url);
        localStorage.setItem('uri', uri);

        history.push('/chat');
      } catch (e) {
        alert('Sala nao encontrada!');
      }
    }
  }

  return (
    <RootComponent>
      <div className="chat-container">
        <div className="row">
          <img alt="chat" style={{ width: "450px", height: "300px", marginBottom: "30px" }} src={chatImage} />
          <form className="chat-form" onSubmit={evt => evt.preventDefault()}>
            <input required onChange={evt => setRoomId(evt.target.value)} name="room_id" placeholder="Digite o código da sala" />
            <input required onChange={evt => setName(evt.target.value)} name="name" placeholder="Digite seu nome" />
            <button className="btn" onClick={handleSubmit}> Entrar na sala </button>
          </form>
        </div>
      </div>
    </RootComponent>
  );
}