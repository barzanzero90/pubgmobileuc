import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Link } from "react-router-dom";
import { CgTimer } from "react-icons/cg";
import { useProducts } from "../../context/ProductsContext";

const FeedbacksPage = () => {
  const { user } = useAuth();
  const { feedbacks } = useProducts();

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="md:grid flex grid-cols-3 gap-5 p-2 w-full">
              <AdminSideBar user={user} />

              <div className="col-span-2 p-2 w-full">
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-row-reverse justify-between items-center px-2">
                    <h2 className="text-xl font-semibold">
                      ({feedbacks.length}) پێشنیارەکان
                    </h2>
                  </div>

                  <div className="flex flex-row-reverse flex-wrap justify-start items-start gap-7">
                    {feedbacks.map((feedback) => (
                      <div className={`flex flex-col justify-start items-start gap-3 w-[270px] ${feedback.feedback.length < 250 ? "h-auto" : "h-[270px]"} border border-[#e4e4e5] rounded-md hover:shadow-md active:scale-95 transform transition-all duration-100 ease-in-out p-2`}>
                        <blockquote className="w-full border-b border-b-[#e4e4e5] py-1 break-words">
                          {feedback.feedback}
                        </blockquote>

                        <div className="flex justify-between items-center w-full">
                          <Link
                            to={`/admin/user/${feedback.userFullName}`}
                            className="flex justify-center items-center gap-2"
                          >
                            <strong>{feedback.userFullName}</strong>
                          </Link>

                          <div className="flex justify-center items-center">
                            <CgTimer />
                            <p>22/7/2024</p>
                          </div>
                        </div>
                      </div>
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

export default FeedbacksPage;
