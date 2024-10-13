import React, { useState, useEffect } from "react";
import { Coins } from "lucide-react";
import { Button } from "./Button";
import ContinueLearning from "./ContinueLearning";
import CompletedLearningPaths from "./CompletedLearning";
import Blogs from "./Blogs";
import Forum from "./Forum";
import Calendar from "./Calendar"; // Custom calendar component
import "./home.css";
import RedirectPage from "../components/RedirectPage";
import { currentUser } from "../../../apis/user.api";
import Newsletter from "./Newsletter";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Insta from "./Insta";
const Home = () => {
  const xpBooster = 1.5;
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [points, setPoints] = useState();
  const [course, setCourse] = useState();

  useEffect(() => {
    // let userId = document.cookie.split("userId=")[1]?.split(";")[0];
    // if (userId != undefined) {
    //   setUser(document.cookie.split("userId=")[1]?.split(";")[0]);
    // }
    const fetchData = async () => {
      let accessToken = await document.cookie
        .split("accessToken=")[1]
        ?.split(";")[0];
      const res = await axios.get(currentUser, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(res?.data?.data);
      setUser(res?.data?.data?.username);
      setName(res?.data?.data?.fullName);
      setPoints(res?.data?.data?.points);
      setCourse(res?.data?.data?.highestCompletedIndex);
      if(res?.data?.data?.highestCompletedIndex < 9){
        toast.info("Complete the learning path to learn more!", {toastId: 'home'});
      }
    };
    fetchData();
  });

  return (
    <>
      {user ? (
        <>
          <ToastContainer />
          <div className="grid grid-cols-1 md:grid-cols-[75%_25%] gap-6 p-6 bg-gray-50 mt-16">
            {/* Main Content (70%) */}
            <main className="space-y-12">
              <ContinueLearning course={course} />
              <CompletedLearningPaths course={course} />
              <Insta  />
              <Blogs />
              <Forum />
              <Newsletter />
            </main>
            {/* Sidebar (30%) */}
            <aside className="bg-white shadow-lg rounded-lg p-6 space-y-6 sticky top-6 mt-10">
              {/* Greeting and Coins */}
              <div className="text-center">
                <h2 className="text-2xl font-bold" style={{ fontSize: "2rem" }}>
                  Hello, {name} 👋
                </h2>
                <p className="text-gray-500 " style={{ fontSize: "1.5rem" }}>
                  Keep up the great work!
                </p>
              </div>
              <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/xp-8203450-6650796.png"
                    style={{ width: "30px" }}
                  />
                  <span className="text-lg font-semibold">
                    {" "}
                    Booster: {xpBooster}x
                  </span>
                </div>
                <div className="flex items-center">
                  <Coins className="text-yellow-500 mr-2 h-6 w-6" />
                  <span className="text-lg font-semibold">Coins: {points}</span>
                </div>
              </div>
              {/* LeetCode-style Streak Calendar */}
              <div>
                <h3 className="text-lg font-bold mb-2">Streak</h3>
                <Calendar />
                <Button className="mt-4 bg-blue-400 w-full">
                  Solve Today's Quiz
                </Button>
              </div>
            </aside>
          </div>
        </>
      ) : (
        <RedirectPage />
      )}
    </>
  );
};

export default Home;
