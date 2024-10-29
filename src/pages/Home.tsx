import React, { useState, useEffect, useCallback } from 'react';
import Heder from "../components/Heder";
import { languageData } from "../data/languages";
import CameraFeed from '../components/Camerafeed';
import { Domain } from '../data/Domains';
import loader from "../assets/loader.gif"
import AIresponse from '../components/AIresponse';
import { skills } from '../data/Skills';
import { useClerk } from '@clerk/clerk-react';
import Showresults from '../components/showresults';
import { Link } from 'react-router-dom';
interface Language {
  name: string;
  variants?: string[]; // Optional property for languages with variants
}
interface Response {
  topic: string[],
  encouraging_quote?: string,
  greeting?: string,
  fluency?: number,
  grammar?: number,
  vocabulary?: number,
  feedback?: string,
  suggestions?: string,
  welcome?:string,
}
interface Skill {
  level: string;
}
interface UserResult{
  fluency?:number,
  vocabulary?:number,
  grammar?:number,
  Confidence?:string,
  Suggestion?:string,
  what_could_have_been_better?:string,
  Improvements?:string,
}
const Home = () => {
  const [timer, setTimer] = useState(10)
  const [set, setSet] = useState(false)
  const [pertopictime, setPertopictime] = useState<number>(2)
  const [languages, setLanguage] = useState<string>("English")
  const [domain,setDomain] = useState<string>("interview")
  const [level, setLevel] = useState<string>("Beginner")
  const [response, setResponse] = useState<Response>()
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const [error , setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);
  const [showResult , setShowresult] = useState<boolean>(false)
  const [isResultLoading , setIsResultLoading] = useState<boolean>(false)
  
  const [UseResult , setUSerresult] = useState<UserResult>({})
  const {user} = useClerk()
  console.log(user);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionError) => void;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionError {
    error: string;
    message: string;
  }

  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }


  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      setRecognition(recognitionInstance);
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  }, []);
  

  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    setText(transcript);
    console.log(transcript);

  }, []);

  const handleError = useCallback((event: SpeechRecognitionError) => {
    console.error('Speech recognition error:', event.error);
    alert("no speech detected")
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
        recognition.onresult = handleResult;
        recognition.onerror = handleError;
      }
      setIsListening(!isListening);
    }
  }, [isListening, recognition, handleResult, handleError]);
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(timer % pertopictime!==0 || timer < 0 || timer>60 || pertopictime<0 || pertopictime>5){
      alert("Enter valid time inputs")
      return ;
    }
    else{
    setSet(true)
    console.log(timer , pertopictime , languages , level , domain );
  }
}
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSet(false);
      
    }, (timer+1)* 60000);
    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [setSet, timer , showResult]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsListening(false);
    }, pertopictime * 60000);
    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [pertopictime, isListening]);
  const handleStart = async()=>{
  setLoading(true)
  console.log(languages , level , domain);
  const response = await fetch("http://localhost:1042/chat" , {
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({level , language:languages , domain , timer , pertopictime ,name:user?.fullName , email:user?.primaryEmailAddress?.emailAddress })
  })
  const data = await response.json()
  console.log(data.message);
  setResponse(data.message)
  setLoading(false)
  }
  useEffect(() => {
    const auth = async () => {
      try {
        const res = await fetch("http://localhost:1042/auth", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({ 
            name: user?.fullName, 
            email: user?.primaryEmailAddress?.emailAddress 
          }),
          method: "POST",
        });
  
        if (!res.ok) {
          throw new Error("Failed to authenticate");
        }
  
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    };
  
    if (user) {
      auth(); // Only call the auth function if the user exists
    }
  }, [user]);
  const handleusersubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    if(set){
    e.preventDefault()
    setIsResultLoading(true)
    setShowresult(true)
    console.log(text , response?.topic , user?.fullName , user?.primaryEmailAddress?.emailAddress);
   
    const Response = await fetch("http://localhost:1042/user-chat" , {
      body:JSON.stringify({userinput:text , topic:response?.topic , name:user?.fullName , email:user?.primaryEmailAddress?.emailAddress  } ),
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include"
    })
    const data = await Response.json()
    console.log(data);
    setUSerresult(data.message)
    setShowresult(true)
    setText("")
    setIsResultLoading(false)
  }
  else{
    return ;
  }
    
  }
  return (
    <div className="bg-orange-400 min-h-screen flex flex-col">
      <Heder />
      <div className='px-8'><Link to={"/results"}><button  className='bg-[#f5e4cc] text-orange-400 p-2 rounded-lg '> Show responses</button></Link></div>
      <div className="z-50  " onClick={()=>{
        if(showResult){
          setShowresult(false)
        }
      }}>
      {(showResult ) ? (<div>
       <><Showresults result={UseResult }  loader={isResultLoading} /></>
        </div>):(<></>)}
          </div>
      <div className="flex flex-col items-center justify-center px-4 md:px-10 py-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 w-full">
          {!set ? (<div className="flex flex-col items-center gap-6 p-6 bg-[#f5e4cc] rounded-lg shadow-lg w-full max-w-md mx-auto">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-800">Select the Language You Want to Learn</h1>

            {/* Language Selector */}
            <select  onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>(setLanguage(e.target.value))} className="bg-black text-[#f5e4cc] p-3 rounded-lg w-full">
              {languageData.languages.map((language: Language, index) => (
                <option key={index} value={language.name} className="bg-black text-[#f5e4cc]">
                  {language.name}
                </option>
              ))}
            </select>
            <div className="w-full">
            <h2 className="font-bold text-lg text-gray-800">Current Level </h2>
            <select  onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>(setLevel(e.target.value))} className="bg-black text-[#f5e4cc] p-3 rounded-lg w-full mt-2">
              {skills.map((skill:Skill, index) => (
                <option key={index} value={skill.level}  className="bg-black text-[#f5e4cc]">
                  {skill.level}
                </option>
              ))}
            </select>
            </div>

            {/* Reason Selector */}
            <div className="w-full">
              <h2 className="font-bold text-lg text-gray-800">Why You Want to Learn</h2>
              <select name="reason" id="reason" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>(setDomain(e.target.value))} className="bg-black text-[#f5e4cc] p-3 rounded-lg w-full mt-2">
                {Domain.map((d, index) => (
                  <option key={index} value={d.name} >{d.name}</option>
                ))}
              </select>
            </div>

            {/* Set Time */}
            <div className="w-full">
              <h2 className="font-bold text-lg text-gray-800">Set Time  <span className='text-sm font-thin'>(in minutes)</span></h2>
              <form action="" className="flex flex-col gap-3 mt-2" onSubmit={handlesubmit}>
                <input type="number" min={10} max={60} value={timer} className="bg-black text-[#f5e4cc] p-3 rounded-lg w-full" placeholder="Set your time" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>(setTimer(Number(e.target.value)))} />
                <h5 className='text-[14px] text-red-500'>Timer must be multiple of this</h5>
                <input type="number" value={pertopictime} placeholder='length of one session..' onChange={(e:React.ChangeEvent<HTMLInputElement>)=>(setPertopictime(Number(e.target.value)))} className="bg-black text-[#f5e4cc] p-3 rounded-lg w-full" min={2} max={5} name="" id="" />
                <button className="bg-black text-[#f5e4cc] rounded-lg p-3 hover:bg-gray-800 transition duration-300">
                  Set Time
                </button>
              </form>
            </div>
          </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-6 p-6 bg-[#f5e4cc] rounded-lg shadow-lg w-full  max-w-md mx-auto">
              
              {response ? (<>
                <AIresponse response={response}></AIresponse> 
                <div className='flex flex-row gap-4'>
                <button className='bg-orange-400 p-2 rounded-lg text-[#f5e4cc]' onClick={(handleStart)} >Other Topic</button>
                <button className='bg-orange-400 p-2 rounded-lg text-[#f5e4cc]' onClick={()=>{setSet(false)}}>End Session</button>
                </div>
              </>) : (<>{!loading ? (<button className='bg-black text-[#f5e4cc] p-2 rounded-lg w-2/3' onClick={handleStart}>Start</button>
              
              ) : (
                <>
                  <img src={loader} className='h-28' alt="" />
                </>
              )}</>)}

            </div>
          )}
          
          <div className="col-span-2 p-4 flex flex-col gap-4">
            <CameraFeed />
            <button
            disabled={!set}
              onClick={toggleListening}
              className={`p-2 rounded-lg text-[#f5e4cc] ${isListening ? 'bg-red-500' : 'bg-black'}`}
            >
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            {text ? (<><button className='text-white bg-black p-2 rounded-lg' onClick={(e)=>(handleusersubmit(e))}>Submit</button></>):(<><button className='text-white bg-gray-800 p-2 rounded-lg' disabled={true}>Submit</button></>)}
            {/* <form action="" onSubmit={handleusersubmit}>
              <input type="text" value={text} onChange={(e)=>(setText(e.target.value))} name="" id="" />
              <button>Submit</button>            
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
