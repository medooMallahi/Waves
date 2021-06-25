import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { showToast } from "../utils/tools";
import { clearNotification } from "../store/notifications";

const MainLayout = (props) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.entities.notifications);

  useEffect(() => {
    if (notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : "Error";
      showToast("ERROR", msg);
      dispatch(clearNotification());
    }

    if (notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : "Done!";
      showToast("SUCCESS", msg);
      dispatch(clearNotification());
    }
  }, [notifications, dispatch]);

  return (
    <React.Fragment>
      {props.children}
      <ToastContainer />
    </React.Fragment>
  );
};

export default MainLayout;
