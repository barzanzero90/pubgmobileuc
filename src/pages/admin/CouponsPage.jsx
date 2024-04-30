import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Link } from "react-router-dom";
import AddCouponModal from "../../components/admin/modals/AddCouponModal";
import { useProducts } from "../../context/ProductsContext";

const CouponsPage = () => {
  const { user } = useAuth();
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const { coupons } = useProducts();

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="md:grid flex grid-cols-3 gap-5 p-2 w-full">
              <AdminSideBar user={user} />

              <div className="col-span-2 p-2 w-full">
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-row-reverse justify-between items-center w-full">
                    <h2 className="text-xl font-semibold">({coupons.length}) کۆپۆنەکان</h2>

                    <button
                      onClick={() => setShowAddCouponModal(!showAddCouponModal)}
                      className="hover:bg-[#969393]/25 rounded-md p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
                    >
                      زیادکردنی کۆپۆن
                    </button>

                    {showAddCouponModal && (
                      <AddCouponModal
                        showAddCouponModal={showAddCouponModal}
                        setShowAddCouponModal={setShowAddCouponModal}
                      />
                    )}
                  </div>

                  <div className="flex flex-row-reverse justify-center items-center gap-4">
                    {coupons.map((coupon, index) => (
                      <Link
                        key={index}
                        to={`/admin/coupon/${coupon.id}`}
                        className="flex justify-center items-center w-[150px] p-2 border border-[#e4e4e5] rounded-md"
                      >
                        {coupon.couponCode}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CouponsPage;
