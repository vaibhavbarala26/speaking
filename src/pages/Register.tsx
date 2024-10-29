import { SignUp, useClerk } from "@clerk/clerk-react"
import { useEffect } from "react"
import img from "../assets/Ycow.gif"
const Register = () => {
  const {user}=useClerk()
  useEffect(()=>{
    const auth = async ()=>{
      const res = await fetch("http:localhost:1042/auth" , {
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
    <div className=" flex flex-col   items-center md:flex-row  bg-[#fdcb07] h-[100vh] ">
        <div className="md:p-6  flex flex-col items-center py-6 md:flex-row w-1/3  ">
      <SignUp></SignUp>
      </div>
      <div className=" h-0  bg-orange-400 w-2/3 md:h-[100vh] md:py-6 md:flex md:items-center md:justify-center">
      <img src={img} alt="" className="h-0 md:h-full" />
      </div>
    </div>
  )
}

export default Register
