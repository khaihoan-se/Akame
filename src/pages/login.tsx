import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { firebaseApp } from "@/config/firebase"
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getUser } from '@/redux/actions/userAction'
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/shared/Button";
import Head from "@/components/shared/Head";

const Login = () => {
    const Router = useRouter();
    const dispatch = useDispatch();
    const firebaseAuth = getAuth(firebaseApp)

    const provider = new GoogleAuthProvider()

    const handleLogin = async () => {
        const { user } =  await signInWithPopup(firebaseAuth, provider)
        const { refreshToken, providerData } = user;
        localStorage.setItem('user', JSON.stringify(providerData))
        localStorage.setItem('accessToken', JSON.stringify(refreshToken))        
        const  action = getUser(providerData)
        dispatch(action)
        Router.push('/')
    }

  return (
    <React.Fragment>
      <Head
        title={`Login - Kaguya`}
      />

      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-5">
        <div
          className="hidden md:block relative col-span-2 after:absolute after:inset-0 after:bg-background/80 after:z-10"
          style={{
            backgroundImage: "url('/login-background.png')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative flex flex-col justify-center items-center w-full h-full z-20">
            <div className="w-full px-8">
              <h1 className="text-4xl font-semibold text-white line-clamp-6">
                The people laughing are laughing at their own ignorance.
              </h1>
              <p className="text-right text-xl italic mt-4 font-semibold">
                Sakamoto Yuuji
              </p>
              <p className="text-right font-medium text-gray-300">
                Baka to Test to Shoukanjuu
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-background flex items-center justify-center">
          <div className="w-full px-4 md:px-0 md:w-1/2">
            <h1 className="text-5xl font-bold mb-8">Login</h1>

            <Button
              className="shadow-lg relative bg-white text-black font-bold flex items-center justify-center w-full hover:!bg-opacity-90 mb-2 px-4 py-2 rounded-md"
              LeftIcon={FcGoogle}
              iconClassName="absolute left-6"
              onClick={handleLogin}
            >
              <p>login with google</p>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login