import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useTheme } from "../context/ThemeContext";
import { BiArrowBack } from "react-icons/bi";
import { formatMoney } from "../utils/FormatMoney";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import BuyAccountModal from "../components/modals/BuyAccountModal";

const AccountPage = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { id } = useParams();
  const { accounts, getUserWithLists, wishList, toggleWishList } =
    useProducts();
  const [accountDetails, setAccountDetails] = useState(null);
  const [showBuyAccountModal, setShowBuyAccountModal] = useState(false);

  const getAccount = () => {
    const foundAccount = accounts.find((account) => account.id == id);
    setAccountDetails(foundAccount);
  };

  useEffect(() => {
    getAccount();
  }, [accounts, id]);

  useEffect(() => {
    if (user) {
      getUserWithLists(user);
    }
  }, [user, wishList]);

  const isWishListed = wishList.some(
    (wishListItem) => wishListItem.productId == id
  );

  return (
    <>
      {user ? (
        <>
          {accountDetails ? (
            <div className="flex flex-col gap-10 w-full">
              <header
                className={`fixed top-0 right-0 w-full h-12 ${
                  theme == "light" ? "bg-white shadow-lg" : "bg-[#131314]"
                } px-2 flex justify-between items-center`}
                style={{ zIndex: 3 }}
              >
                <button
                  onClick={() => history.back()}
                  className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <BiArrowBack size={25} />
                </button>

                <h3 className="text-lg font-semibold">
                  ئایدی پۆبجی: {accountDetails.accountId}
                </h3>

                <div></div>
              </header>

              {/* Account Info */}
              <div className="flex flex-col gap-5 py-[50px] w-full">
                <video controls className="w-full h-[300px]">
                  <source src={accountDetails.accountVideoURL} />
                </video>

                <div className="flex flex-col justify-end items-end p-2 gap-5">
                  <p>{accountDetails.isSold ? "فرۆشراوە" : ""}</p>
                  <p>{accountDetails.accountDescription}</p>
                  <h2 className="text-xl font-semibold">
                    ئایدی: {accountDetails.accountId}
                  </h2>

                  <strong>
                    نرخ: {formatMoney(accountDetails.accountPrice)} د.ع
                  </strong>
                </div>
              </div>

              {accountDetails.isSold ? (
                <></>
              ) : (
                <div
                  className={`fixed bottom-0 right-0 w-full h-11 ${
                    theme == "light" ? "bg-white shadow-lg" : "bg-[#131314]"
                  } flex flex-row-reverse justify-around items-center p-2`}
                >
                  <button
                    onClick={() => setShowBuyAccountModal(!showBuyAccountModal)}
                    className={`border ${
                      theme == "light"
                        ? "bg-white shadow-lg drop-shadow-lg border-[#e4e4e5]"
                        : "bg-[#212121] border-none"
                    } rounded-md p-2 w-[200px] active:scale-95 transform transition-all duration-100 ease-in-out`}
                  >
                    کڕین
                  </button>

                  <button
                    onClick={() => toggleWishList(accountDetails, user)}
                    className="rounded-full w-8 h-8 bg-black/50 flex justify-center items-center active:scale-95 transform transition-all duration-100 ease-in"
                  >
                    {isWishListed ? (
                      <IoIosHeart size={26} color="red" />
                    ) : (
                      <IoIosHeartEmpty size={26} color="white" />
                    )}
                  </button>
                </div>
              )}

              {showBuyAccountModal && (
                <BuyAccountModal
                  showBuyAccountModal={showBuyAccountModal}
                  setShowBuyAccountModal={setShowBuyAccountModal}
                  accountDetails={accountDetails}
                  user={user}
                />
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default AccountPage;
