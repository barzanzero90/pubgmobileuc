import { createContext, useContext, useEffect, useReducer } from "react";
import { PRODUCTACTIONS } from "../actions/productActions";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

const productsInitialState = {
  loading: true,
  error: null,
  uc: [],
  accounts: [],
  coupons: [],
  feedbacks: [],
  orders: [],
  wishList: [],
  balanceOrders: [],
  accountsBought: [],
};

function productsReducer(state, action) {
  switch (action.type) {
    case PRODUCTACTIONS.SET_LOADING:
      return { ...state, loading: true };

    case PRODUCTACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case PRODUCTACTIONS.SET_UC:
      return {
        ...state,
        uc: action.payload,
      };

    case PRODUCTACTIONS.SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };

    case PRODUCTACTIONS.SET_COUPONS:
      return {
        ...state,
        coupons: action.payload,
      };

    case PRODUCTACTIONS.SET_FEEDBACKS:
      return {
        ...state,
        feedbacks: action.payload,
      };

    case PRODUCTACTIONS.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case PRODUCTACTIONS.SET_ORDER_BALANCE:
      return {
        ...state,
        balanceOrders: action.payload,
      };

    case PRODUCTACTIONS.SET_WISH_LIST:
      return {
        ...state,
        wishList: action.payload,
      };

    case PRODUCTACTIONS.SET_USER_ACCOUNTS:
      return {
        ...state,
        accountsBought: action.payload,
      };

    default:
      return state;
  }
}

