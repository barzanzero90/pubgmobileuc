import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../../components/admin/AdminSideBar";
import AddUCModal from "../../components/admin/modals/AddUCModal";
import SmallUC from "../../assets/images/smalluc.png";
import { useProducts } from "../../context/ProductsContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import DeleteUCModal from "../../components/admin/modals/DeleteUCModal";
import EditUCModal from "../../components/admin/modals/EditUCModal";

const UCPage = () => {
  const { user } = useAuth();
  const { uc } = useProducts();
  const [showAddUCModal, setShowAddUCModal] = useState(false);
  const [showDeleteUCModal, setShowDeleteUCModal] = useState(false);
  const [showEditUCModal, setShowEditUCModal] = useState(false);
  const [selectedUC, setSelectedUC] = useState(null);

  const handleSelectedUCToDelete = (uc) => {
    setSelectedUC(uc);
    setShowDeleteUCModal(true);
  };

  const handleSelectedUCToEdit = (uc) => {
    setSelectedUC(uc);
    setShowEditUCModal(true);
  };

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="md:grid flex grid-cols-3 gap-5 p-2 w-full">
              <AdminSideBar user={user} />

              <div className="col-span-2 p-2 w-full">
                <div className="flex flex-col gap-5 w-full">
                  <header className="flex flex-row-reverse justify-between items-center w-full bg-white">
                    <h2 className="text-xl font-semibold">({uc.length}) یوسی</h2>
                    <button
                      onClick={() => setShowAddUCModal(!showAddUCModal)}
                      className="hover:bg-[#969393]/20 p-1 rounded-md active:scale-95 transform transition-all duration-100 ease-in-out"
                    >
                      یوسی زیادبکە
                    </button>
                  </header>

                  {showAddUCModal && (
                    <AddUCModal
                      showAddUCModal={showAddUCModal}
                      setShowAddUCModal={setShowAddUCModal}
                    />
                  )}

                  <div className="flex flex-wrap flex-row-reverse justify-center items-center gap-3">
                    {uc.map((uc, index) => (
                      <div
                        key={index}
                        className={`relative flex flex-col justify-center items-center gap-2 w-[200px] p-2 rounded-md border border-[#E4E4E5] bg-white hover:drop-shadow-md`}
                      >
                        <div className="flex justify-center items-center">
                          <p>{uc.ucNumber}</p>
                          <img src={SmallUC} className="w-7 h-7" alt="" />
                        </div>
                        <div className="flex flex-row-reverse justify-center items-center">
                          <p>{uc.ucPrice.toLocaleString()}</p>
                          <p>د.ع</p>
                        </div>

                        <div className="absolute top-0 left-0 flex justify-between items-center w-full p-1">
                          <button
                            onClick={() => handleSelectedUCToDelete(uc)}
                            className="bg-red-600 hover:bg-red-700 active:scale-95 transform transition-all duration-100 ease-in-out rounded-full text-white p-1"
                          >
                            <RiDeleteBinLine size={23} />
                          </button>

                          <button
                            onClick={() => handleSelectedUCToEdit(uc)}
                            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transform transition-all duration-100 ease-in-out rounded-full text-white p-1"
                          >
                            <FiEdit size={23} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {showDeleteUCModal && (
                      <DeleteUCModal
                        selectedUC={selectedUC}
                        showDeleteUCModal={showDeleteUCModal}
                        setShowDeleteUCModal={setShowDeleteUCModal}
                      />
                    )}

                    {showEditUCModal && (
                      <EditUCModal
                        selectedUC={selectedUC}
                        showEditUCModal={showEditUCModal}
                        setShowEditUCModal={setShowEditUCModal}
                      />
                    )}
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

export default UCPage;
