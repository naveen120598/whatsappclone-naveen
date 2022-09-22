import React ,{useState,useEffect}from 'react'
import './SidebarChat.css'
import {Avatar} from '@mui/material'
import axios from 'axios'
import {Link} from 'react-router-dom'

const SidebarChat = ({addNewChat ,name,id}) => {
    const [seed,setSeed] = useState('')
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000*1))
    },[])
    
    const createChat= async ()=>{
      const roomName = prompt('please enter name for the group')
      if(roomName){
        try{
          await axios.post('https://whatsappclone-naveen.herokuapp.com/group/create',{
            groupName : roomName
          })
        } catch(err){
          console.log(err)
        }
      }
    }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`} >
    <div className='sidebarChat'>
        <Avatar 
        src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <div className='sidebarChat__info'>
            <h2>{name}</h2>

        </div>
    </div>
    </Link>
  ) : (
    <div className='sidebarChat' onClick={createChat}>
        <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat



// import { createAvatar } from '@dicebear/avatars';
// import * as style from '@dicebear/avatars-identicon-sprites';

// let svg = createAvatar(style, {
//   seed: 'custom-seed',
//   // ... and other options
// });