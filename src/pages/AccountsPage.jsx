import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import NewestAccounts from "../components/NewestAccounts";
import AccountCard from "../components/AccountCard";
import { useProducts } from "../context/ProductsContext";

const AccountsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { accounts } = useProducts();

  return (
    <>
      {user ? (
        <div className="md:grid flex grid-cols-3 gap-5 py-[80px] w-full">
          <SideBar user={user} />

          <div className="col-span-2 p-2 w-full">
            <div className="flex flex-col gap-5 w-full">
                <NewestAccounts />

              <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-3">
                {accounts.map((account, index) => (
                  <AccountCard key={index} account={account} user={user} />
                ))}
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

export default AccountsPage;
