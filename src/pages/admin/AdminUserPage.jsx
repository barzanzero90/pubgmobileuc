import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import { formatMoney } from "../../utils/FormatMoney";
import { useProducts } from "../../context/ProductsContext";
import { useTheme } from "../../context/ThemeContext";
import { BiTime } from "react-icons/bi";
import SmallUC from "../../assets/images/smalluc.png";
import AddMoneyToUserModal from "../../components/admin/modals/AddMoneyToUserModal";

const AdminUserPage = () => {
  const { user, users } = useAuth();
  const { userFullName } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const { orders, balanceOrders } = useProducts();
  const { theme } = useTheme();
  const [showAddMoneyToUserModal, setShowAddMoneyToUserModal] = useState(false);

  const getUser = () => {
    const foundUser = users.find((user) => user.fullName === userFullName);
    // console.log({foundUser});
    setUserInfo(foundUser);
  };

  useEffect(() => {
    getUser();
  }, [users, userFullName]);

  const userInfoOrders = orders.filter(
    (userOrder) => userOrder.userEmail == userInfo?.email
  );

  const userInfoBalanceOrders = balanceOrders.filter(
    (userOrder) => userOrder.userEmail == userInfo?.email
  );

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <>
              {userInfo ? (
                <div className="flex flex-col gap-10">
                  <header
                    className="sticky top-0 left-0 w-full h-12 bg-white shadow-md flex justify-between items-center px-2"
                    style={{ zIndex: 1 }}
                  >
                    <button
                      onClick={() => history.back()}
                      className="hover:bg-[#969393]/25 rounded-full p-1 transform transition-all duration-100 ease-in-out active:scale-95"
                    >
                      <IoIosArrowBack size={25} />
                    </button>

                    <h3 className="text-lg font-semibold">
                      زانیاری بەکارهێنەر
                    </h3>

                    <span></span>
                  </header>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-center items-center gap-3">
                      <img
                        src={userInfo.userImageURL}
                        className="w-12 h-12 rounded-full object-cover"
                        alt=""
                      />
                      <h3 className="text-lg font-semibold">
                        {userInfo.fullName}
                      </h3>
                      <p>{userInfo.phoneNumber}</p>
                      <p>{userInfo.email}</p>
                      <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-3">
                        <p className="border border-[#e4e4e5] rounded-md p-2">
                          باڵانسی ئێستا : {formatMoney(userInfo.userMoney)} د.ع
                        </p>

                        <p className="border border-[#e4e4e5] rounded-md p-2">
                          باڵانسی سەرفکردوو :{" "}
                          {formatMoney(userInfo.userMoneySpent)} د.ع
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setShowAddMoneyToUserModal(!showAddMoneyToUserModal)
                        }
                        className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform ease-in-out duration-100 active:scale-95 p-2 w-[150px] rounded-md"
                      >
                        زیادکردنی باڵانس
                      </button>

                      {showAddMoneyToUserModal && (
                        <AddMoneyToUserModal
                          showAddMoneyToUserModal={showAddMoneyToUserModal}
                          setShowAddMoneyToUserModal={
                            setShowAddMoneyToUserModal
                          }
                          userInfo={userInfo}
                        />
                      )}

                      <h3 className="text-lg font-semibold">
                        داواکاریەکان (
                        {formatMoney(
                          userInfoOrders.length + userInfoBalanceOrders.length
                        )}
                        )
                      </h3>
                    </div>

                    <div className="flex flex-col justify-end items-end gap-8 w-full">
                      <div className="flex flex-col justify-end items-end gap-3 w-full border-b border-b-[#e4e4e5] py-2">
                        <h3 className="text-lg font-semibold">
                          داواکاریەکانی باڵانس (
                          {formatMoney(userInfoBalanceOrders.length)})
                        </h3>

                        <div className="flex flex-wrap justify-center items-center gap-3">
                          {userInfoBalanceOrders
                            .reverse()
                            .map((userInfoBalanceOrder, index) => (
                              <Link
                                to={`/admin/payment-order/${userInfoBalanceOrder.id}`}
                                key={index}
                                className={`flex flex-col justify-center items-center gap-2 w-[250px] p-2 rounded-md border ${
                                  theme == "light"
                                    ? "border-[#E4E4E5] bg-white"
                                    : "border-[#969393]/25"
                                } hover:shadow-md active:scale-95 transform transition-all duration-100 ease-in`}
                              >
                                <div className="flex justify-center items-center">
                                  <p>
                                    ڕێگای پارەدان:{" "}
                                    {userInfoBalanceOrder.paymentMethodName}
                                  </p>
                                </div>

                                <div className="flex justify-center items-center">
                                  <p>{userInfoBalanceOrder.phoneNumber}</p>
                                </div>
                                <div
                                  className={`flex flex-row-reverse justify-center items-center w-full border-b ${
                                    theme == "light"
                                      ? "border-b-[#e4e4e5]"
                                      : "border-b-[#969393]/25"
                                  }`}
                                >
                                  {
                                    <p>
                                      {formatMoney(
                                        userInfoBalanceOrder.balanceValue
                                      )}
                                    </p>
                                  }
                                  <p>د.ع</p>
                                </div>

                                <div className="flex flex-row-reverse justify-between items-center w-full px-2">
                                  <div className="flex justify-center items-center gap-1">
                                    <p>
                                      دۆخ:{" "}
                                      {userInfoBalanceOrder.isOrderActive ? (
                                        <span className="text-[#00ff00]">
                                          چالاک
                                        </span>
                                      ) : (
                                        <span>چاوەڕێ بە</span>
                                      )}
                                    </p>
                                  </div>

                                  <div className="flex justify-center items-center gap-1">
                                    <BiTime size={18} />
                                    <p>22/2/2022</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>

                      <div className="flex flex-col justify-end items-end gap-3 w-full">
                        <h3 className="text-lg font-semibold">
                          داواکاریەکانی یوسی (
                          {formatMoney(userInfoOrders.length)})
                        </h3>

                        <div className="flex flex-wrap justify-center items-center gap-3">
                          {userInfoOrders
                            .reverse()
                            .map((userInfoOrder, index) => (
                              <Link
                                to={`/admin/uc-order/${userInfoOrder.id}`}
                                key={index}
                                className={`flex flex-col justify-center items-center gap-2 w-[250px] p-2 rounded-md border ${
                                  theme == "light"
                                    ? "border-[#E4E4E5] bg-white"
                                    : "border-[#969393]/25"
                                } hover:shadow-md active:scale-95 transform transition-all duration-100 ease-in`}
                              >
                                <div className="flex justify-center items-center">
                                  <p>
                                    {userInfoOrder.selectedProduct.ucNumber}
                                  </p>
                                  <img
                                    src={SmallUC}
                                    className="w-7 h-7"
                                    alt=""
                                  />
                                </div>
                                <div
                                  className={`flex flex-row-reverse justify-center items-center w-full border-b ${
                                    theme == "light"
                                      ? "border-b-[#e4e4e5]"
                                      : "border-b-[#969393]/25"
                                  }`}
                                >
                                  <p>
                                    {formatMoney(
                                      userInfoOrder.selectedProduct.ucPrice
                                    )}
                                  </p>
                                  <p>د.ع</p>
                                </div>

                                <div className="flex flex-row-reverse justify-between items-center w-full px-2">
                                  <div className="flex justify-center items-center gap-1">
                                    <p>
                                      دۆخ:{" "}
                                      {userInfoOrder.isOrderActive ? (
                                        <span className="text-[#00ff00]">
                                          چالاک
                                        </span>
                                      ) : (
                                        <span>چاوەڕێ بە</span>
                                      )}
                                    </p>
                                  </div>

                                  <div className="flex justify-center items-center gap-1">
                                    <BiTime size={18} />
                                    <p>22/2/2022</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>ئەم بەکارهێنەرە نەدۆزرایەوە</>
              )}
            </>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default AdminUserPage;
