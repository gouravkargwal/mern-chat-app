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
      className="bg-[#195a11] duration-500 p-2 rounded-md hover:bg-[#8de881] text-white hover:text-[#0f360a]"
    >
      <BiPowerOff size={"1rem"} />
    </button>
  );
};

export default Logout;
