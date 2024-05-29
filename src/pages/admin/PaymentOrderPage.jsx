import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { formatMoney } from "../../utils/FormatMoney";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { PRODUCTACTIONS } from "../../actions/productActions";

const PaymentOrderPage = () => {
  const { user } = useAuth();
  const { addMoneyToUser, dispatch } = useProducts();
  const { id } = useParams();
  const { balanceOrders } = useProducts();
  const [balanceOrder, setBalanceOrder] = useState(null);
  const [userMoney, setUserMoney] = useState();

  const getBalanceOrder = () => {
    const foundBalanceOrder = balanceOrders.find(
      (balanceOrder) => balanceOrder.id == id
    );
    // console.log(foundBalanceOrder);
    setBalanceOrder(foundBalanceOrder);
  };

  useEffect(() => {
    getBalanceOrder();
  }, [balanceOrders, id]);

  const handleActiveOrder = async () => {
    try {
      if (balanceOrder) {
        const balanceOrderDoc = doc(db, "orderBalances", balanceOrder.id);

        await updateDoc(balanceOrderDoc, {
          isOrderActive: !balanceOrder.isOrderActive,
        });
        console.log("ORDER ACTIVATED");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddMoneyToUser = async () => {
    try {
      if (balanceOrder && userMoney) {
        const userData = {
          userInfo: {
            id: balanceOrder.userEmail,
            userMoney: balanceOrder.userMoney,
          },
          userMoney,
        };

        await addMoneyToUser(userData);
        alert(
          `${balanceOrder?.userFullName} باڵانس بەسەرکەوتووی زیادکرا بۆ ${userMoney} بڕی`
        );
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="flex flex-col justify-center items-center gap-10">
              <header className="sticky top-0 left-0 w-full h-12 bg-white shadow-md flex justify-between items-center px-2">
                <button
                  onClick={() => history.back()}
                  className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <IoIosArrowBack size={25} />
                </button>

                <h3 className="text-lg font-semibold">داواکاری باڵانس</h3>

                <span></span>
              </header>

              <div className="flex">
                {balanceOrder ? (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <h3 className="text-lg font-semibold">
                      {formatMoney(balanceOrder.balanceValue)} IQD
                      : باڵانسی ناردوو 
                    </h3>
                    <p>رێگای پارەدان : {balanceOrder.paymentMethodName}</p>
                    <p>ژمارەی باڵانس پێناردوو : {balanceOrder.phoneNumber}</p>
                    {/* <p>کاتی داواکاری : {balanceOrder.orderedAt}</p> */}
                    <p>{balanceOrder.userFullName} : لەلایەن </p>

                    <p>
                      <input
                        type="checkbox"
                        checked={balanceOrder.isOrderActive || false}
                        onChange={handleActiveOrder}
                      />
                      {" "} : دۆخی داواکاری
                    </p>

                    <input
                      type="number"
                      min={0}
                      className="w-[300px] p-2 rounded-md border border-[#e4e4e5] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={userMoney}
                      onChange={(e) => setUserMoney(parseInt(e.target.value))}
                      placeholder="بڕی باڵانس"
                      required
                    />

                    <button
                      onClick={handleAddMoneyToUser}
                      className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform ease-in-out duration-100 active:scale-95 p-2 w-[300px] rounded-md"
                    >
                      زیادکردنی باڵانس
                    </button>
                  </div>
                ) : (
                  <>ئەم داواکاریە نەدۆزرایەوە</>
                )}
              </div>
            </div>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default PaymentOrderPage;
