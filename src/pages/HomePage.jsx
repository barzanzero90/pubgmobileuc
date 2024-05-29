import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import SideBar from "../components/SideBar";
import SocialMediasSwiper from "../components/SocialMediasSwiper";
import SmallUC from "../assets/images/smalluc.png";
import OrderUCModal from "../components/modals/OrderUCModal";
import { useTheme } from "../context/ThemeContext";
import { useProducts } from "../context/ProductsContext";
import { formatMoney } from "../utils/FormatMoney";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const { user } = useAuth();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { theme } = useTheme();
  const { uc } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, [2000]);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectProduct = (uc) => {
    setSelectedProduct(uc);
    setShowOrderModal(true);
  };

  return (
    <div className="">
      {user ? (
        <div className="md:grid flex grid-cols-3 gap-5 py-[80px] w-full">
          <Helmet>
            <title>یوسی پۆبجی مۆبایل</title>
          </Helmet>

          <SideBar user={user} />

          <div className="col-span-2 p-2 w-full">
            <div className="flex flex-col gap-5">
              <SocialMediasSwiper />

              <div className="flex flex-col justify-end items-end gap-3">
                <div className="flex flex-row-reverse justify-center items-center gap-1">
                  <h3 className="text-lg font-semibold">یوسی</h3>
                  <img src={SmallUC} className="w-7 h-7" alt="" />
                </div>

                <div className="flex flex-wrap justify-center items-center gap-3">
                  {loading ? (
                    <div className="loader"></div>
                  ) : (
                    <>
                      {uc.map((uc, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            user.userMoney < uc.ucPrice
                              ? alert(
                                  "ناتوانیت ئەم داواکاریە بکەیت، چونکە باڵانسی پێویستت نییە"
                                )
                              : handleSelectProduct(uc);
                          }}
                          className={`flex flex-col justify-center items-center gap-2 w-[150px] p-2 rounded-md border ${
                            theme == "light"
                              ? "border-[#E4E4E5] bg-white"
                              : "border-[#969393]/25"
                          } hover:shadow-md active:scale-95 transform transition-all duration-100 ease-in`}
                        >
                          <div className="flex justify-center items-center">
                            <p>{uc.ucNumber}</p>
                            <img src={SmallUC} className="w-7 h-7" alt="" />
                          </div>
                          <div className="flex flex-row-reverse justify-center items-center">
                            <p>{formatMoney(uc.ucPrice)}</p>
                            <p>د.ع</p>
                          </div>
                        </button>
                      ))}
                    </>
                  )}

                  {showOrderModal && (
                    <OrderUCModal
                      showOrderModal={showOrderModal}
                      setShowOrderModal={setShowOrderModal}
                      selectedProduct={selectedProduct}
                      user={user}
                      formatMoney={formatMoney}
                    />
                  )}
                </div>
              </div>

              {/* <div className="flex flex-col justify-end items-end gap-3">
                <div className="flex flex-row-reverse justify-center items-center">
                  <h3 className="text-lg font-semibold">هەژمارەکانی پۆبجی</h3>
                </div>

                <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-3">
                  {accounts.slice(0, 6).map((account, index) => (
                    <AccountCard key={index} account={account} user={user} />
                  ))}
                </div>
              </div>
              <Link
                to="/accounts"
                className="w-[150px] text-center mx-auto border border-blue-700 rounded-md p-2 hover:bg-blue-700 hover:text-white transform transition-all duration-100 ease-in-out active:scale-95"
              >
                بینینی هەژمارەکان
              </Link> */}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomePage;
