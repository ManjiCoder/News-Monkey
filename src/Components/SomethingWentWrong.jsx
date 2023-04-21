import React from "react";

function SomethingWentWrong(props) {
  return (
    <div className="-mt-9 pt-9">
      <h1 className="dark:text-white text-3xl font-semibold somethingwentwrong">
        Something Went Wrong..
        <details>{props.error}</details>
      </h1>
    </div>
  );
}
export default SomethingWentWrong;
