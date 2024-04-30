import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const { user, users } = useAuth();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="md:grid flex grid-cols-3 gap-5 p-2 w-full">
              <AdminSideBar user={user} />

              <div className="col-span-2 p-2 w-full">
                <div className="flex flex-col justify-end items-end gap-5 w-full">
                  <div className="flex flex-row-reverse justify-between items-center w-full px-2">
                    <h2 className="text-xl font-bold">
                      ({users.length}) بەکارهێنەرەکان
                    </h2>
                    <input
                      type="text"
                      value={search}
                      onChange={handleSearch}
                      placeholder="گەڕان بەدوای بەکارهێنەر لەڕێگای ئیمەیڵ"
                      className="w-[300px] p-2 border border-[#e4e4e5] rounded-md text-right"
                    />
                  </div>

                  <div className="flex flex-wrap flex-row-reverse justify-center items-center gap-5 w-full">
                    {searchUsers.map((user, index) => (
                      <Link
                        key={index}
                        to={`/admin/user/${user.fullName}`}
                        className="flex gap-1 justify-start items-center w-[150px] p-1 border border-[#969393]/25 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                      >
                        <p
                          className={`flex justify-center items-center bg-[#e7e6e6] rounded-full w-10 h-10`}
                        >
                          {user.fullName.charAt(0)}
                        </p>
                        <p>{user.fullName}</p>
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

export default UsersPage;
