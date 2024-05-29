import React, { useState, useEffect, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USERACTIONS } from "../../actions/userActions";
import { useTheme } from "../../context/ThemeContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";
import { Helmet } from "react-helmet";

const SignUpPage = () => {
  const { user, signUpUser, dispatch } = useAuth();
  const inputId = useId();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const handleUploadProfileImage = async () => {
    try {
      const storageRef = ref(storage, `${userImage.name}`);
      await uploadBytes(storageRef, userImage);
      const userImageURL = await getDownloadURL(storageRef);
      return userImageURL;
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const handleSignUpUser = async (e) => {
    e.preventDefault();

    if (!userImage) {
      alert("تکایە وێنەی هەژمارەکەت دابنێ");
      return;
    } else if (fullName.trim() == "") {
      alert("تکایە ناوی تەواوت بنووسە");
      return;
    } else if (!phoneNumber) {
      alert("تکایە ژمارە مۆبایلت بنووسە");
      return;
    } else if (email.trim() == "") {
      alert("تکایە ئیمێیڵەکەت بنووسە");
      return;
    } else if (password.trim() == "") {
      alert("تکایە وشەی نهێنیت بنووسە");
      return;
    } else if (confirmPassword.trim() == "") {
      alert("تکایە دووبارە وشەی نهێنیت بنووسە");
      return;
    } else if (password != confirmPassword) {
      alert("وشەی نهێنی وەکو یەک نییە");
      return;
    }

    try {
      let userImageURL = null;
      if (userImage) {
        userImageURL = await handleUploadProfileImage();
      }

      if (password == confirmPassword) {
        setLoading(true);

        const userData = {
          userImageURL,
          fullName,
          phoneNumber,
          email,
          password,
          createdAt: new Date(),
          lastLogin: new Date(),
          userMoney: 0,
          userMoneySpent: 0,
          isAdmin: false,
        };

        await signUpUser(userData);

        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
      } else {
        alert("وشەی نهێنی و دووبارەکردنەوەی وشەی نهێنی وەک یەک نین");
      }
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>یوسی پۆبجی مۆبایل | خۆتۆمارکردن</title>
      </Helmet>

      <div
        className={`w-[400px] h-[500px] border-2 ${
          theme == "light" ? "border-[#e4e4e5]" : "border-[#969393]/50"
        } shadow-lg drop-shadow-xl rounded-md flex flex-col justify-center items-center gap-4`}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-xl font-bold">خۆتۆمارکردن</h2>
          <p>لێرە خۆت تۆمار بکە</p>
        </div>

        <form className="flex flex-col justify-center items-center gap-3">
          <input
            type="file"
            onChange={(e) => setUserImage(e.target.files[0])}
            required
            className={`w-[350px] border ${
              theme == "light"
                ? "border-[#e4e4e5]"
                : "bg-[#212121] border-[#969393]/25"
            } p-2 rounded-md text-right`}
            placeholder="وێنەی هەژمار"
            id={`${inputId}-user-image`}
            title="وێنەی هەژمار"
          />

          <input
            type="text"
            placeholder="ناوی تەواو"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className={`w-[350px] border ${
              theme == "light"
                ? "border-[#e4e4e5]"
                : "bg-[#212121] border-[#969393]/25"
            } p-2 rounded-md text-right`}
            id={`${inputId}-user-full-name`}
            title="ناوی تەواو"
          />

          <input
            type="number"
            placeholder="ژمارەی مۆبایل"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
            required
            className={`w-[350px] border ${
              theme == "light"
                ? "border-[#e4e4e5]"
                : "bg-[#212121] border-[#969393]/25"
            } p-2 rounded-md text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            id={`${inputId}-user-phone-number`}
            title="ژمارەی مۆبایل"
          />

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
            id={`${inputId}-user-email`}
            title="ئیمەیڵ"
          />

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
            id={`${inputId}-user-password`}
            title="وشەی نهێنی"
          />

          <input
            type="password"
            placeholder="دووبارەکردنەوەی وشەی نهێنی"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`w-[350px] border ${
              theme == "light"
                ? "border-[#e4e4e5]"
                : "bg-[#212121] border-[#969393]/25"
            } p-2 rounded-md text-right`}
            id={`${inputId}-user-confirm-password`}
            title="دووبارەکردنەوەی وشەی نهێنی"
          />
          <button
            onClick={handleSignUpUser}
            className="bg-[#2849E9] hover:bg-[#243fc7] text-white active:scale-95 transform transition-all duration-100 ease-in-out w-[350px] p-2 rounded-md"
          >
            خۆتۆمارکردن
          </button>
          <p>
            پێشتر هەژمارت هەبووە؟{" "}
            <Link
              to="/login"
              className="text-[#2849E9] hover:text-[#4756a0] transform transition-all duration-100 ease-in-out w-[350px] p-2 rounded-md"
            >
              چوونەژوورەوە
            </Link>
          </p>
        </form>
      </div>

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-2 justify-center items-center bg-black/50 backdrop-blur-sm">
          <div className="loader"></div>
          <p>خۆتۆمارکردن</p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
