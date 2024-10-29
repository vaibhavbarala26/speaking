import React from 'react';
import fireImage from '../assets/fire.webp';

interface Streak {
  isStreak: number;
}

interface Props {
  streak: Streak;
}

const StreakCounter: React.FC<Props> = ({ streak }) => {
  return (
    <div className="flex flex-col items-center">
      {streak.isStreak >= 1 ? (
        <div className="flex border-2 px-2  flex-row justify-center items-center -space-x-5 hover:bg-black hover:text-white cursor-pointer">
            <span className='font-bold'>Streak</span>
            <div className='flex flex-row justify-center items-center -space-x-5'>
          <img src={fireImage} alt="Fire symbol indicating streak" className=" mb-4 h-10 w-16" />
          <span className="text-xl font-bold  ">{streak.isStreak}</span>
        </div>
        </div>
      ) : (
        <p className="text-gray-600">No streak yet!</p>
      )}
    </div>
  );
};

export default StreakCounter;
