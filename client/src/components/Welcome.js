import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Welcome = () => {
  let { currentUser } = useContext(ChatContext);
  return (
    <div className="flex flex-col justify-center h-full items-center gap-8 bg-[#cef5c9]">
      <img
        src="https://i.pinimg.com/originals/3b/aa/c0/3baac05f19c1d4f2f3ba69a534cb629c.gif"
        className="block w-2/4 rounded-md"
        alt="gif"
      />
      <div>
        <h1 className="text-center font-bold">
          Welcome,<span className="text-[#faa92e]">{currentUser.username}</span>
        </h1>
        <h3 className="text-center font-bold">
          Please select a chat to get started.
        </h3>
      </div>
    </div>
  );
};

export default Welcome;
