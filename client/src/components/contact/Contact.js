import React, { useEffect, useState, useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { ChatContext } from "../../context/ChatContext";

const Contact = () => {
  let { contacts, currentUser, handleChatChange } = useContext(ChatContext);

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };
  return (
    <>
      {currentUserName && (
        <div className="container h-[85vh] grid grid-rows-[10%_80%_10%] bg-[#131013] rounded-md overflow-hidden">
          <h2 className="p-2 text-white text-center font-extrabold bg-gradient-to-r from-[#434343] to-[#0000]">
            Toop
          </h2>
          <div className="bg-white hover:overflow-y-auto overflow-hidden">
            {contacts.map((contact, index) => {
              // console.log(contact, "Contact Map", index, "Index Map");
              return (
                <div
                  className={`contact cursor-pointer ${
                    index === currentSelected
                      ? "bg-gray-300 m-1 rounded-md"
                      : ""
                  }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <div className="username p-4 hover:bg-gray-200 m-1 rounded-md flex justify-start items-center">
                    <FaUser />
                    <span className="ml-2 capitalize">{contact.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <h2 className="username bg-gradient-to-r from-[#434343] to-[#0000] p-2 w-full text-center font-semibold text-white rounded-md flex justify-evenly items-center">
            <AiOutlineUser />
            <span>{currentUserName}</span>
          </h2>
        </div>
      )}
    </>
  );
};

export default Contact;
