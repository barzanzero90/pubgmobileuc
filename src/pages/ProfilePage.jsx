import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import LogOutModal from "../components/modals/LogOutModal";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
import { useTheme } from "../context/ThemeContext";
import { useProducts } from "../context/ProductsContext";
import { formatMoney } from "../utils/FormatMoney";
import { TbLogout } from "react-icons/tb";
import { Helmet } from "react-helmet";

const ProfilePage = () => {
  const { user } = useAuth();
  const [showLogOut, setShowLogOut] = useState(false);
  const { theme } = useTheme();
  const { orders, balanceOrders, getUserBoughtAccounts, accountsBought } =
    useProducts();

  const userOrders = orders.filter(
    (userOrders) => userOrders.userEmail == user?.email
  );

  const userBalanceOrders = balanceOrders.filter(
    (userOrders) => userOrders.userEmail == user?.email
  );

  /*  useEffect(() => {
    if (user) {
      getUserBoughtAccounts(user);
    }
  }, [user, accountsBought]); */

  return (
    <>
      {user ? (
        <div className="md:grid flex grid-cols-3 gap-5 py-[80px] w-full">
          <Helmet>
            <title>یوسی پۆبجی مۆبایل | هەژمارەکەم</title>
          </Helmet>

          <SideBar user={user} />

          <div className="col-span-2 p-2 w-full">
            <div className="flex flex-col gap-5 justify-center items-center">
              <div
                className={`w-full border ${
                  theme == "light"
                    ? "bg-white border-[#E4E4E5]"
                    : "border-[#969393]/25"
                } rounded-md flex flex-col justify-center items-center gap-4 p-2`}
              >
                <div className={`mr-0 ml-auto`}>
                  <button
                    title="چوونەدەرەوە"
                    onClick={() => setShowLogOut(!showLogOut)}
                    className={`flex justify-center items-center w-10 h-10 rounded-full transform transition-all ease-in-out duration-100 active:scale-95 ${
                      theme == "light"
                        ? "bg-[#FF0000]/50 text-[#FF0000] hover:bg-[#FF0000]/55"
                        : "bg-[#FF0000]/25 text-[#FF0000] hover:bg-[#FF0000]/50"
                    }`}
                  >
                    <TbLogout size={25} />
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <img
                    src={user?.userImageURL}
                    className="w-14 h-14 rounded-full"
                    alt=""
                  />
                  <h2
                    className={`${
                      user.isAdmin == true
                        ? "flex justify-center items-center gap-1"
                        : ""
                    } text-xl font-semibold`}
                  >
                    {user.fullName}{" "}
                    {user.isAdmin == true ? (
                      <RiVerifiedBadgeFill size={20} color="blue" />
                    ) : (
                      ""
                    )}
                  </h2>
                  <p>{user.phoneNumber}</p>
                </div>
              </div>

              <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-3">
                <div className="flex flex-row-reverse justify-between items-center w-[280px] p-2 border border-[#969393]/50 rounded-md">
                  <div className="flex flex-col justify-end items-center">
                    <h2 className="text-xl font-semibold">باڵانس</h2>

                    <div className="flex flex-row-reverse gap-0.5 justify-center items-center">
                      <h1 className="text-2xl">
                        {formatMoney(user.userMoney)}
                      </h1>
                      <p>د.ع</p>
                    </div>
                  </div>

                  <div>
                    <MdOutlineAccountBalanceWallet size={60} />
                  </div>
                </div>

                <div className="flex flex-row-reverse justify-between items-center w-[280px] p-2 border border-[#969393]/50 rounded-md">
                  <div className="flex flex-col justify-end items-center">
                    <h2 className="text-xl font-semibold">داواکاریەکانم</h2>

                    <div className="flex flex-row-reverse gap-0.5 justify-center items-center">
                      <h1 className="text-2xl">
                        {formatMoney(
                          userOrders.length + userBalanceOrders.length
                        )}
                      </h1>
                    </div>
                  </div>

                  <div>
                    <FiFileText size={60} />
                  </div>
                </div>

                <div className="flex flex-row-reverse justify-between items-center w-[280px] p-2 border border-[#969393]/50 rounded-md">
                  <div className="flex flex-col justify-end items-center">
                    <h2 className="text-xl font-semibold">باڵانسی سەرفکردوو</h2>

                    <div className="flex flex-row-reverse gap-0.5 justify-center items-center">
                      <h1 className="text-2xl">
                        {formatMoney(user.userMoneySpent)}
                      </h1>
                      <p>د.ع</p>
                    </div>
                  </div>

                  <div>
                    <GrMoney size={60} />
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-center">
                  ({formatMoney(accountsBought.length)}) هەژمارەکانم
                </h2>

                <div className="flex flex-wrap flex-row-reverse justify-center items-center gap-3">
                  {accountsBought.map((accountBought) => (
                    <div className="flex flex-col gap-4 w-[280px] h-[400px] border border-[#969393]/50 rounded-md">
                      <img
                        src={accountBought.accountDetails.accountImageURL}
                        className="w-full h-[200px] object-cover rounded-tr-md rounded-tl-md"
                        alt=""
                      />

                      <div className="flex flex-col justify-end items-end gap-3 px-2">
                        <strong>
                          ئایدی: {accountBought.accountDetails.accountId}
                        </strong>
                        <p>نرخ: {accountBought.accountDetails.accountPrice}</p>

                        <div className="flex flex-col justify-end items-end gap-2">
                          <strong>{accountBought.accountDetails.accountType} : جۆری هەژمار</strong>

                          <p>{accountBought.accountDetails.accountUsername} : ناوی هەژمار</p>
                          <p>{accountBought.accountDetails.accountPassword} : وشەی نهێنی هەژمار</p>
                          
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>

          {showLogOut && (
            <LogOutModal
              showLogOut={showLogOut}
              setShowLogOut={setShowLogOut}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfilePage;
