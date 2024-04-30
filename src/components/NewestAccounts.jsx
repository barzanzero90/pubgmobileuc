import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/FormatMoney";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";

const NewestAccounts = () => {
  const { user } = useAuth();
  const { accounts, getUserWithLists, wishList, toggleWishList } =
    useProducts();

  useEffect(() => {
    if (user) {
      getUserWithLists(user);
    }
  }, [user, wishList]);

  const accountId = accounts.map((account) => account.id);
  const isWishListed = wishList.some(
    (wishListItem) => wishListItem.productId == accountId
  );

  return (
    <div className="flex justify-center items-center w-full sm:h-[300px] h-[200px] rounded-md">
      <Swiper
        modules={[Autoplay]}
        autoplay
        onAutoplayTimeLeft={2500}
        loop
        className="w-full h-full"
      >
        {accounts.slice(0, 3).map((account, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex justify-center items-center w-full h-full rounded-md">
              <Link to={`/account/${account.id}`} className="w-full h-full">
                <img
                  src={account.accountImageURL}
                  alt=""
                  className="w-full h-full rounded-md object-center"
                />
              </Link>

              <div className="absolute bottom-0 right-0 rounded-br-md rounded-bl-md w-full bg-black/50 flex flex-row-reverse px-2 text-white justify-between items-center">
                <Link to={`/account/${account.id}`}>
                  <div className="flex flex-col text-right gap-2">
                    <p>ئایدی: {account.accountId}</p>
                    <p>نرخ: {formatMoney(account.accountPrice)} د.ع</p>
                  </div>
                </Link>

                {account.isSold ? (
                  <span className="text-white rounded-md p-1">فرۆشراوە</span>
                ) : (
                  <button
                    onClick={() => toggleWishList(account, user)}
                    className="active:scale-95 transform transition-all duration-100 ease-in-out"
                  >
                    {isWishListed ? (
                      <IoIosHeart size={28} color="red" />
                    ) : (
                      <IoIosHeartEmpty size={28} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewestAccounts;
