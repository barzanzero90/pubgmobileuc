import {
  createContext,
  useContext,
  useDebugValue,
  useEffect,
  useReducer,
} from "react";
import { USERACTIONS } from "../actions/userActions";
import { auth, db } from "../firebase/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const authInitialState = {
  loading: true,
  user: null,
  error: null,
  users: [],
};

function authReducer(state, action) {
  switch (action.type) {
    case USERACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case USERACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case USERACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USERACTIONS.SIGN_UP_USER:
    case USERACTIONS.LOGIN_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USERACTIONS.LOGOUT_USER:
      return {
        // ...state,
        loading: false,
        user: action.payload,
      };

    case USERACTIONS.SET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    default:
      return state;
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const navigate = useNavigate();

  const getUserOnLoad = () => {
    try {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const userDoc = doc(db, "users", currentUser.email);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            currentUser = userSnapshot.data();
            dispatch({ type: USERACTIONS.SET_USER, payload: currentUser });
            // console.log(currentUser.email);
          } else {
            dispatch({ type: USERACTIONS.SET_USER, payload: null });
          }
        }
      });
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      onSnapshot(
        query(usersCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: USERACTIONS.SET_USERS, payload: users });
        }
      );
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserOnLoad();
    getUsers();
  }, []);

  // useDebugValue(state.user);

  const signUpUser = async (userData) => {
    try {
      const userDoc = doc(db, "users", userData.email);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        await setDoc(userDoc, userData);
        dispatch({ type: USERACTIONS.SIGN_UP_USER, payload: userData });
        navigate("/");
      } else {
        alert("ئەم ئیمەیڵە پێشتر بەکارهاتووە");
      }
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const loginUser = async (userData) => {
    try {
      const userDoc = doc(db, "users", userData.email);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        await updateDoc(userDoc, {
          lastLogin: new Date(),
        });
        dispatch({ type: USERACTIONS.LOGIN_USER, payload: userData });
        navigate("/");
      } else {
        alert("ئەم بەکارهێنەرە بوونی نییە");
      }
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const userDoc = doc(db, "users", email);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        await sendPasswordResetEmail(auth, email);
        alert("بەستەری ڕێستکردنەوەی وشەی نهێنی بۆ ئیمەیڵەکەت نێردرا");
      } else {
        alert("ئەم بەکارهێنەرە بوونی نییە");
      }
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const editProfile = async (user) => {
    try {
      const userDoc = doc(db, "users", user.id);
      await updateDoc(userDoc, user);
    } catch(error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  }

  const logOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({
        type: USERACTIONS.LOGOUT_USER,
        payload: null,
      });
    } catch (error) {
      dispatch({ type: USERACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const contextData = {
    loading: state.loading,
    user: state.user,
    error: state.error,
    users: state.users,
    signUpUser,
    loginUser,
    forgotPassword,
    editProfile,
    logOutUser,
    dispatch,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {state.loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}