export function ProductsContextProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, productsInitialState);

  const getUC = async () => {
    try {
      const ucCollection = collection(db, "uc");
      onSnapshot(
        query(ucCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const uc = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PRODUCTACTIONS.SET_UC,
            payload: uc,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const getAccounts = async () => {
    try {
      const accountsCollection = collection(db, "accounts");
      onSnapshot(
        query(accountsCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const accounts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PRODUCTACTIONS.SET_ACCOUNTS,
            payload: accounts,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const getCoupons = async () => {
    try {
      const couponsCollection = collection(db, "coupons");
      onSnapshot(
        query(couponsCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const coupons = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PRODUCTACTIONS.SET_COUPONS,
            payload: coupons,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const getFeedbacks = async () => {
    try {
      const feedbacksCollection = collection(db, "feedbacks");
      onSnapshot(
        query(feedbacksCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const feedbacks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PRODUCTACTIONS.SET_FEEDBACKS,
            payload: feedbacks,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const getOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");
      onSnapshot(
        query(ordersCollection, orderBy("orderedAt", "desc")),
        (snapshot) => {
          const orders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PRODUCTACTIONS.SET_ORDERS,
            payload: orders,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const getBalanceOrders = async () => {
    try {
      const orderBalancesCollection = collection(db, "orderBalances");
      onSnapshot(
        query(orderBalancesCollection, orderBy("orderedAt", "desc")),
        (snapshot) => {
          const orderBalances = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PRODUCTACTIONS.SET_ORDER_BALANCE,
            payload: orderBalances,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUC();
    getAccounts();
    getCoupons();
    getFeedbacks();
    getOrders();
    getBalanceOrders();
  }, []);

  const addUC = async (ucData) => {
    // console.log("ADD UC BUTTON CLICKED");

    try {
      const ucCollection = collection(db, "uc");
      await addDoc(ucCollection, ucData);
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const deleteUC = async (uc) => {
    try {
      const ucDoc = doc(db, "uc", uc.id);
      await deleteDoc(ucDoc, uc);
      alert(`${uc.ucNumber} یوسی سڕایەوە`);
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const editUC = async (ucData, selectedUC) => {
    try {
      const ucDoc = doc(db, "uc", selectedUC.id);
      await updateDoc(ucDoc, ucData);
      alert(`${selectedUC.id} یوسی نوێکرایەوە`);
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const addAccount = async (accountData) => {
    try {
      const accountsCollection = collection(db, "accounts");
      await addDoc(accountsCollection, accountData);
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const deleteAccount = async (accountDetails) => {
    try {
      const accountsDoc = doc(db, "accounts", accountDetails.id);
      await deleteDoc(accountsDoc, accountDetails);
      alert(`بەسەرکەوتووی ${accountDetails.accountId} سڕایەوە`);
      window.location.href = "/admin/accounts";
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const editAccount = async (id, accountData) => {
    try {
      const accountsDoc = doc(db, "accounts", id);
      await updateDoc(accountsDoc, accountData);
      alert("نوێکرایەوە");
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const addCoupon = async (couponData) => {
    // console.log("ADD COUPON BUTTON CLICKED");

    try {
      const couponsCollection = collection(db, "coupons");
      await addDoc(couponsCollection, couponData);
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const deleteCoupon = async (couponId) => {
    try {
      const couponDoc = doc(db, "coupons", couponId);
      await deleteDoc(couponDoc, couponId);
      alert("کۆپۆن سڕایەوە");
      window.location.href = "/admin/coupons";
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const addFeedback = async (feedbackData) => {
    try {
      const feedbacksCollection = collection(db, "feedbacks");
      await addDoc(feedbacksCollection, feedbackData);
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const orderProduct = async (productData, user) => {
    try {
      const ordersCollection = collection(db, "orders");
      const userDoc = doc(db, "users", productData.userEmail);
      await addDoc(ordersCollection, productData);

      await updateDoc(userDoc, {
        userMoney:
          parseInt(user.userMoney) - productData.selectedProduct.ucPrice,
        userMoneySpent:
          productData.selectedProduct.ucPrice + user.userMoneySpent,
      });
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const orderAddBalance = async (balanceData) => {
    try {
      const orderBalancesCollection = collection(db, "orderBalances");
      await addDoc(orderBalancesCollection, balanceData);
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const toggleWishList = async (product, user) => {
    try {
      const userCollection = collection(db, `users/${user.email}/wishlists`);

      const wishListSnapshot = await getDocs(userCollection);
      const existingWishList = wishListSnapshot.docs.find(
        (doc) => doc.data().productId == product.id
      );

      if (existingWishList) {
        await deleteDoc(doc(userCollection, existingWishList.id));
      } else {
        await addDoc(userCollection, {
          productId: product.id,
          product,
          addedAt: new Date(),
        });
      }
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const getUserWithLists = async (user) => {
    try {
      const userCollection = collection(db, `users/${user.email}/wishlists`);
      onSnapshot(
        query(userCollection, orderBy("addedAt", "desc")),
        (snapshot) => {
          const wishListItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PRODUCTACTIONS.SET_WISH_LIST,
            payload: wishListItems,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const buyAccount = async (accountData, user) => {
    try {
      const accountDoc = doc(db, "accounts", accountData.accountDetails.id);
      await updateDoc(accountDoc, {
        isSold: !accountData.accountDetails.isSold,
      });

      // Add account to user who bought
      const userAccountsCollection = collection(
        db,
        `users/${user.email}/accounts`
      );
      await addDoc(userAccountsCollection, accountData);

      // Update user money
      const userDoc = doc(db, "users", accountData.userEmail);
      await updateDoc(userDoc, {
        userMoney:
          parseInt(user.userMoney) - accountData.accountDetails.accountPrice,
        userMoneySpent:
          accountData.accountDetails.accountPrice + user.userMoneySpent,
      });
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.log(error.message);
    }
  };

  const getUserBoughtAccounts = async (user) => {
    try {
      const userAccountsCollection = collection(
        db,
        `users/${user.email}/accounts`
      );
      onSnapshot(
        query(userAccountsCollection, orderBy("boughtAt", "desc")),
        (snapshot) => {
          const accountsBought = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PRODUCTACTIONS.SET_USER_ACCOUNTS,
            payload: accountsBought,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const addMoneyToUser = async (userData) => {
    try {
      const userDoc = doc(db, "users", userData.userInfo.id);

      await updateDoc(userDoc, {
        userMoney: userData.userMoney + userData.userInfo?.userMoney,
      });
    } catch (error) {
      dispatch({ type: PRODUCTACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const contextData = {
    loading: state.loading,
    error: state.error,
    uc: state.uc,
    accounts: state.accounts,
    coupons: state.coupons,
    feedbacks: state.feedbacks,
    orders: state.orders,
    balanceOrders: state.balanceOrders,
    addUC,
    deleteUC,
    editUC,
    addAccount,
    deleteAccount,
    editAccount,
    addCoupon,
    deleteCoupon,
    addFeedback,
    orderProduct,
    orderAddBalance,
    toggleWishList,
    getUserWithLists,
    wishList: state.wishList,
    getUserBoughtAccounts,
    accountsBought: state.accountsBought,
    buyAccount,
    addMoneyToUser,
    state,
    dispatch,
  };
  return (
    <ProductsContext.Provider value={contextData}>
      {children}
    </ProductsContext.Provider>
  );
}
