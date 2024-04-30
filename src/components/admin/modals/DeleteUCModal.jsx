import React from "react";
import { useProducts } from "../../../context/ProductsContext";
import { hideScrollBar } from "../../../hooks/hideScrollBar";

const DeleteUCModal = ({
  showDeleteUCModal,
  setShowDeleteUCModal,
  selectedUC,
}) => {
  const { deleteUC } = useProducts();

  hideScrollBar(showDeleteUCModal);

  return (
    <div
      onClick={() => setShowDeleteUCModal(!showDeleteUCModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 1 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[125px] bg-white rounded-md flex flex-col justify-center items-center p-2 gap-5"
      >
        <h3 className="text-lg font-semibold text-right">
          ئایا دڵنیایت لە سڕینەوەی {selectedUC.ucNumber} یوسی
        </h3>

        <div className="flex flex-row-reverse justify-evenly items-center w-full">
          <button
            onClick={() => {
              deleteUC(selectedUC);
              setShowDeleteUCModal(false);
            }}
            className="bg-red-600 hover:bg-red-700 active:scale-95 transform transition-all duration-100 ease-in-out rounded-md text-white p-1.5 w-[100px]"
          >
            سڕینەوە
          </button>

          <button
            onClick={() => setShowDeleteUCModal(!showDeleteUCModal)}
            className="bg-[#969393]/25 hover:bg-[#969393]/50 active:scale-95 transform transition-all duration-100 ease-in-out rounded-md text-black p-1.5 w-[100px]"
          >
            نەخێر
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUCModal;
