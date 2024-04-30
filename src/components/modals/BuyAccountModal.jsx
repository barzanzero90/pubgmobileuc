import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useProducts } from "../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../actions/productActions";

const BuyAccountModal = ({
  showBuyAccountModal,
  setShowBuyAccountModal,
  accountDetails,
  user,
}) => {
  const { theme } = useTheme();
  const { buyAccount, dispatch } = useProducts();

  useEffect(() => {
    if (showBuyAccountModal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }

    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [showBuyAccountModal]);

  const handleBuyAccount = async () => {
    try {
      if (accountDetails?.accountPrice <= user?.userMoney) {
        const accountData = {
          accountDetails,
          userEmail: user?.email,
          userFullName: user?.fullName,
          boughtAt: new Date(),
        }
        await buyAccount(accountData, user);
        alert("پیرۆزە هەژمارەکەت کڕی");
      } else {
        alert("باڵانسی پێویستت نییە بۆ کڕینی ئەم هەژمارە");
      }

      setShowBuyAccountModal(false);
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setShowBuyAccountModal(!showBuyAccountModal)}
      style={{ zIndex: 8 }}
    >
      <div
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[150px] ${
          theme == "light" ? "bg-white" : "bg-[#131314]"
        } rounded-md flex flex-col justify-center items-center gap-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold">
          ئایا دڵنیایت دەتەوێت ئەم هەژمارە بکڕیت؟
        </h3>

        <div className="flex flex-row-reverse justify-around items-center w-full">
          <button
            onClick={handleBuyAccount}
            className="w-[100px] bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            كڕین
          </button>
          <button
            onClick={() => setShowBuyAccountModal(!showBuyAccountModal)}
            className="w-[100px] bg-red-600 hover:bg-red-700 text-white rounded-md p-2 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            گەڕانەوە
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyAccountModal;
