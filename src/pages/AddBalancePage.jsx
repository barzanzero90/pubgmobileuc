import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import PaymentMethodModal from "../components/modals/PaymentMethodModal";
import { paymentMethods } from "../data/PaymentMethods";
import { useTheme } from "../context/ThemeContext";

const AddBalancePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSelectedPaymentMethod, setIsSelectedPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("FastPay");
  const { theme } = useTheme();

  return (
    <>
      {user ? (
        <div className="md:grid flex grid-cols-3 gap-5 py-[80px] w-full">
          <Helmet>
            <title>یوسی پۆبجی مۆبایل | زیادکردنی باڵانس</title>
          </Helmet>

          <SideBar user={user} />

          <div className="col-span-2 p-2 w-full">
            <div
              className={`flex flex-col justify-center items-center gap-5 mx-auto border ${
                theme == "light"
                  ? "bg-white border-[#E4E4E5] shadow-lg drop-shadow-lg"
                  : "bg-[#131314] border-[#969393]/25"
              } w-[400px] h-[400px] rounded-md`}
            >
              <div className="flex flex-col justify-center items-center gap-3 text-center w-full">
                <h3 className="text-lg font-semibold">زیادکردنی باڵانس</h3>
                <p>
                  بۆ زیادکردنی باڵانس، دەبێت تۆ باڵانسی پێویست بۆ ئێمە بنێریت،
                  لەڕێگای یەکێک لەم شێوازانەی خوارەوە، دوای ئەوەی کەتۆ باڵانس بۆ
                  ئێمە دەنێریت ئێمە باڵانس بۆ تۆ زیاد دەکەین بەگوێرەی ئەو
                  باڵانسەی کە تۆ ناردووتە
                </p>

                {paymentMethods.map((paymentMethod, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-4"
                  >
                    <button
                      onClick={() => {
                        setIsSelectedPaymentMethod(!isSelectedPaymentMethod);
                        setPaymentMethod(paymentMethod);
                      }}
                      className={`flex flex-row-reverse justify-start items-center gap-3 w-[350px] p-2 rounded-md border ${
                        theme == "light"
                          ? "border-[#E4E4E5] shadow-md drop-shadow-md"
                          : "border-[#969393]/25"
                      } hover:shadow-lg active:scale-95 transform transition-all duration-100 ease-in-out`}
                    >
                      <img
                        src={paymentMethod.paymentImage}
                        className="w-10 h-10"
                        alt=""
                      />
                      <h3 className="text-lg">{paymentMethod.paymentName}</h3>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {isSelectedPaymentMethod && (
              <PaymentMethodModal
                isSelectedPaymentMethod={isSelectedPaymentMethod}
                setIsSelectedPaymentMethod={setIsSelectedPaymentMethod}
                paymentMethod={paymentMethod}
                theme={theme}
                user={user}
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddBalancePage;
