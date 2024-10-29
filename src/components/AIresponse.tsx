import React from 'react';
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
  welcome_message?:string,
}
interface Props {
  response: Response;
}
const AIresponse:React.FC<Props> = ({response}) => {
  console.log((response));
  
    return (
      <div className="bg-[#f5e4cc] p-4 text-orange-400 rounded-lg shadow-lg">
        <div className="p-2 text-center">
          {response?.welcome ? (<span>{response.welcome}</span>):(<>{response.welcome_message}</>)}
        </div>
        <div className="text-2xl font-bold p-2 text-center">
          <span>{response.topic}</span>
        </div>
        
      </div>
    );
  };
  
  export default AIresponse;
  