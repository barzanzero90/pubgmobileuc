import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USERACTIONS } from "../../actions/userActions";
import { useTheme } from "../../context/ThemeContext";

const LoginPage = () => {
  const { user, loading, loginUser, dispatch } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    <>Loading...</>;
  }

  const handleLoginUser = async (e) => {
    e.preventDefault();

    try {
      if (email.trim() != "" && password.trim() != "") {
        const userData = {
          email,
          password,
        };
        await loginUser(userData);
      }
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`w-[400px] h-[350px] border-2 ${
          theme == "light" ? "border-[#e4e4e5]" : "border-[#969393]/50"
        } shadow-lg drop-shadow-xl rounded-md flex flex-col justify-center items-center gap-4`}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-xl font-bold">چوونەژوورەوە</h2>
          <p>لێرە بچۆ ژوورەوە</p>
        </div>

        <form
          onClick={handleLoginUser}
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
            title="ئیمەیڵ"
          />

          <div className="flex flex-col justify-end items-end gap-1">
            <input
              type="password"
              placeholder="وشەی نهێنی"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-[350px] border ${
                theme == "light"
                  ? "border-[#e4e4e5]"
                  : "bg-[#212121] border-[#969393]/25"
              } p-2 rounded-md text-right`}
              title="وشەی نهێنی"
            />
            <Link
              to="/forgot-password"
              className="text-[#2849E9] hover:text-[#4756a0] transform transition-all duration-100 ease-in-out"
            >
              وشەی نهێنیت لەبیرچووە؟
            </Link>
          </div>

          <button className="bg-[#2849E9] hover:bg-[#243fc7] text-white active:scale-95 transform transition-all duration-100 ease-in-out w-[350px] p-2 rounded-md">
            چوونەژوورەوە
          </button>
          <p>
            پێشتر هەژمارت نەبووە؟{" "}
            <Link
              to="/signup"
              className="text-[#2849E9] hover:text-[#4756a0] transform transition-all duration-100 ease-in-out"
            >
              خۆتۆمارکردن
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
