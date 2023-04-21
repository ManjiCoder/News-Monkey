import React from "react";
import Emoji from "../Images/emoji.png";

function NoDataFound() {
  return (
    <div className="grid place-items-center">
      <img className="emoji" src={Emoji} alt="No Data Found" />
      <h1 className="showError text-center capitalize text-3xl font-semibold">Sorry No Data Found</h1>
    </div>
  );
}

export default NoDataFound;
