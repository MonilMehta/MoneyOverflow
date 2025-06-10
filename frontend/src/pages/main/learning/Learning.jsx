import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { currentUser } from "../../../apis/user.api";
import RedirectPage from "../components/RedirectPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const Learning = () => {
  const [user, setUser] = useState();
  const fetchData = async () => {
    let accessToken = await document.cookie
      .split("accessToken=")[1]
      ?.split(";")[0];
    const res = await axios.get(currentUser, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res?.data?.data);
    setUser(res?.data?.data?.username);
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <>
      {user ? (
        <>
          <ToastContainer />
          <SideBar />
        </>
      ) : (
        <RedirectPage />
      )}
    </>
  );
};

export default Learning;
