import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import { IoArrowBack } from "react-icons/io5";
import DeleteAccountModal from "../../components/admin/modals/DeleteAccountModal";
import EditAccountModal from "../../components/admin/modals/EditAccountModal";

const AdminAccountPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { accounts } = useProducts();
  const [accountDetails, setAccountDetails] = useState(null);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showEditAccountModal, setShowEditAccountModal] = useState(false);

  const getAccount = () => {
    const foundAccount = accounts.find((account) => account.id == id);
    // console.log(foundAccount);
    setAccountDetails(foundAccount);
  };

  useEffect(() => {
    getAccount();
  }, [accounts, id]);

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <>
              {accountDetails ? (
                <div className="flex flex-col justify-center items-center gap-10">
                  <header
                    className="sticky top-0 left-0 w-full h-12 bg-white shadow-md flex justify-between items-center px-2"
                    style={{ zIndex: 1 }}
                  >
                    <button
                      className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
                      onClick={() => history.back()}
                    >
                      <IoArrowBack size={25} />
                    </button>

                    <h3 className="text-lg font-semibold">
                      ئایدی: {accountDetails.accountId}
                    </h3>

                    <span></span>
                  </header>

                  <div className="flex flex-col justify-center items-center w-full gap-4">
                    <div className="flex flex-wrap justify-around items-center w-full p-3">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <img
                          src={accountDetails.accountImageURL}
                          className="w-[290px] h-[200px] rounded-md object-cover"
                          alt=""
                        />

                        <video controls>
                          <source
                            src={accountDetails.accountVideoURL}
                            type="video/mp4"
                          />
                        </video>
                      </div>

                      <div className="flex flex-col justify-end items-end gap-2">
                        <h3 className="text-lg font-semibold">
                          ئایدی: {accountDetails.accountId}
                        </h3>
                        <p>وەسف: {accountDetails.accountDescription}</p>
                        <strong>نرخ: {accountDetails.accountPrice} د.ع</strong>
                        <p>{accountDetails.accountType} : جۆری هەژمار</p>
                        <p>{accountDetails.accountUsername} : ناوی هەژمار</p>
                        <p>{accountDetails.accountPassword} : وشەی نهێنی هەژمار</p>
                      </div>
                    </div>

                    <div className="flex flex-row-reverse justify-center items-center gap-3">
                      <button
                        onClick={() =>
                          setShowEditAccountModal(!showEditAccountModal)
                        }
                        className="p-2 text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-md transform transition-all ease-in-out duration-100"
                      >
                        نوێکردنەوەی هەژمار
                      </button>

                      {showEditAccountModal && (
                        <EditAccountModal
                          showEditAccountModal={showEditAccountModal}
                          setShowEditAccountModal={setShowEditAccountModal}
                          accountDetails={accountDetails}
                        />
                      )}

                      <button
                        onClick={() =>
                          setShowDeleteAccountModal(!showDeleteAccountModal)
                        }
                        className="p-2 text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-md transform transition-all ease-in-out duration-100"
                      >
                        سڕینەوەی هەژمار
                      </button>

                      {showDeleteAccountModal && (
                        <DeleteAccountModal
                          showDeleteAccountModal={showDeleteAccountModal}
                          setShowDeleteAccountModal={setShowDeleteAccountModal}
                          accountDetails={accountDetails}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>ئەم هەژمارە بوونی نییە</>
              )}
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

export default AdminAccountPage;
