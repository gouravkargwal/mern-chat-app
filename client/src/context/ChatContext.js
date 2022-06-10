import axios from "axios";
import React, { useState, createContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import appConstant from "../utils/ApiRoutes";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  let navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const messageEndRef = useRef(null);
  const socket = io("http://localhost:5000");
  // console.log(socket);

  // Set current logged in user
  useEffect(() => {
    async function fetchData() {
      // Check for logged in user
      if (!localStorage.getItem("chat-app-user")) navigate("/login");

      // Set current user
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    }

    fetchData();
  }, [navigate]);

  // Fetch All Users
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

  // Change current chat user
  const handleChatChange = (chat) => {
    console.log(chat);
    setCurrentChat(chat);
  };

  // Fetch all messages from a specific contact
  useEffect(() => {
    async function fetchData() {
      if (currentChat) {
        const response = await axios.post(
          `${appConstant.baseURL}/message/getmsg`,
          {
            from: currentUser._id,
            to: currentChat._id,
          }
        );
        setMessages(response.data);
      }
    }
    fetchData();
  }, [currentChat]);

  //Add user on socket io
  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // Handle message that are send and saving them to database
  // Also emiting an event to server.
  const handleSendMsg = async (msg) => {
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    };
    //Emiting event to backend
    socket.emit("send-message", data);
    //Saving to database
    await axios.post(`${appConstant.baseURL}/message/addmsg`, data);
    //Updating the state
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  // Receive message from event emitted from server on frontend
  // Saving that message to frontend state
  useEffect(() => {
    if (socket) {
      socket.on("message-recieve", (message) => {
        setArrivalMessage({ fromSelf: false, message: message });
      });
    }
  }, [socket]);

  //
  useEffect(() => {
    arrivalMessage &&
      setMessages((prev) => {
        return [...prev, arrivalMessage];
      });
  }, [arrivalMessage]);

  // Socket io add user event emitted
  useEffect(() => {
    if (!currentUser) return;
    socket.emit("add-user", currentUser._id);
  }, [currentUser]);

  // Scroll into the latest messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const values = {
    contacts,
    currentUser,
    currentChat,
    handleChatChange,
    messages,
    handleSendMsg,
    messageEndRef,
  };

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};
export default ChatContextProvider;
