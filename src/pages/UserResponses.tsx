import React, { useEffect, useState } from "react";

import { useClerk } from "@clerk/clerk-react";
import Heder from "../components/Heder";

interface User {
  name: string;
  email: string;
}

interface Part {
  texts: string;
  
}

interface Role {
  role: string;
  parts: Part[];
  date: string;
}

interface Result {
  user: User;
  result: Role[];
}

const UserResponses: React.FC = () => {
   
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {user} = useClerk()
  useEffect(() => {
    // Fetch user response data
    const fetchUserResponse = async () => {
      try {
        ; // Replace with dynamic email if needed
        const response = await fetch(`https://speakingserver.vercel.app/?vercelToolbarCode=VAn6poAFX8kQl1z/user-response?email=${user?.primaryEmailAddress?.emailAddress}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        });
        const data = await response.json()
        console.log(data.result);
        setData(data)
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch user responses");
        setLoading(false);
      }
    };
    fetchUserResponse();
  }, [user ]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-orange-400">
        <Heder></Heder>
    <div className="container mx-auto p-6 bg-orange-400">
       
      <h1 className="text-2xl font-bold mb-4">User Responses</h1>
      
      {data ? (
        <div className="bg-[#f5e4cc] shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">User Info</h2>
            <p>Name: {user?.fullName}</p>
            <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            {data?.result?.map((role, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Role: {role?.role}
                </h3>
                <p>Date: {new Date(role?.date).toLocaleDateString()}</p>
                <ul className="list-disc pl-5 mt-2">
                  {role?.parts.map((part, idx) => (
                    <li key={idx}>
                      <span className="font-bold">{part?.texts}</span> 
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No responses found for the user.</div>
      )}
    </div>
    </div>
  );
};

export default UserResponses;
