import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useProducts } from "../context/ProductsContext";
import SmallUC from "../assets/images/smalluc.png";
import { formatMoney } from "../utils/FormatMoney";
import { useTheme } from "../context/ThemeContext";
import { BiTime } from "react-icons/bi";
import { FormatDate } from "../utils/FormatDate";

const MyOrdersPage = () => {
  const { user } = useAuth();
  const { orders, balanceOrders } = useProducts();
  const { theme } = useTheme();

  const userOrders = orders.filter(
    (userOrder) => userOrder.userEmail == user?.email
  );

  const userBalanceOrders = balanceOrders.filter(
    (balanceOrder) => balanceOrder.userEmail == user?.email
  );

  return (
    <>
      {user ? (
        <div className="md:grid flex grid-cols-3 gap-5 py-[80px] w-full">
          <SideBar user={user} />

          <div className="col-span-2 p-2 w-full">
            <div className="flex flex-col gap-5 justify-center items-center">
              <h2 className="text-xl font-bold">داواکاریەکانم</h2>

              <div
                className={`flex flex-col gap-3 w-full border-b ${
                  theme == "light"
                    ? "border-b-[#e4e4e5]"
                    : "border-b-[#969393]/25"
                } py-2`}
              >
                <div className="flex flex-row-reverse justify-start items-center gap-1">
                  <h3 className="text-lg font-semibold text-right">
                    زیادکردنی باڵانس
                  </h3>
                </div>

                <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-4">
                  {userBalanceOrders.length > 0 ? (
                    <>
                      {userBalanceOrders.map((userBalanceOrder, index) => (
                        <div
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
                              {userBalanceOrder.paymentMethodName}
                            </p>
                          </div>

                          <div className="flex justify-center items-center">
                            <p>{userBalanceOrder.phoneNumber}</p>
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
                                {formatMoney(userBalanceOrder.balanceValue)}
                              </p>
                            }
                            <p>د.ع</p>
                          </div>

                          <div className="flex flex-row-reverse justify-between items-center w-full px-2">
                            <div className="flex justify-center items-center gap-1">
                              <p>
                                دۆخ:{" "}
                                {userBalanceOrder.isOrderActive ? (
                                  <span className="text-[#00ff00]">چالاک</span>
                                ) : (
                                  <span>چاوەڕێ بە</span>
                                )}
                              </p>
                            </div>

                            <div className="flex justify-center items-center gap-1">
                              <BiTime size={18} />
                              <p>{FormatDate(userBalanceOrder.orderedAt)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>هیچ داواکاریەکی باڵانست نەکردووە</>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-row-reverse justify-start items-center gap-1">
                  <h3 className="text-lg font-semibold text-right">یوسی</h3>
                  <img src={SmallUC} className="w-7 h-7" alt="" />
                </div>

                <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-4">
                  {userOrders.length > 0 ? (
                    <>
                      {userOrders.map((userOrder, index) => (
                        <div
                          key={index}
                          className={`flex flex-col justify-center items-center gap-2 w-[250px] p-2 rounded-md border ${
                            theme == "light"
                              ? "border-[#E4E4E5] bg-white"
                              : "border-[#969393]/25"
                          } hover:shadow-md active:scale-95 transform transition-all duration-100 ease-in`}
                        >
                          <div className="flex justify-center items-center">
                            <p>{userOrder.selectedProduct.ucNumber}</p>
                            <img src={SmallUC} className="w-7 h-7" alt="" />
                          </div>
                          <div
                            className={`flex flex-row-reverse justify-center items-center w-full border-b ${
                              theme == "light"
                                ? "border-b-[#e4e4e5]"
                                : "border-b-[#969393]/25"
                            }`}
                          >
                            <p>
                              {formatMoney(userOrder.selectedProduct.ucPrice)}
                            </p>
                            <p>د.ع</p>
                          </div>

                          <div className="flex flex-row-reverse justify-between items-center w-full px-2">
                            <div className="flex justify-center items-center gap-1">
                              <p>
                                دۆخ:{" "}
                                {userOrder.isOrderActive ? (
                                  <span className="text-[#00ff00]">چالاک</span>
                                ) : (
                                  <span>چاوەڕێ بە</span>
                                )}
                              </p>
                            </div>

                            <div className="flex justify-center items-center gap-1">
                              <BiTime size={18} />
                              <p>{FormatDate(userOrder.orderedAt)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>هیچ داواکاریەکی یوسیت نەکردووە</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyOrdersPage;
