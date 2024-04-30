import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { PiShoppingCartLight } from "react-icons/pi";
import { FiFileText } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import CouponModal from "./modals/CouponModal";
import FeedbackModal from "./modals/FeedbackModal";
import { GrUserAdmin } from "react-icons/gr";
import LogOutModal from "./modals/LogOutModal";
import { useTheme } from "../context/ThemeContext";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const SideBar = ({ user }) => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      className={`fixed top-14 right-0 hidden md:flex flex-col ${
        user.isAdmin == true ? "gap-[18px]" : "gap-6"
      } items-end p-4 mr-0 ml-auto ${
        theme == "light" ? "bg-white shadow-md" : "bg-[#131314]"
      } w-[300px] h-screen`}
      style={{ zIndex: 8 }}
    >
      <Link
        to="/"
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
      >
        <AiOutlineHome size={28} />
        سەرەکی
      </Link>
      {/* <Link
        to="/accounts"
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
      >
        <MdOutlineSupervisorAccount size={28} />
        هەژمارەکان
      </Link>
      <button
        onClick={() => setShowCoupon(!showCoupon)}
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
      >
        <RiCoupon2Line size={28} />
        کۆپۆن
      </button>

      {showCoupon && (
        <CouponModal showCoupon={showCoupon} setShowCoupon={setShowCoupon} />
      )} */}

      <Link
        to="/orders"
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
      >
        <PiShoppingCartLight size={28} />
        داواکاریەکانم
      </Link>

      <Link
        to="/add-balance"
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
      >
        <MdOutlineAccountBalanceWallet size={28} />
        زیادکردنی باڵانس
      </Link>

      <Link
        to="/tutorial"
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
      >
        <FiFileText size={28} />
        ڕێنمایەکان
      </Link>

      <button
        onClick={() => setShowFeedback(!showFeedback)}
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
      >
        <VscFeedback size={28} />
        پێشنیارێکمان پێبدە
      </button>

      {showFeedback && (
        <FeedbackModal
          showFeedback={showFeedback}
          setShowFeedback={setShowFeedback}
          user={user}
        />
      )}

      {user.isAdmin == true ? (
        <Link
          to="/admin/home"
          className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
        >
          <GrUserAdmin size={28} />
          ئەدمین
        </Link>
      ) : (
        <></>
      )}

      <Link
        to="/profile"
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl"
      >
        <img
          src={user?.userImageURL}
          className="w-10 h-10 rounded-full"
          alt=""
        />
        <h3 className="flex justify-center items-center gap-1">
          {user?.fullName}
          {user?.isAdmin == true ? (
            <RiVerifiedBadgeFill size={20} color="blue" />
          ) : (
            ""
          )}
        </h3>
      </Link>
      <button
        onClick={() => setShowLogOut(!showLogOut)}
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
      >
        <TbLogout size={28} />
        چوونەدەرەوە
      </button>

      {showLogOut && (
        <LogOutModal showLogOut={showLogOut} setShowLogOut={setShowLogOut} />
      )}
    </div>
  );
};

export default SideBar;
