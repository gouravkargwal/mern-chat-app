import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import Contact from "../contact/Contact";
import Welcome from "../Welcome";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  let { currentUser, currentChat } = useContext(ChatContext);

  return (
    <div className="flex flex-col justify-center items-center bg-[#0f360a] h-screen">
      <div className="grid grid-cols-[1fr_3fr] h-[85vh] w-[85vw] overflow-hidden rounded-md">
        <div className="contacts mr-2">
          <Contact />
        </div>
        <div className="chats">
          {currentUser && currentChat === undefined ? (
            <Welcome />
          ) : (
            currentChat && <ChatContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
