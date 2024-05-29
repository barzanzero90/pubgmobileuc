import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USERACTIONS } from "../../actions/userActions";
import { useTheme } from "../../context/ThemeContext";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const { user, loginUser, dispatch } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLoginUser = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("تکایە ئیمەیڵەکەت بنووسە");
      return;
    } else if (password.trim() === "") {
      alert("تکایە وشەی نهێنیت بنووسە");
      return;
    }

    try {
      setLoading(true);

      const userData = {
        email,
        password,
      };

      await loginUser(userData);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <Helmet>
        <title>یوسی پۆبجی مۆبایل | چوونەژوورەوە</title>
      </Helmet>

      <div
        className={`w-[400px] h-[350px] border-2 ${
          theme === "light" ? "border-[#e4e4e5]" : "border-[#969393]/50"
        } shadow-lg drop-shadow-xl rounded-md flex flex-col justify-center items-center gap-4`}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-xl font-bold">چوونەژوورەوە</h2>
          <p>لێرە بچۆ ژوورەوە</p>
        </div>

        <form className="flex flex-col justify-center items-center gap-3">
          <input
            type="email"
            placeholder="ئیمەیڵ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-[350px] border ${
              theme === "light"
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
                theme === "light"
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

          <button
            onClick={handleLoginUser}
            className="bg-[#2849E9] hover:bg-[#243fc7] text-white active:scale-95 transform transition-all duration-100 ease-in-out w-[350px] p-2 rounded-md"
          >
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

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-2 justify-center items-center bg-black/50 backdrop-blur-sm">
          <div className="loader"></div>
          <p>چوونەژوورەوە</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
