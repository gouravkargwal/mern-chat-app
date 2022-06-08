import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appConstant from "../../utils/ApiRoutes";
import Contact from "../contact/Contact";
import Welcome from "../Welcome";
import ChatContainer from "./ChatContainer";
import io from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  let navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const data = await axios.get(
          `${appConstant.baseURL}/allusers/${currentUser._id}`
        );
        setContacts(data.data);
      }
    }
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#29323c] to-[#485563] h-screen">
      <div className="grid grid-cols-[1fr_3fr] h-[85vh] w-[85vw] overflow-hidden rounded-md">
        <div className="contacts mr-2">
          <Contact
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>
        <div className="chats bg-gradient-to-r from-[#cfd9df] to-[#e2ebf0] rounded-md">
          {currentUser && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            currentChat && (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
