import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { hideScrollBar } from "../../hooks/hideScrollBar";

const LogOutModal = ({ showLogOut, setShowLogOut }) => {
  const { logOutUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  hideScrollBar(showLogOut);

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      return navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setShowLogOut(!showLogOut)}
      style={{ zIndex: 8 }}
    >
      <div
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[170px] rounded-md ${
          theme == "light" ? "bg-white" : "bg-[#131314]"
        } flex flex-col justify-center items-center gap-4 text-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold">چوونەدەرەوە</h3>
        <p>ئایا دڵنیایت کە دەتەوێت لە هەژمارەکەت بچیتە دەرەوە؟</p>

        <div className="flex flex-row-reverse justify-center items-center gap-10">
          <button
            onClick={() => {
              handleLogOutUser();
              setShowLogOut(!showLogOut);
            }}
            className="bg-blue-700 text-white hover:bg-blue-800 active:scale-95 transform transition-all duration-100 ease-in-out w-[100px] p-2 rounded-md"
          >
            بەڵێ
          </button>

          <button
            onClick={() => setShowLogOut(!showLogOut)}
            className={`${
              theme == "light"
                ? "bg-[#969393]/30 text-black"
                : "bg-[#969393]/80 text-white"
            } hover:bg-[#969393]/50 active:scale-95 transform transition-all duration-100 ease-in-out w-[100px] p-2 rounded-md`}
          >
            نەخێر
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
