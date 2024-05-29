import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import { useProducts } from "../../context/ProductsContext";
import { formatMoney } from "../../utils/FormatMoney";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { FormatDate } from "../../utils/FormatDate";

const UCOrderPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { orders } = useProducts();
  const [order, setOrder] = useState(null);

  const getUCOrder = () => {
    const foundUCOrder = orders.find((order) => order.id === id);
    // console.log("ORDER FOUND: ", foundUCOrder);
    setOrder(foundUCOrder);
  };

  useEffect(() => {
    getUCOrder();
  }, [orders, id]);

  const handleActiveOrder = async () => {
    try {
      if (order) {
        const orderDoc = doc(db, "orders", order.id);

        await updateDoc(orderDoc, {
          isOrderActive: !order.isOrderActive,
        });
        console.log("ORDER ACTIVATED");
      }
    } catch (error) {
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

                <h3 className="text-lg font-semibold">داواکاری یوسی</h3>

                <span></span>
              </header>

              <div className="flex">
                {order ? (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <h3 className="text-lg font-semibold">
                      {order.selectedProduct.ucNumber} UC
                      : یوسی 
                    </h3>
                    <p className="">
                      نرخ: {formatMoney(order.selectedProduct.ucPrice)}د.ع
                    </p>
                    <p>کاتی داواکاری : {FormatDate(order.orderedAt)}</p>
                    <p>ئایدی پۆبجی : {order.pubgId}</p>
                    <p>{order.userFullName} : لەلایەن</p>

                    <p>
                      <input type="checkbox" checked={order.isOrderActive || false} onChange={handleActiveOrder} />
                      {" "} : دۆخی داواکاری
                    </p>
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

export default UCOrderPage;
