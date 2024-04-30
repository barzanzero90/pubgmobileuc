import React, { useEffect } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { formatMoney } from "../utils/FormatMoney";
import { useProducts } from "../context/ProductsContext";

const AccountCard = ({ account, user }) => {
  const { theme } = useTheme();
  const { getUserWithLists, wishList, toggleWishList } = useProducts();

  useEffect(() => {
    if (user) {
      getUserWithLists(user);
    }
  }, [user, wishList]);

  const isWishListed = wishList.some(
    (wishListItem) => wishListItem.productId == account.id
  );

  return (
    <div
      className={`relative flex flex-col gap-2 w-[250px] h-[290px] rounded-md border ${
        theme == "light" ? "border-[#E4E4E5] bg-white" : "border-[#969393]/25"
      } hover:shadow-md`}
    >
      <Link
        to={`/account/${account.id}`}
        className="active:scale-95 transform transition-all duration-100 ease-in"
      >
        <img
          src={account.accountImageURL}
          className="w-full h-[200px] object-cover rounded-tr-md rounded-tl-md"
          alt=""
        />
      </Link>
      <Link
        to={`/account/${account.id}`}
        className="flex flex-col justify-end items-end gap-2 p-2 active:scale-95 transform transition-all duration-100 ease-in"
      >
        <p className="text-lg">ئایدی: {account.accountId}</p>
        <p>نرخ: {formatMoney(account.accountPrice)} د.ع</p>
      </Link>

      <div className="absolute top-1 right-1 flex justify-end items-center px-2 w-full">
        {account.isSold ? (
          <span className="bg-black/50 text-white rounded-md p-1">
            فرۆشراوە
          </span>
        ) : (
          <button
            onClick={() => toggleWishList(account, user)}
            className="p-1 rounded-full w-8 h-8 bg-black/50 flex justify-center items-center active:scale-95 transform transition-all duration-100 ease-in"
          >
            {isWishListed ? (
              <IoIosHeart size={26} color="red" />
            ) : (
              <IoIosHeartEmpty size={26} color="white" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountCard;
