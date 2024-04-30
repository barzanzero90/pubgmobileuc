import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

const CouponModal = ({ showCoupon, setShowCoupon }) => {
  const [couponCode, setCouponCode] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    if (showCoupon) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }

    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [showCoupon]);

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setShowCoupon(!showCoupon)}
      style={{ zIndex: 8 }}
    >
      <div
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[170px] ${
          theme == "light" ? "bg-white" : "bg-[#131314]"
        } rounded-md flex flex-col justify-center items-center gap-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-xl font-semibold">کۆپۆن</h3>
          <button
            onClick={() => setShowCoupon(!showCoupon)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoCloseOutline size={23} />
          </button>
        </div>

        <input
          type="text"
          placeholder="کۆدی کۆپۆن"
          required
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className={`border ${
            theme == "light"
              ? "bg-white border-[#E4E4E5]"
              : "bg-[#131314] border-[#24232a]"
          } w-[300px] rounded-md p-2 text-right`}
        />

        <button className="w-[300px] p-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 active:scale-95 transform transition-all duration-100 ease-in-out">
          داواکردن
        </button>
      </div>
    </div>
  );
};

export default CouponModal;
