import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";

const AdminAccountsPage = () => {
  const { user } = useAuth();
  const { accounts } = useProducts();

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="md:grid flex grid-cols-3 gap-5 p-2 w-full">
              <AdminSideBar user={user} />

              <div className="col-span-2 p-2 w-full">
                <div className="flex flex-col gap-5 w-full">
                  <header className="flex flex-row-reverse justify-between items-center w-full bg-white">
                    <h2 className="text-xl font-semibold">({accounts.length}) هەژمارەکان</h2>
                    <Link
                      to="/admin/add-account"
                      className="hover:bg-[#969393]/20 p-1 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                    >
                      هەژمار زیادبکە
                    </Link>
                  </header>

                  <div className="flex flex-row-reverse flex-wrap gap-4 justify-center items-center">
                    {accounts.map((account, index) => (
                      <Link
                        to={`/admin/account/${account.id}`}
                        key={index}
                        className="flex flex-col gap-2 border border-[#e4e4e5] rounded-md shadow-md drop-shadow-md w-[250px] h-[290px]"
                      >
                        <img
                          src={account.accountImageURL}
                          alt=""
                          className="w-full h-[200px] object-cover rounded-tr-md rounded-tl-md"
                        />

                        <div className="flex flex-col justify-end items-end gap-2 px-2">
                          <p>ئایدی: {account.accountId}</p>
                          <p>نرخ: {account.accountPrice}</p>
                        </div>
                      </Link>
                    ))}
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

export default AdminAccountsPage;
