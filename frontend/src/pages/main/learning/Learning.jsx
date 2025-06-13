import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { currentUser } from "../../../apis/user.api";
import RedirectPage from "../components/RedirectPage";


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
          <SideBar />
        </>
      ) : (
        <RedirectPage />
      )}
    </>
  );
};

export default Learning;
