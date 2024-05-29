import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { PiUsersThree } from "react-icons/pi";
import { FiFileText } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
import { BiCategory, BiMenu } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { CgClose } from "react-icons/cg";

const AdminSideBar = ({ user }) => {
  const { theme } = useTheme();
  const [openAdminSideBar, setOpenAdminSideBar] = useState(false);

  return (
    <>
      {user && user.isAdmin == true ? (
        <>
          <div
            className="md:hidden fixed top-5 right-0 flex"
            style={{ zIndex: 999 }}
          >
            <button onClick={() => setOpenAdminSideBar(!openAdminSideBar)}>
              {openAdminSideBar ? (
                <CgClose
                  size={30}
                  className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
                />
              ) : (
                <BiMenu
                  size={30}
                  className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
                />
              )}
            </button>
          </div>

          <div
            className={`fixed top-0 right-0 hidden md:flex flex-col items-end p-4 mr-0 ml-auto ${
              theme == "light" ? "bg-white shadow-md" : "bg-[#131314]"
            } w-[300px] h-screen gap-5`}
            style={{ zIndex: 999 }}
          >
            <Link to="/admin/home" className="text-3xl">
              LOGO
            </Link>

            <div className="flex flex-col justify-end items-end gap-3">
              <Link
                to="/admin/home"
                className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <AiOutlineHome size={23} />
                <p>سەرەکی</p>
              </Link>

              <Link
                to="/admin/users"
                className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <PiUsersThree size={23} />
                <p>بەکارهێنەرەکان</p>
              </Link>

              <Link
                to="/admin/orders"
                className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <FiFileText size={23} />
                <p>داواکاریەکان</p>
              </Link>

              {/* <Link
                to="/admin/home"
                className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <BsCartCheck size={23} />
                <p>داواکاریە چالاکەکان</p>
              </Link> */}

              <Link
                to="/admin/uc"
                className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <BiCategory size={23} />
                <p>یوسی</p>
              </Link>

              {/* <Link
                to="/admin/accounts"
                className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <MdOutlineSupervisorAccount size={23} />
                <p>هەژمارەکان</p>
              </Link>

              <Link
                to="/admin/coupons"
                className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <RiCoupon2Line size={23} />
                <p>کۆپۆنەکان</p>
              </Link> */}

              <Link
                to="/admin/feedbacks"
                className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
              >
                <VscFeedback size={23} />
                <p>پێشنیارەکان</p>
              </Link>
            </div>
          </div>

          {openAdminSideBar && (
            <div
              className={`fixed top-0 right-0 flex flex-col items-end p-4 mr-0 ml-auto ${
                theme == "light" ? "bg-white shadow-md" : "bg-[#131314]"
              } w-[300px] h-screen gap-5`}
            >
              <Link to="/admin/home" className="text-3xl">
                LOGO
              </Link>

              <div className="flex flex-col justify-end items-end gap-3">
                <Link
                  to="/admin/home"
                  className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <AiOutlineHome size={23} />
                  <p>سەرەکی</p>
                </Link>

                <Link
                  to="/admin/users"
                  className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <PiUsersThree size={23} />
                  <p>بەکارهێنەرەکان</p>
                </Link>

                <Link
                  to="/admin/orders"
                  className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <FiFileText size={23} />
                  <p>داواکاریەکان</p>
                </Link>

                {/* <Link
                  to="/admin/home"
                  className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <BsCartCheck size={23} />
                  <p>داواکاریە چالاکەکان</p>
                </Link> */}

                <Link
                  to="/admin/uc"
                  className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <BiCategory size={23} />
                  <p>یوسی</p>
                </Link>

                {/* <Link
                  to="/admin/accounts"
                  className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <MdOutlineSupervisorAccount size={23} />
                  <p>هەژمارەکان</p>
                </Link>

                <Link
                  to="/admin/coupons"
                  className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <RiCoupon2Line size={23} />
                  <p>کۆپۆنەکان</p>
                </Link> */}

                <Link
                  to="/admin/feedbacks"
                  className="flex flex-row-reverse justify-center items-center gap-2 p-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <VscFeedback size={23} />
                  <p>پێشنیارەکان</p>
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminSideBar;
