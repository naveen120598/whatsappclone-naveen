import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import {useStateValue} from '../ContextApi/StateProvider'
import {Avatar, IconButton} from '@mui/material'
import {Chat, DonutLarge, MoreVert, SearchOutlined} from '@mui/icons-material'
import SidebarChat from '../SidebarChat/SidebarChat'
import axios from 'axios'
import Pusher from 'pusher-js'

const Sidebar = () => {
    const [{user}] = useStateValue()
    const [rooms,setRooms] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/all/rooms').then(res=>{
            setRooms(res.data)
        })
    },[])

    useEffect(()=>{
        const pusher = new Pusher('ade0d61503bfc2c36461', {
            cluster: 'ap2'
          });
          const channel = pusher.subscribe('room');
          channel.bind('inserted', function(room) {
            setRooms((prevRooms)=>[...prevRooms,room])
          });
    },[])

  console.log(rooms)
    return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src={user.photoURL}/>
            <div className='sidebar__headerRight'>
                <IconButton>
                    <DonutLarge />
                </IconButton>
                <IconButton>
                    <Chat />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>
        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                <SearchOutlined />
                <input placeholder='Search or start new chat'></input>
            </div>
        </div>
        <div className='sidebar__chats'>
            <SidebarChat addNewChat/>
            {
                rooms.map((room)=>(
                    <SidebarChat key={room._id} id={room._id} name={room.name} />
                ))
            }
        
        </div>
      </div>
  )
}

export default Sidebar
