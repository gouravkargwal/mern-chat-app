import React from "react";

const Welcome = ({ currentUser }) => {
  return (
    <div className="flex flex-col justify-center h-full items-center gap-8">
      <img
        src="https://i.gifer.com/RBte.gif"
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
