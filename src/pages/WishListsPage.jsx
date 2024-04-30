import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

const WishListsPage = () => {
  const { user} = useAuth();
  const { getUserWithLists, wishList } = useProducts();

  useEffect(() => {
    if (user) {
      getUserWithLists(user);
    }
  }, [user, wishList]);

  
  return (
    <>
      {user ? (
        <div className="md:grid flex grid-cols-3 gap-5 py-[80px] w-full">
          <SideBar user={user} />

          <div className="col-span-2 p-2 w-full">
            <div className="flex flex-col gap-5">
              MY WISHLIST{" "}
              {wishList.map((wishListItem) => (
                <>{wishListItem.id}</>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default WishListsPage;
