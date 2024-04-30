import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import { useProducts } from "../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../actions/productActions";
import { hideScrollBar } from "../../hooks/hideScrollBar";

const OrderUCModal = ({
  showOrderModal,
  setShowOrderModal,
  selectedProduct,
  user,
  formatMoney,
}) => {
  const [pubgId, setPubgId] = useState("");
  const { theme } = useTheme();
  const { orderProduct, dispatch } = useProducts();

  hideScrollBar(showOrderModal);

  const handleOrderUC = async (e) => {
    e.preventDefault();

    try {
      if (pubgId.length == 0) {
        alert("تکایە ئایدی پۆبجی بنووسە");
      }

      if (pubgId.length < 10) {
        alert("نابێت ئایدی پۆبجی لە 10 ژمارە کەمتر بێت");
      }

      if (pubgId.length > 10) {
        alert("نابێت ئایدی پۆبجی لە 10 ژمارە زۆرتر بێت");
      }

      if (pubgId.length == 10) {
        const productData = {
          selectedProduct,
          userFullName: user?.fullName,
          userEmail: user?.email,
          pubgId,
          isOrderActive: false,
          orderedAt: new Date(),
        };
        await orderProduct(productData, user);

        alert("داواکاریەکەت بەسەرکەوتووی نێردرا");

        setShowOrderModal(false);
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setShowOrderModal(!showOrderModal)}
      style={{ zIndex: 8 }}
    >
      <div
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[300px] ${
          theme == "light" ? "bg-white shadow-lg" : "bg-[#131314]"
        } rounded-md flex flex-col justify-center items-center gap-4 p-2`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-xl font-semibold">داواکردن</h3>
          <button
            onClick={() => setShowOrderModal(!showOrderModal)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoCloseOutline size={23} />
          </button>
        </div>
        <strong>باڵانسەکەم: {formatMoney(user.userMoney)} د.ع</strong>

        <p
          className={`border ${
            theme == "light"
              ? "bg-white border-[#E4E4E5]"
              : "bg-[#131314] border-[#24232a]"
          } w-[300px] rounded-md p-2 text-right`}
        >
          ئایا دڵنیای لە داواکردنی{" "}
          <strong>{selectedProduct.ucNumber} یوسی</strong> بە{" "}
          <strong>{formatMoney(selectedProduct.ucPrice)} د.ع</strong> ؟
        </p>

        <input
          type="number"
          placeholder="ئایدی پۆبجی"
          required
          value={pubgId}
          min={0}
          onChange={(e) => setPubgId(e.target.value)}
          className={`border ${
            theme == "light"
              ? "bg-white border-[#E4E4E5]"
              : "bg-[#131314] border-[#24232a]"
          } w-[300px] rounded-md p-2 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />

        <button
          onClick={handleOrderUC}
          className="w-[300px] p-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 active:scale-95 transform transition-all duration-100 ease-in-out"
        >
          داواکردن
        </button>
      </div>
    </div>
  );
};

export default OrderUCModal;
