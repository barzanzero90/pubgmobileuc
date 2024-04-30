import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useProducts } from "../../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../../actions/productActions";
import { hideScrollBar } from "../../../hooks/hideScrollBar";

const AddUCModal = ({ showAddUCModal, setShowAddUCModal }) => {
  const [ucNumber, setUCNumber] = useState("");
  const [ucPrice, setUCPrice] = useState("");
  const { addUC, dispatch } = useProducts();

  hideScrollBar(showAddUCModal);

  const handleAddUC = async (e) => {
    e.preventDefault();

    try {
      if (ucNumber && ucPrice) {
        const ucData = {
          ucNumber,
          ucPrice,
          createdAt: new Date(),
        };

        await addUC(ucData);
        alert(`${ucNumber} یوسی زیادکرا`);

        setUCNumber("");
        setUCPrice("");

        setShowAddUCModal(false);
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowAddUCModal(!showAddUCModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 1 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-white rounded-md flex flex-col justify-start items-center p-1 gap-3"
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-lg font-semibold">یوسی زیادبکە</h3>
          <button
            onClick={() => setShowAddUCModal(!showAddUCModal)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoCloseOutline size={23} />
          </button>
        </div>

        <form
          onSubmit={handleAddUC}
          className="flex flex-col justify-center items-center gap-2"
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
            زیادبکە
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUCModal;
