import React from 'react'
import './Login.css'
import {Button} from '@mui/material'
import whatsAppLogo from '../../whatsapplogo.png'
import {auth,provider} from '../../firebase'
import {signInWithPopup} from 'firebase/auth'
import {useStateValue} from '../ContextApi/StateProvider'
import {actionTypes} from '../ContextApi/reducer'

const Login = () => {
    const [state,dispatch] = useStateValue()

    const signIn=()=>{
        signInWithPopup(auth,provider).then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        }).catch((err)=>{
            alert(err.message)
        })
    }
  return (
    <div>
        <div className='login'>
            <div className='login__container'>
                <img src={whatsAppLogo} alt='whatsapp_logo' />
            <div className='login__text'>
                 <h1>sign in to whatsapp</h1>
            </div>
            <Button onClick={signIn}>
                sign in with google
            </Button>
        </div>
        </div>
      
    </div>
  )
}

export default Login
