import React, { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import { CgClose } from "react-icons/cg";
import { PRODUCTACTIONS } from "../../../actions/productActions";
import { hideScrollBar } from "../../../hooks/hideScrollBar";

const EditAccountModal = ({
  showEditAccountModal,
  setShowEditAccountModal,
  accountDetails,
}) => {
  const [accountId, setAccountId] = useState(accountDetails?.accountId);
  const [accountPrice, setAccountPrice] = useState(
    accountDetails?.accountPrice
  );
  const [accountDescription, setAccountDescription] = useState(
    accountDetails?.accountDescription
  );
  const [accountType, setAccountType] = useState(accountDetails?.accountType);
  const [accountUsername, setAccountUsername] = useState(
    accountDetails?.accountUsername
  );
  const [accountPassword, setAccountPassword] = useState(
    accountDetails?.accountPassword
  );
  const { editAccount, dispatch } = useProducts();

  hideScrollBar(showEditAccountModal);

  const handleEditAccount = async (e) => {
    e.preventDefault();

    try {
      if (accountId && accountPrice && accountDescription) {
        const accountData = {
          accountId,
          accountPrice,
          accountDescription,
          accountType,
          accountUsername,
          accountPassword,
        };

        await editAccount(accountDetails.id, accountData);

        setShowEditAccountModal(false);
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowEditAccountModal(!showEditAccountModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 1 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] bg-white rounded-md flex flex-col justify-center items-center p-2 gap-4"
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-lg font-semibold">نوێکردنەوەی هەژمار</h3>
          <button
            onClick={() => setShowEditAccountModal(!showEditAccountModal)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <CgClose size={23} />
          </button>
        </div>

        <form
          onSubmit={handleEditAccount}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="text"
            placeholder="ئایدی هەژمار"
            required
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-[300px] p-2 rounded-md border border-[#e4e4e5] text-right"
          />

          <input
            type="text"
            placeholder="نرخی هەژمار"
            required
            value={accountPrice}
            onChange={(e) => setAccountPrice(parseInt(e.target.value))}
            className="w-[300px] p-2 rounded-md border border-[#e4e4e5] text-right"
          />

          <textarea
            cols="10"
            rows="2"
            placeholder="وەسف"
            value={accountDescription}
            onChange={(e) => setAccountDescription(e.target.value)}
            className="w-[300px] p-2 border border-[#e4e4e5] rounded-md text-right"
          ></textarea>

          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-[300px] p-2 border border-[#e4e4e5] rounded-md text-right"
          >
            <option selected disabled>
              جۆری هەژمار
            </option>

            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Email/Password">Email/Password</option>
          </select>

          <input
            type="text"
            placeholder="ناوی هەژمار"
            required
            value={accountUsername}
            onChange={(e) => setAccountUsername(e.target.value)}
            className="w-[300px] p-2 rounded-md border border-[#e4e4e5] text-right"
          />

          <input
            type="text"
            placeholder="وشەی نهێنی هەژمار"
            required
            value={accountPassword}
            onChange={(e) => setAccountPassword(e.target.value)}
            className="w-[300px] p-2 rounded-md border border-[#e4e4e5] text-right"
          />

          <button className="w-[300px] bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 active:scale-95 transform transition-all duration-100 ease-in-out">
            نوێکردنەوە
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAccountModal;
