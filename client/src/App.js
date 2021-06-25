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
        <>
          <Header user={user} signOutUser={signOutUser} />
          <MainLayout>
            <Switch>
              <Route
                path="/dashboard/user/user_info"
                component={authGuard(UserInfo)}
              />
              <Route path="/dashboard" component={authGuard(UserDashboard)} />

              <Route path="/sign_in" component={RegisterLogin} />
              <Route path="/" component={Home} />
            </Switch>
          </MainLayout>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
