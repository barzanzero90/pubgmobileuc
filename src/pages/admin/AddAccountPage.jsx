import React, { useId, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import { PRODUCTACTIONS } from "../../actions/productActions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";

const AddAccountPage = () => {
  const { user } = useAuth();
  const inputId = useId();
  const [accountImage, setAccountImage] = useState("");
  const [accountVideo, setAccountVideo] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountPrice, setAccountPrice] = useState("");
  const [accountDescription, setAccountDescription] = useState("");
  const [accountType, setAccountType] = useState("Facebook");
  const [accountUsername, setAccountUsername] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [isSold, setIsSold] = useState(false);
  const { addAccount, dispatch } = useProducts();

  const handleUploadMedia = async (media) => {
    try {
      const storageRef = ref(storage, `${media.name}`);
      await uploadBytes(storageRef, media);
      const medaiURL = await getDownloadURL(storageRef);
      return medaiURL;
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();

    try {
      if (accountId && accountPrice && accountDescription.trim() != "") {
        let accountImageURL = null;
        let accountVideoURL = null;

        if (accountImage) {
          accountImageURL = await handleUploadMedia(accountImage);
        }

        if (accountVideo) {
          accountVideoURL = await handleUploadMedia(accountVideo);
        }

        const accountData = {
          accountImageURL,
          accountVideoURL,
          accountId,
          accountPrice,
          accountDescription,
          isSold,
          accountType,
          accountUsername,
          accountPassword,
          createdAt: new Date(),
        };

        await addAccount(accountData);
        alert(`${accountId} هەژمار زیادکرا`);

        setAccountImage(null);
        setAccountVideo(null);
        setAccountId("");
        setAccountPrice("");
        setAccountDescription("");
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <>
      {user ? (
        <>
          {user.isAdmin == true ? (
            <div className="flex justify-center items-center h-screen">
              <div className="flex flex-col gap-4 justify-center items-center w-[400px] h-[550px] bg-white shadow-lg drop-shadow-lg rounded-md">
                <h2 className="text-xl font-semibold">هەژمار زیادبکە</h2>

                <form
                  onSubmit={handleAddAccount}
                  className="flex flex-col gap-3 justify-center items-center"
                >
                  <input
                    type="file"
                    id={`${inputId}-account-image`}
                    className="hidden"
                    onChange={(e) => setAccountImage(e.target.files[0])}
                  />
                  <label
                    htmlFor={`${inputId}-account-image`}
                    className="w-[350px] p-2 border border-[#e4e4e5] rounded-md text-right"
                  >
                    وێنەی هەژمار
                  </label>

                  <input
                    type="file"
                    id={`${inputId}-account-video`}
                    className="hidden"
                    onChange={(e) => setAccountVideo(e.target.files[0])}
                  />
                  <label
                    htmlFor={`${inputId}-account-video`}
                    className="w-[350px] p-2 border border-[#e4e4e5] rounded-md text-right"
                  >
                    ڤیدیۆی هەژمار
                  </label>

                  <input
                    type="text"
                    id={`${inputId}-account-id`}
                    placeholder="ئایدی"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="w-[350px] p-2 border border-[#e4e4e5] rounded-md text-right"
                  />

                  <input
                    type="number"
                    id={`${inputId}-account-price`}
                    placeholder="نرخ"
                    value={accountPrice}
                    onChange={(e) => setAccountPrice(parseInt(e.target.value))}
                    className="w-[350px] p-2 border border-[#e4e4e5] rounded-md text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  <textarea
                    id={`${inputId}-account-description`}
                    cols="10"
                    rows="2"
                    placeholder="وەسف"
                    value={accountDescription}
                    onChange={(e) => setAccountDescription(e.target.value)}
                    className="w-[350px] p-2 border border-[#e4e4e5] rounded-md text-right"
                  ></textarea>

                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-[350px] p-2 border border-[#e4e4e5] rounded-md text-right"
                  >
                    <option selected disabled>
                      جۆری هەژمار
                    </option>

                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Email/Password">Email/Password</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Username - Email"
                    value={accountUsername}
                    onChange={(e) => setAccountUsername(e.target.value)}
                    className="w-[350px] p-2 border border-[#e4e4e5] rounded-md text-right"
                  />

                  <input
                    type="text"
                    placeholder="Password"
                    value={accountPassword}
                    onChange={(e) => setAccountPassword(e.target.value)}
                    className="w-[350px] p-2 border border-[#e4e4e5] rounded-md text-right"
                  />

                  <button className="w-[350px] bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 active:scale-95 transform transition-all duration-100 ease-in-out">
                    زیادبکە
                  </button>
                </form>
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

export default AddAccountPage;
