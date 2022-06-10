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
        <div className="container h-[85vh] grid grid-rows-[10%_80%_10%] bg-[#131013] overflow-hidden">
          <div className="p-2 text-white text-center font-extrabold bg-[#cef5c9] flex items-center justify-center">
            <img
              src="https://media.istockphoto.com/vectors/vector-leaf-letter-design-t-vector-id1223595958?k=20&m=1223595958&s=612x612&w=0&h=tcXg1Ii3lhoyrWXO2LuMs8kzeSrmQO_MLxt1QiNg2mM="
              alt="logo"
              className="w-[40px] rounded-md"
            />
            <h2 className="text-[#0f360a] text-3xl">oop</h2>
          </div>
          <div className="bg-white hover:overflow-y-auto overflow-hidden">
            {contacts.map((contact, index) => {
              // console.log(contact, "Contact Map", index, "Index Map");
              return (
                <div
                  className={`contact cursor-pointer duration-500 ${
                    index === currentSelected
                      ? "bg-[#0f360a] m-1 rounded-md text-white"
                      : "text-[#0f360a]"
                  }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <div
                    className={`p-3 ${
                      index === currentSelected ? "" : "hover:bg-[#effced]"
                    } m-1 rounded-md flex justify-start items-center duration-500`}
                  >
                    <FaUser />
                    <span className="ml-2 capitalize">{contact.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="username bg-[#cef5c9] w-full font-semibold text-[#0f360a] flex justify-center items-center text-lg truncate">
            <FaUser />
            <span className="ml-1">{currentUserName}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
