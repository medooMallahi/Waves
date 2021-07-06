import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/home/index";
import Header from "./components/navigation/header";
import Footer from "./components/navigation/footer";
import MainLayout from "./hoc/ mainLayout";
import RegisterLogin from "./components/auth/index";
import { userIsAuth, userSignOut } from "./store/user";
import Loader from "./utils/loader";
import UserDashboard from "./components/dashboard/index";
import authGuard from "./hoc/authGuard";
import UserInfo from "./components/dashboard/user/ info";
import AdminProducts from "./components/dashboard/admin/ products/ index";
import AddProduct from "./components/dashboard/admin/ products/ addedit/ add";
import Shop from "./components/shop/ index";
import ProductDetail from "./components/product/ index";
import UserCart from "./components/dashboard/user/cart";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.entities.user);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut());
  };

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user.auth !== null) {
      setLoading(false);
    }
  }, [user]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader full={true} />
      ) : (
        <React.Fragment>
          <Header user={user} signOutUser={signOutUser} />
          <MainLayout>
            <Switch>
              <Route
                path="/dashboard/admin/add_products"
                component={authGuard(AddProduct)}
              />
              <Route
                path="/dashboard/admin/admin_products"
                component={authGuard(AdminProducts)}
              />
              <Route
                path="/dashboard/user/user_cart"
                component={authGuard(UserCart)}
              />
              <Route
                path="/dashboard/user/user_info"
                component={authGuard(UserInfo)}
              />
              <Route path="/dashboard" component={authGuard(UserDashboard)} />

              <Route path="/product_detail/:id" component={ProductDetail} />
              <Route path="/shop" component={Shop} />
              <Route path="/sign_in" component={RegisterLogin} />
              <Route path="/" component={Home} />
            </Switch>
          </MainLayout>
          <Footer />
        </React.Fragment>
      )}
    </BrowserRouter>
  );
}

export default App;
