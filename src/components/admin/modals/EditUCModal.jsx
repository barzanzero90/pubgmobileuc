import React, { useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../../actions/productActions";
import { IoCloseOutline } from "react-icons/io5";
import { hideScrollBar } from "../../../hooks/hideScrollBar";

const EditUCModal = ({ selectedUC, showEditUCModal, setShowEditUCModal }) => {
  const [ucNumber, setUCNumber] = useState(selectedUC.ucNumber);
  const [ucPrice, setUCPrice] = useState(selectedUC.ucPrice);
  const { editUC, dispatch } = useProducts();

  hideScrollBar(showEditUCModal);

  const handleEditUC = async (e) => {
    e.preventDefault();

    try {
      if (ucNumber && ucPrice) {
        const ucData = {
          ucNumber,
          ucPrice,
        };

        await editUC(ucData, selectedUC);

        setShowEditUCModal(false);
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowEditUCModal(!showEditUCModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 1 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[210px] bg-white rounded-md flex flex-col justify-center items-center p-2 gap-4"
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-lg font-semibold">نوێکردنەوەی یوسی</h3>
          <button
            onClick={() => setShowEditUCModal(!showEditUCModal)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoCloseOutline size={23} />
          </button>
        </div>

        <form
          onSubmit={handleEditUC}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="text"
            placeholder="ژمارەی یوسی"
            value={ucNumber}
            onChange={(e) => setUCNumber(e.target.value)}
            className="w-[250px] border border-[#e4e4e5] rounded-md p-2 text-right"
          />

          <input
            type="number"
            placeholder="نرخی یوسی"
            value={ucPrice}
            onChange={(e) => setUCPrice(parseInt(e.target.value))}
            className="w-[250px] border border-[#e4e4e5] rounded-md p-2 text-right"
          />

          <button className="bg-blue-600 text-white w-[250px] p-2 rounded-md hover:bg-blue-700 active:scale-95 transform transition-all duration-100 ease-in-out">
            نوێکردنەوە
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUCModal;
