import { SignOutButton, useClerk, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import StreakCounter from "./Streak";

interface Streak {
  isStreak: number;
}

const Heder = () => {
  const { user } = useClerk();
  const [streak, setStreak] = useState<Streak | null>(null); // Updated to include null

  useEffect(() => {
    const fetchStreak = async () => {
      const response = await fetch(
        `http://localhost:1042/streak?email=${user?.primaryEmailAddress?.emailAddress}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setStreak(data);
    };
    fetchStreak();
  }, [user]);

  return (
    <div>
      <div className="px-8 md:px-10 py-3 flex flex-col gap-2 sm:flex-row justify-between">
        <h1 className="font-bold text-3xl">Logo</h1>
        <div>
          {/* Conditionally render StreakCounter only if streak is not null */}
          {streak && <StreakCounter streak={streak} />}
        </div>
        <div className="flex flex-row items-center gap-3">
          <button className="bg-black text-[#f5e4cc] p-2 rounded-lg">
            <SignOutButton />
          </button>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Heder;
