import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../utils/loader";

export default function authGuard(ComposedComponent) {
  const AuthenticationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const user = useSelector((state) => state.entities.user);

    useEffect(() => {
      if (!user.auth) {
        props.history.push("/");
      } else {
        setIsAuth(true);
      }
    }, [props, user]);

    if (!isAuth) {
      return <Loader full={true} />;
    } else {
      return <ComposedComponent user={user} {...props} />;
    }
  };
  return AuthenticationCheck;
}
