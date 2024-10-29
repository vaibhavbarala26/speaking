import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen px-4 md:px-6 bg-orange-400">
      {/* Header Section */}
      <div className="text-white text-3xl mb-10">
        <h1>Logo</h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-row items-center justify-center md:mt-36">
        {/* Left Section */}
        <div className="w-2/3 text-left flex flex-col justify-start">
          <span className="text-6xl text-white font-bold">
            Elevate your communication with our intuitive web app designed for
            seamless collaboration and engagement.
          </span>
          <p className="mt-6 text-lg text-white">
            Sign in to access personalized learning, track your progress, and improve your skills faster with interactive exercises.
          </p>
        </div>

        {/* Right Section (SignIn and SignUp) */}
        <div className="flex flex-row gap-10 w-1/3 justify-end">
          <Link to={"/login"}>
            <button className="bg-white text-orange-400 p-2 rounded-lg text-2xl">
              SignIn
            </button>
          </Link>
          <Link to={"/register"}>
            <button className="bg-white text-orange-400 p-2 rounded-lg text-2xl">
              SignUp
            </button>
          </Link>
        </div>
      </div>

      </div>
  
  );
};

export default App;
