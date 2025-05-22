import React from "react";
import UserPhoto from "./UserPhoto";
import Safezone from "./Safezone";
import Sidebar from "../common/Sidebar";
import "./UserProfileStyles.css";

export default function ContainerUser() {
  return (
    <div className="container">
      <div className="container-user">
      <Sidebar />
      <div className="profile-content">
        <UserPhoto />
        <Safezone />
        <div className="buttons">
          <button className="btn logout"> Log out</button>
          <button className="btn delete"> Delete</button>
        </div>
      </div>
    </div>
    </div>
  );
}