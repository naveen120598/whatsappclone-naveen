import React, { useEffect, useState } from 'react'
import './Chat.css'
import {Avatar, IconButton} from '@mui/material'
import {AttachFile, MoreVert, SearchOutlined,InsertEmoticon} from '@mui/icons-material'
import {useStateValue} from '../ContextApi/StateProvider'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Pusher from 'pusher-js'

const Chat = () => {
  const [seed,setSeed] = useState('')
  const [input,setInput] = useState('')
  const [roomName,setRoomName] = useState('')
  const [updatedAt,setUpdatedAt] = useState('')
  const [messages,setMessages] = useState([])
  const [{user}] = useStateValue()
  const {roomId} = useParams()

  useEffect(()=>{
    if(roomId){
    axios.get(`https://whatsappclone-naveen.herokuapp.com/room/${roomId}`).then(res=>{
      setRoomName(res.data.name)
      setUpdatedAt(res.data.updatedAt)
    })
    axios.get(`https://whatsappclone-naveen.herokuapp.com/messages/${roomId}`).then(res=>{
      setMessages(res.data)
    })
  }
  },[roomId])

  useEffect(()=>{
    setSeed(Math.floor(Math.random * 5000))
  },[])

  useEffect(()=>{
    const pusher = new Pusher('ade0d61503bfc2c36461', {
        cluster: 'ap2'
      });
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', function(message) {
        setMessages((prevMessages)=>[...prevMessages,message]) 
      });
},[])

  const sendMessage= async (e)=>{
    e.preventDefault()
    console.log(input)
    if(!input){
      return
    }
    await axios.post('https://whatsappclone-naveen.herokuapp.com/message/new',{
      message:input,
      name: user.displayName,
      timestamp: new Date(),
      uid:user.uid,
      roomId:roomId
    })
    setInput('')
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='chat__headerInfo'>
          <h2>{roomName ?  roomName : 'welcome to whatsapp'}</h2>
          <p>{updatedAt ?`last updated at ${new Date(updatedAt).toString().slice(0,25)}` : 'click on any group'}</p>
        </div>
      <div className='chat__headerRight'>
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {
          messages.map((message,index)=>(
            <p className={`chat__message ${message.uid === user.uid && 'chat__receiver'}`} key={index}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{new Date(message.timestamp).toString().slice(0,25)}</span>  
          </p>

          ))
        }
      </div>

      <div className='chat__footer'>
        <InsertEmoticon />
        <form>
          <input placeholder='Type a message' onChange={e=>setInput(e.target.value)} value={input}></input>
          <button onClick={sendMessage}>send a message</button>
        </form>
      </div>
      
    </div>
  )
}

export default Chat
