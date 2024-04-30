import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiUsersThree } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { GiProfit } from "react-icons/gi";
import { useProducts } from "../../context/ProductsContext";
import { formatMoney } from "../../utils/FormatMoney";

const AdminPage = () => {
  const { user, users } = useAuth();
  const { theme } = useTheme();
  const { orders, balanceOrders } = useProducts();

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="md:grid flex grid-cols-3 gap-5 p-2 w-full">
              <AdminSideBar user={user} />

              <div className="col-span-2 p-2 w-full">
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-row-reverse justify-between items-center px-2">
                    <div className="flex flex-col justify-end items-end gap-1">
                      <h2 className="text-xl font-semibold">
                        {user.fullName} بەخێربێیەوە
                      </h2>
                      <p>بەشی ئەدمین</p>
                    </div>

                    <div className="flex justify-center items-center gap-4">
                      <div className="flex justify-center items-center gap-2 text-xl">
                        <img
                          src={user.userImageURL}
                          className="w-10 h-10 rounded-full object-cover border border-[#e4e4e5] p-1"
                          alt=""
                        />
                        <h3 className="">{user.fullName}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row-reverse justify-start items-center gap-6 overflow-x-auto w-full h-[150px] bg-[#f9f9f9] rounded-md">
                    <div className="flex flex-col justify-center items-center gap-2 bg-[#f4f4f4] rounded-tr-md rounded-br-md w-[100%] h-full">
                      <div className="flex justify-center items-center gap-1">
                        <div className="bg-[#969393]/25 rounded-full p-1">
                          <FcMoneyTransfer size={18} />
                        </div>
                        <p>کۆی گشتی</p>
                      </div>
                      <h2 className="text-xl font-bold">20,000 IQD</h2>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 bg-[#f9f9f9] border-l border-l-[#e4e4e5] w-[100%] h-full">
                      <div className="flex justify-center items-center gap-1">
                        <div className="bg-[#969393]/25 rounded-full p-1">
                          <PiUsersThree size={18} />
                        </div>
                        <p>بەکارهێنەرەکان</p>
                      </div>
                      <h2 className="text-xl font-bold">{users.length}</h2>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 bg-[#f9f9f9] border-l border-l-[#e4e4e5] w-[100%] h-full">
                      <div className="flex justify-center items-center gap-1">
                        <div className="bg-[#969393]/25 rounded-full p-1">
                          <CiStar size={18} />
                        </div>
                        <p>داواکاریەکان</p>
                      </div>
                      <h2 className="text-xl font-bold">
                        {orders.length + balanceOrders.length}
                      </h2>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 bg-[#f9f9f9] w-[100%] h-full">
                      <div className="flex justify-center items-center gap-1">
                        <div className="bg-[#969393]/25 rounded-full p-1">
                          <GiProfit size={18} />
                        </div>
                        <p>قازانج</p>
                      </div>
                      <h2 className="text-xl font-bold">150,000</h2>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="flex flex-row-reverse justify-between items-center w-full">
                      <strong className="text-lg">
                        نوێترین داواکاریەکانی یوسی
                      </strong>

                      <Link
                        to="/admin/orders"
                        className="text-blue-500 hover:text-blue-600 active:scale-95 transform transition-all ease-in-out"
                      >
                        هەموویان ببینە
                      </Link>
                    </div>

                    <table className="w-full text-right bg-[#f9f9f9] rounded-md">
                      <tr className="w-full border-b border-b-[#969393]/25">
                        <td>ناو</td>
                        <td>ناسنامە</td>
                        <td>نرخ</td>
                        <td>کات</td>
                      </tr>

                      {orders.slice(0, 5).map((ucOrder, index) => (
                        <tr
                          className="w-full border-b border-b-[#969393]/25 last:border-none p-1"
                          key={index}
                        >
                          <td>{ucOrder.selectedProduct.ucNumber} uc</td>
                          <td>{ucOrder.id}</td>
                          <td>
                            {formatMoney(ucOrder.selectedProduct.ucPrice)} IQD
                          </td>
                          <td>2h ago</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
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

export default AdminPage;
