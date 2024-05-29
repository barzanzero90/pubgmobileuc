import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { ProductsContextProvider } from "./context/ProductsContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SideBar from "./components/SideBar";
import AccountsPage from "./pages/AccountsPage";
import AccountPage from "./pages/AccountPage";
import AddBalancePage from "./pages/AddBalancePage";
import TutorialPage from "./pages/TutorialPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import WishListsPage from "./pages/WishListsPage";
import AdminPage from "./pages/admin/AdminPage";
import UsersPage from "./pages/admin/UsersPage";
import OrdersPage from "./pages/admin/OrdersPage";
import UCPage from "./pages/admin/UCPage";
import AdminAccountsPage from "./pages/admin/AdminAccountsPage";
import AddAccountPage from "./pages/admin/AddAccountPage";
import AdminAccountPage from "./pages/admin/AdminAccountPage";
import CouponsPage from "./pages/admin/CouponsPage";
import CouponPage from "./pages/admin/CouponPage";
import FeedbacksPage from "./pages/admin/FeedbacksPage";
import UCOrderPage from "./pages/admin/UCOrderPage";
import PaymentOrderPage from "./pages/admin/PaymentOrderPage";
import AdminUserPage from "./pages/admin/AdminUserPage";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ThemeContextProvider>
          <ProductsContextProvider>
            <Header />
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/account/:id" element={<AccountPage />} /> */}
                <Route path="/add-balance" element={<AddBalancePage />} />
                <Route path="/tutorial" element={<TutorialPage />} />
                <Route path="/orders" element={<MyOrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                {/* <Route path="/wishlists" element={<WishListsPage />} /> */}

                {/* Admin Panel */}
                <Route path="/admin/home" element={<AdminPage />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/user/:userFullName" element={<AdminUserPage />} />
                <Route path="/admin/orders" element={<OrdersPage />} />
                <Route path="/admin/uc-order/:id" element={<UCOrderPage />} />
                <Route path="/admin/payment-order/:id" element={<PaymentOrderPage />} />
                <Route path="/admin/uc" element={<UCPage />} />
                <Route path="/admin/accounts" element={<AdminAccountsPage />} />
                <Route path="/admin/add-account" element={<AddAccountPage />} />
                <Route
                  path="/admin/account/:id"
                  element={<AdminAccountPage />}
                />
                <Route path="/admin/coupons" element={<CouponsPage />} />
                <Route path="/admin/coupon/:id" element={<CouponPage />} />
                <Route path="/admin/feedbacks" element={<FeedbacksPage />} />
              </Route>
            </Routes>
          </ProductsContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
