import React from "react";
import { useSelector } from "react-redux";

//This's Component
import { Redirect } from "react-router-dom";

const PreventSignInRoute = (props) => {
  const user = useSelector((state) => state.entities.user);

  return <>{user.auth ? <Redirect to="/dashboard" /> : props.children}</>;
};

export default PreventSignInRoute;
