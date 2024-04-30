import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { LuMoon } from "react-icons/lu";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

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
import { formatMoney } from "../utils/FormatMoney";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useProducts } from "../context/ProductsContext";

const Header = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const [showCoupon, setShowCoupon] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const { getUserWithLists, wishList } = useProducts();

  useEffect(() => {
    if (user) {
      getUserWithLists(user);
    }
  }, [user, wishList]);

  if (
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname.includes("forgot-password") ||
    location.pathname.includes("admin") ||
    location.pathname.includes("/account/")
  ) {
    return null;
  }

  const handleLogOutUser = async () => {
    await logOutUser();
    navigate("/login");
  };

  return (
    <>
      {user ? (
        <div className="w-full">
          <header
            className={`fixed top-0 right-0 w-full h-14 ${
              theme == "light" ? "bg-white shadow-lg" : "bg-[#131314]"
            } px-2 flex flex-row-reverse justify-between items-center`}
            style={{ zIndex: 3 }}
          >
            <div className="flex justify-center items-center gap-2">
              <Link to="/" className="font-bold text-2xl">
                <img src={Logo} className="h-[70px]" alt="Logo" />
              </Link>

              <button
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className="md:hidden flex hover:bg-[#969393]/25 p-1 rounded-full active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                {isSideBarOpen ? (
                  <IoCloseOutline size={23} />
                ) : (
                  <FiMenu size={23} />
                )}
              </button>
            </div>

            <div className="">
              <h3 className="text-lg font-semibold">
                باڵانسەکەم: {formatMoney(user.userMoney)} د.ع
              </h3>
            </div>

            <div className="sm:flex hidden justify-center items-center gap-3">
              {theme == "light" ? (
                <button
                  title="دۆخی تاریکی"
                  onClick={toggleTheme}
                  className="hover:bg-[#969393]/25 p-1 rounded-full active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <LuMoon size={27} />
                </button>
              ) : (
                <button
                  title="دۆخی ڕووناکی"
                  onClick={toggleTheme}
                  className="hover:bg-[#969393]/25 p-1 rounded-full active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <IoSunnyOutline size={27} />
                </button>
              )}

              {/* <Link
                title="دڵخوازەکانم"
                to="/wishlists"
                className="relative hover:bg-[#969393]/25 p-1 rounded-full active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <IoIosHeartEmpty size={27} />

                <p className="absolute top-0 right-0 w-5 h-5 flex justify-center items-center text-center bg-red-600 text-white rounded-full">
                  {wishList.length}
                </p>
              </Link> */}
            </div>
          </header>

          {/* Sidebar */}

          {isSideBarOpen && (
            <div
              className={`fixed top-14 right-0 flex flex-col ${
                user.isAdmin == true ? "gap-[18px]" : "gap-6"
              } overflow-y-auto items-end p-4 mr-0 ml-auto ${
                theme == "light" ? "bg-white shadow-md" : "bg-[#131314]"
              } w-[300px] h-screen`}
              style={{ zIndex: 4 }}
            >
              <Link
                to="/"
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
              >
                <AiOutlineHome size={28} />
                سەرەکی
              </Link>
              {/* <Link
                to="/accounts"
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
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
                <CouponModal
                  showCoupon={showCoupon}
                  setShowCoupon={setShowCoupon}
                />
              )} */}

              <Link
                to="/orders"
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
              >
                <PiShoppingCartLight size={28} />
                داواکاریەکانم
              </Link>

              <Link
                to="/add-balance"
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
              >
                <MdOutlineAccountBalanceWallet size={28} />
                زیادکردنی باڵانس
              </Link>

              <Link
                to="/tutorial"
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
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
                  onClick={() => setIsSideBarOpen(!isSideBarOpen)}
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
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
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

              <div
                className={`flex flex-col sm:hidden ${
                  user.isAdmin == true ? "gap-[18px]" : "gap-6"
                }`}
              >
                {theme == "light" ? (
                  <button
                    title="دۆخی تاریکی"
                    onClick={toggleTheme}
                    className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/25 p-1 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                  >
                    <LuMoon size={23} />
                    <p>دۆخی تاریکی</p>
                  </button>
                ) : (
                  <button
                    title="دۆخی ڕووناکی"
                    onClick={toggleTheme}
                    className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/25 p-1 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                  >
                    <IoSunnyOutline size={23} />
                    <p>دۆخی ڕووناکی</p>
                  </button>
                )}

                {/* <Link
                  title="دڵخوازەکانم"
                  to="/wishlists"
                  className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/25 p-1 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <IoIosHeartEmpty size={23} />
                  <p>دڵخوازەکانم</p>
                </Link> */}
              </div>

              <button
                onClick={() => setShowLogOut(!showLogOut)}
                className="flex flex-row-reverse justify-center items-center gap-2 text-xl hover:bg-[#969393]/15 p-1 rounded-md"
              >
                <TbLogout size={28} />
                چوونەدەرەوە
              </button>

              {showLogOut && (
                <LogOutModal
                  showLogOut={showLogOut}
                  setShowLogOut={setShowLogOut}
                  logOut={handleLogOutUser}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
