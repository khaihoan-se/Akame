import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { firebaseApp } from "@/config/firebase"
import { useRouter } from 'next/router'
const Login = () => {
    const Router = useRouter()
    
    const firebaseAuth = getAuth(firebaseApp)

    const provider = new GoogleAuthProvider()

    const handleLogin = async () => {
        const { user } =  await signInWithPopup(firebaseAuth, provider)
        const { refreshToken, providerData } = user;
        localStorage.setItem('user', JSON.stringify(providerData))
        localStorage.setItem('accessToken', JSON.stringify(refreshToken))
        Router.push('/')
    }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <button className='px-4 py-2 rounded-md bg-primary-600 text-white'
            onClick={handleLogin}
        >Login</button>
    </div>
  )
}

export default Login