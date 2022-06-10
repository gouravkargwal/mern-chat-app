import React, { useContext } from "react";
import Logout from "../logout/Logout";
import ChatInput from "./ChatInput";
import { FaUserCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { ChatContext } from "../../context/ChatContext";

const ChatContainer = () => {
  let { currentChat, messages, messageEndRef } = useContext(ChatContext);

  return (
    <div className="h-[85vh] rounded-md overflow-hidden grid grid-rows-[10%_60%_30%]">
      <div className="chat-header p-2 flex justify-between bg-gradient-to-r from-[#cfd9df] to-[#e2ebf0] items-center">
        <div className="user-detials">
          <h2 className="username flex justify-evenly items-center">
            <FaUserCircle />
            <span className="font-bold ml-2 capitalize">
              {currentChat.name}
            </span>
          </h2>
        </div>
        <Logout />
      </div>
      <div className="chat-messages flex gap-4 flex-col p-4 hover:overflow-y-auto overflow-hidden">
        {messages.map((message) => {
          return (
            <div key={uuidv4()} ref={messageEndRef}>
              <div
                className={`flex items-center ${
                  message.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`content max-w-[40%] break-words p-4 rounded-md ${
                    message.fromSelf ? "bg-gray-300" : "bg-gray-500"
                  } `}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${message.message}`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
