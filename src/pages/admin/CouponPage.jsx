import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { IoIosArrowBack } from "react-icons/io";
import DeleteCouponModal from "../../components/admin/modals/DeleteCouponModal";

const CouponPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { coupons } = useProducts();
  const [coupon, setCoupon] = useState(null);
  const [showDeleteCoupon, setShowDeleteCoupon] = useState(false);

  const getCoupon = () => {
    const foundCoupon = coupons.find((coupon) => coupon.id == id);
    // console.log(foundCoupon);
    setCoupon(foundCoupon);
  };

  useEffect(() => {
    getCoupon();
  }, [coupons, id]);

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <>
              {coupon ? (
                <div className="flex flex-col justify-center items-center gap-10">
                  <header className="sticky top-0 left-0 w-full h-12 bg-white shadow-lg flex justify-between items-center px-2">
                    <button
                      onClick={() => history.back()}
                      className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all ease-in-out duration-100"
                    >
                      <IoIosArrowBack size={25} />
                    </button>

                    <h3 className="text-lg font-bold">
                      {coupon.couponCode} : کۆپۆن
                    </h3>

                    <span></span>
                  </header>

                  <div className="flex flex-col justify-center items-center gap-4">
                    <h2 className="text-xl font-semibold">
                      {coupon.couponCode} : کۆدی کۆپۆن
                    </h2>
                    <p>{coupon.couponDiscount}% : داشکاندن</p>

                    <div className="flex flex-row-reverse justify-center items-center gap-5">
                      <p className="border border-[#e4e4e5] p-2 rounded-md">
                        {coupon.couponStartDate} : کاتی دەستپێکردن
                      </p>
                      <p className="border border-[#e4e4e5] p-2 rounded-md">
                        {coupon.couponEndDate} : کاتی کۆتایپێهاتن
                      </p>
                    </div>

                    <p>{coupon.couponIsActive ? "چالاکە" : "ناچالاکە"}</p>

                    <button
                      onClick={() => setShowDeleteCoupon(!showDeleteCoupon)}
                      className="bg-red-600 text-white hover:bg-red-700 p-2 rounded-md active:scale-95 transform transition-all ease-in-out duration-100"
                    >
                      سڕینەوەی کۆپۆن
                    </button>

                    {showDeleteCoupon && (
                      <DeleteCouponModal
                        showDeleteCoupon={showDeleteCoupon}
                        setShowDeleteCoupon={setShowDeleteCoupon}
                        couponId={coupon.id}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <>ئەم کۆپۆنە بوونی نییە</>
              )}{" "}
            </>
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

export default CouponPage;
