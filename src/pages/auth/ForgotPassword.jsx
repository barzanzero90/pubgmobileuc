import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { USERACTIONS } from "../../actions/userActions";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { user, forgotPassword, dispatch } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      if (email.trim() != "") {
        await forgotPassword(email);
      }
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`w-[400px] h-[250px] border-2 ${
          theme == "light" ? "border-[#e4e4e5]" : "border-[#969393]/50"
        } shadow-lg drop-shadow-xl rounded-md flex flex-col justify-center items-center gap-4`}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-xl font-bold">وشەی نهینم لەبیر کردووە</h2>
          <p className="text-center">
            تکایە ئیمەیڵەکەت بنووسە ئێمە بەستەرێکت بۆ دەنێرین بۆ گەڕانەوە بۆ
            ئەکاونتەکەت لە ئیمەیڵەکەدا
          </p>
        </div>

        <form
          onClick={handleForgotPassword}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="email"
            placeholder="ئیمەیڵ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-[350px] border ${
              theme == "light"
                ? "border-[#e4e4e5]"
                : "bg-[#212121] border-[#969393]/25"
            } p-2 rounded-md text-right`}
          />

          <button className="bg-[#2849E9] hover:bg-[#243fc7] text-white active:scale-95 transform transition-all duration-100 ease-in-out w-[350px] p-2 rounded-md">
            ناردن
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
