import React, { useState } from "react";
import { hideScrollBar } from "../../../hooks/hideScrollBar";
import { CgClose } from "react-icons/cg";
import { formatMoney } from "../../../utils/FormatMoney";
import { useProducts } from "../../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../../actions/productActions";

const AddMoneyToUserModal = ({
  showAddMoneyToUserModal,
  setShowAddMoneyToUserModal,
  userInfo,
}) => {
  const { addMoneyToUser, dispatch } = useProducts();
  const [userMoney, setUserMoney] = useState();

  hideScrollBar(showAddMoneyToUserModal);

  const handleAddMoneyToUser = async () => {
    try {
      if (userMoney) {
        const userData = {
          userInfo,
          userMoney,
        };
        await addMoneyToUser(userData);

        alert(
          `${userInfo?.fullName} باڵانس بەسەرکەوتووی زیادکرا بۆ ${userMoney} بڕی`
        );

        setShowAddMoneyToUserModal(false);
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowAddMoneyToUserModal(!showAddMoneyToUserModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 3 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[205px] bg-white rounded-md flex flex-col justify-start items-center p-1 gap-4"
      >
        <div className="flex justify-between items-center px-2 py-1 w-full">
          <span></span>
          <h3 className="text-lg font-semibold">
            {userInfo?.fullName} زیادکردنی باڵانس بۆ
          </h3>

          <button
            onClick={() => setShowAddMoneyToUserModal(!showAddMoneyToUserModal)}
            className="hover:bg-[#969393]/25 p-1 rounded-full transition-all transform ease-in-out duration-100 active:scale-95"
          >
            <CgClose size={22} />
          </button>
        </div>

        <p>
          باڵانسی ئێستای ئەم بەکارهێنەرە: {formatMoney(userInfo?.userMoney)} د.ع
        </p>

        <input
          type="number"
          className="w-[300px] p-2 rounded-md border border-[#e4e4e5] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="بڕی باڵانس"
          title="بڕی باڵانس"
          value={userMoney}
          onChange={(e) => setUserMoney(parseInt(e.target.value))}
          required
        />

        <button
          onClick={handleAddMoneyToUser}
          className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform ease-in-out duration-100 active:scale-95 p-2 w-[300px] rounded-md"
        >
          زیادکردن
        </button>
      </div>
    </div>
  );
};

export default AddMoneyToUserModal;
