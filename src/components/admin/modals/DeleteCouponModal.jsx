import React, { useEffect } from "react";
import { useProducts } from "../../../context/ProductsContext";
import { hideScrollBar } from "../../../hooks/hideScrollBar";

const DeleteCouponModal = ({
  showDeleteCoupon,
  setShowDeleteCoupon,
  couponId,
}) => {
  const { deleteCoupon } = useProducts();

  hideScrollBar(showDeleteCoupon);

  return (
    <div
      onClick={() => setShowDeleteCoupon(!showDeleteCoupon)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 1 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[125px] bg-white rounded-md flex flex-col justify-center items-center p-2 gap-5"
      >
        <h3 className="text-lg font-semibold">
          ئایا دڵنیایت لە سڕینەوە ئەم کۆپۆنە؟
        </h3>

        <div className="flex flex-row-reverse justify-around items-center w-full">
          <button
            onClick={() => {
              deleteCoupon(couponId);
              setShowDeleteCoupon(false);
            }}
            className="bg-red-600 hover:bg-red-700 active:scale-95 transform transition-all duration-100 ease-in-out rounded-md text-white p-1.5 w-[100px]"
          >
            سڕینەوە
          </button>

          <button
            onClick={() => setShowDeleteCoupon(!showDeleteCoupon)}
            className="bg-[#969393]/25 hover:bg-[#969393]/50 active:scale-95 transform transition-all duration-100 ease-in-out rounded-md text-black p-1.5 w-[100px]"
          >
            نەخێر
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCouponModal;
