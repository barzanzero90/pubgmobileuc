import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useProducts } from "../../context/ProductsContext";
import { useTheme } from "../../context/ThemeContext";
import { formatMoney } from "../../utils/FormatMoney";
import { BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";
import SmallUC from "../../assets/images/smalluc.png";

const OrdersPage = () => {
  const { user } = useAuth();
  const { orders, balanceOrders } = useProducts();
  const { theme } = useTheme();

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="md:grid flex grid-cols-3 gap-5 p-2 w-full">
              <AdminSideBar user={user} />

              <div className="col-span-2 p-2 w-full">
                <div className="flex flex-col justify-end items-end gap-5 w-full">
                  <div className="flex flex-row-reverse justify-center items-center gap-2">
                    <h2 className="text-xl font-bold">داواکاریەکان</h2>
                    <strong>({orders.length + balanceOrders.length})</strong>
                  </div>

                  <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-5">
                    {/* Balance Orders */}
                    <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-4">
                      {balanceOrders.map((balanceOrder, index) => (
                        <Link
                          to={`/admin/payment-order/${balanceOrder.id}`}
                          key={index}
                          className={`flex flex-col justify-center items-center gap-2 w-[250px] p-2 rounded-md border ${
                            theme == "light"
                              ? "border-[#E4E4E5] bg-white"
                              : "border-[#969393]/25"
                          } hover:shadow-md active:scale-95 transform transition-all duration-100 ease-in`}
                        >
                          <div className="flex justify-center items-center">
                            <p>
                              ڕێگای پارەدان: {balanceOrder.paymentMethodName}
                            </p>
                          </div>

                          <div className="flex justify-center items-center">
                            <p>{balanceOrder.phoneNumber}</p>
                          </div>
                          <div
                            className={`flex flex-row-reverse justify-center items-center w-full border-b ${
                              theme == "light"
                                ? "border-b-[#e4e4e5]"
                                : "border-b-[#969393]/25"
                            }`}
                          >
                            {<p>{formatMoney(balanceOrder.balanceValue)}</p>}
                            <p>د.ع</p>
                          </div>

                          <div className="flex flex-row-reverse justify-between items-center w-full px-2">
                            <div className="flex justify-center items-center gap-1">
                              <p>
                                دۆخ:{" "}
                                {balanceOrder.isOrderActive ? (
                                  <span className="text-[#00ff00]">چالاک</span>
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

                    {/* UC Orders */}
                    <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-4">
                      {orders.map((ucOrder, index) => (
                        <Link
                          to={`/admin/uc-order/${ucOrder.id}`}
                          key={index}
                          className={`flex flex-col justify-center items-center gap-2 w-[250px] p-2 rounded-md border ${
                            theme == "light"
                              ? "border-[#E4E4E5] bg-white"
                              : "border-[#969393]/25"
                          } hover:shadow-md active:scale-95 transform transition-all duration-100 ease-in`}
                        >
                          <div className="flex justify-center items-center">
                            <p>{ucOrder.selectedProduct.ucNumber}</p>
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
                              {formatMoney(ucOrder.selectedProduct.ucPrice)}
                            </p>
                            <p>د.ع</p>
                          </div>

                          <div className="flex flex-row-reverse justify-between items-center w-full px-2">
                            <div className="flex justify-center items-center gap-1">
                              <p>
                                دۆخ:{" "}
                                {ucOrder.isOrderActive ? (
                                  <span className="text-[#00ff00]">چالاک</span>
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
            <>404</>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrdersPage;
