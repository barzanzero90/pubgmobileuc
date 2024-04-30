import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import { useProducts } from "../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../actions/productActions";
import { hideScrollBar } from "../../hooks/hideScrollBar";

const FeedbackModal = ({ showFeedback, setShowFeedback, user }) => {
  const [feedback, setFeedback] = useState("");
  const { theme } = useTheme();
  const { addFeedback, dispatch } = useProducts();
  const characterLimit = 250;

  hideScrollBar(showFeedback);

  const adjustHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  const handleChangeFeedback = (e) => {
    const value = e.target.value;
    setFeedback(value);
  };

  const handleAddFeedback = async () => {
    try {
      if (feedback.trim() != "") {
        const feedbackData = {
          feedback,
          createdAt: new Date(),
          userFullName: user?.fullName,
        };
        await addFeedback(feedbackData);

        setFeedback("");

        alert("سووپاس بۆ پێشنیارەکەت");
        setShowFeedback(false);
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setShowFeedback(!showFeedback)}
      style={{ zIndex: 8 }}
    >
      <div
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 sm:w-[350px] w-[300px] h-[325px] rounded-md ${
          theme == "light" ? "bg-white" : "bg-[#131314]"
        } flex flex-col justify-start items-center gap-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="hover:bg-[#969393]/25 rounded-full p-1 mt-2 mr-2 ml-auto active:scale-95 transform transition-all duration-100 ease-in-out"
        >
          <IoCloseOutline size={23} />
        </button>

        <h3 className="text-xl font-semibold">پێشنیارێکمان پێبدە</h3>

        <div className="relative">
          <textarea
            placeholder="پێشنیار"
            value={feedback}
            onChange={handleChangeFeedback}
            rows={1}
            maxLength={characterLimit}
            onInput={adjustHeight}
            className={`sm:w-[300px] w-[250px] border ${
              theme == "light"
                ? "border-[#E4E4E5]"
                : "border-[#969393]/25 bg-[#131314]"
            } rounded-md p-2 resize-none overflow-y-auto text-right`}
          />
          <p className="absolute bottom-2 left-2">
            {characterLimit}/{feedback.length}
          </p>
        </div>
        <button
          onClick={handleAddFeedback}
          className="sm:w-[300px] w-[250px] p-2 bg-blue-700 text-white hover:bg-blue-800 active:scale-95 transform transition-all duration-100 ease-in-out rounded-md"
        >
          ناردن
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
