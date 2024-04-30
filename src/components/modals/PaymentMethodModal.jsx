import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useProducts } from "../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../actions/productActions";
import { hideScrollBar } from "../../hooks/hideScrollBar";

const PaymentMethodModal = ({
  isSelectedPaymentMethod,
  setIsSelectedPaymentMethod,
  paymentMethod,
  theme,
  user,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [balanceValue, setBalanceValue] = useState("");
  const { orderAddBalance, dispatch } = useProducts();

  hideScrollBar(isSelectedPaymentMethod);

  const handleOrder = async () => {
    try {
      if (phoneNumber && balanceValue) {
        const balanceData = {
          phoneNumber,
          balanceValue,
          paymentMethodName: paymentMethod.paymentName,
          userEmail: user?.email,
          userFullName: user?.fullName,
          userMoney: user?.userMoney,
          orderedAt: new Date(),
          isOrderActive: false,
        };

        await orderAddBalance(balanceData);
        alert("داواکردنی باڵانس سەرکەوتووبوو");

        setIsSelectedPaymentMethod(false);
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setIsSelectedPaymentMethod(!isSelectedPaymentMethod)}
      style={{ zIndex: 8 }}
    >
      <div
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] ${
          theme == "light" ? "bg-white" : "bg-[#131314]"
        } rounded-md flex flex-col justify-center items-center gap-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-lg font-semibold">زیادکردنی باڵانس</h3>
          <button
            onClick={() => setIsSelectedPaymentMethod(!isSelectedPaymentMethod)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoCloseOutline size={23} />
          </button>
        </div>
        <div className="flex flex-row-reverse justify-center items-center gap-0.5">
          <p>زیادکردنی باڵانس بەڕێگای</p>
          <p>{paymentMethod.paymentName}</p>
          <img src={paymentMethod.paymentImage} className="w-7 h-7" alt="" />
        </div>
        <p>خاڵبەندی زیادکردنی باڵانس</p>

        <div className="flex flex-col justify-end items-end gap-2">
          <p>١- ناردنی ئەو بڕە پارەی دەتەوێت بۆ ئەم ژمارەیە</p>
          <strong className="mx-auto">
            <a href="tel:+96407518980248">07518980248</a>
          </strong>
        </div>

        <div className="flex flex-col justify-end items-end gap-2">
          <p>٢- ئەو ژمارەیە بنووسە کە باڵانست پێناردووە</p>
          <input
            type="number"
            placeholder="ژمارەی مۆبایل"
            min={0}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
            className={`w-[300px] p-2 border ${
              theme == "light"
                ? "border-[#e4e4e5]"
                : "border-[#969393]/25 bg-[#131314]"
            } rounded-md text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            required
          />
        </div>

        <div className="flex flex-col justify-end items-end gap-2">
          <p>٣- بڕی ئەو پارەیە بنووسە کە ناردووتە</p>
          <input
            type="number"
            placeholder="بڕی پارە"
            min={0}
            value={balanceValue}
            onChange={(e) => setBalanceValue(parseInt(e.target.value))}
            className={`w-[300px] p-2 border ${
              theme == "light"
                ? "border-[#e4e4e5]"
                : "border-[#969393]/25 bg-[#131314]"
            } rounded-md text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            required
          />
        </div>

        <button
          onClick={handleOrder}
          className="w-[300px] rounded-md p-2 bg-blue-700 text-white hover:bg-blue-700 active:scale-95 transform transition-all duration-100 ease-in-out"
        >
          ناردن
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
