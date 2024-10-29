import { SignIn, useClerk } from '@clerk/clerk-react';
import { useEffect } from 'react';
import img from "../assets/Ycow.gif"

const Login = () => {
  const {user}=useClerk()
  useEffect(()=>{
    const auth = async ()=>{
      const res = await fetch("https://speakingserver.vercel.app/?vercelToolbarCode=VAn6poAFX8kQl1z/auth" , {
        headers:{
          "Content-type":"application/json",
          
        },
        body:JSON.stringify({name:user?.fullName , email:user?.primaryEmailAddress?.emailAddress}),
        method:"POST"
      })
      const data = await res.json()
      console.log(data);
      
    }
    auth()
  } , [user])
  return (
    <div className=" flex flex-col bg-[#fdcb07]  items-center md:flex-row  h-[100vh] ">
        <div className="md:p-6  flex flex-col items-center py-20 md:py-5 md:flex-row w-1/3  ">
      <SignIn></SignIn>
      </div>
      <div className=" h-0  w-2/3 md:h-[100vh] bg-orange-400 md:py-6 md:flex md:items-center md:justify-center">
      <img src={img} alt="" className="h-0 md:h-full" />
      </div>
    </div>
  )
}

export default Login
