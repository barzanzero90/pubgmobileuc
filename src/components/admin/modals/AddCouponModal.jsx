import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useProducts } from "../../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../../actions/productActions";
import { hideScrollBar } from "../../../hooks/hideScrollBar";

const AddCouponModal = ({ showAddCouponModal, setShowAddCouponModal }) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponStartDate, setCouponStartDate] = useState("");
  const [couponEndDate, setCouponEndDate] = useState("");
  const [couponIsActive, setCouponIsActive] = useState(true);
  const { addCoupon, dispatch } = useProducts();

  hideScrollBar(showAddCouponModal);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    // console.log("ADD COUPON BUTTON CLICKED");

    try {
      if (couponCode.trim() != "" && couponDiscount) {
        const couponData = {
          couponCode,
          couponDiscount,
          couponStartDate,
          couponEndDate,
          couponIsActive,
          createdAt: new Date(),
        };

        await addCoupon(couponData);
        alert(`کۆپۆن ${couponCode} زیادکرا`);

        setCouponCode("");
        setCouponDiscount(0);
        setCouponStartDate("");
        setCouponEndDate("");

        setShowAddCouponModal(false);
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowAddCouponModal(!showAddCouponModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 1 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[325px] bg-white rounded-md flex flex-col justify-start items-center p-1 gap-4"
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-lg font-semibold">کۆپۆن زیادبکە</h3>
          <button
            onClick={() => setShowAddCouponModal(!showAddCouponModal)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoCloseOutline size={23} />
          </button>
        </div>

        <form
          onSubmit={handleAddCoupon}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="text"
            placeholder="کۆدی کۆپۆن"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-[300px] p-2 border border-[#e4e4e5] rounded-md text-right"
          />

          <input
            type="number"
            placeholder="داشکاندن"
            value={couponDiscount}
            onChange={(e) => setCouponDiscount(e.target.value)}
            className="w-[300px] p-2 border border-[#e4e4e5] rounded-md text-right"
          />

          <input
            type="datetime-local"
            placeholder="کاتی دەستپێکردن"
            value={couponStartDate}
            onChange={(e) => setCouponStartDate(e.target.value)}
            className="w-[300px] p-2 border border-[#e4e4e5] rounded-md text-right"
          />

          <input
            type="datetime-local"
            placeholder="کاتی کۆتایی پێهاتن"
            value={couponEndDate}
            onChange={(e) => setCouponEndDate(e.target.value)}
            className="w-[300px] p-2 border border-[#e4e4e5] rounded-md text-right"
          />

          <button className="bg-blue-600 text-white w-[300px] p-2 rounded-md hover:bg-blue-700 active:scale-95 transform transition-all duration-100 ease-in-out">
            زیادبکە
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCouponModal;
