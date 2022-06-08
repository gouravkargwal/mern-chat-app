import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  let navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-white p-2 rounded-md hover:bg-gray-200"
    >
      <BiPowerOff />
    </button>
  );
};

export default Logout;
