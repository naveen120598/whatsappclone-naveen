import React from 'react'
import './App.css'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'
import  {useStateValue} from './components/ContextApi/StateProvider'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {
  const [{user}] = useStateValue()
  console.log(user)
  

  return (
    <div className='app'>
      {
        !user ? 
        <Login /> :
        <div className='app__body'>
          <Router>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Chat />}></Route>
              <Route path='/rooms/:roomId' element={<Chat />}></Route>

            </Routes>
          </Router>
        </div>
      }
    </div>
  )
}

export default App
