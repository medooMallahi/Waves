import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../utils/loader";
import { errorHelper } from "../../utils/tools";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { loginUser, registerUser } from "../../store/user";

const AuthForm = (props) => {
  const notifications = useSelector((state) => state.entities.notifications);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "xxss@gmail.com", password: "0592413118" },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry the email is required")
        .email("This is an invalid email"),

      password: Yup.string().required("Sorry the password is required"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    if (props.formType) {
      dispatch(registerUser(values));
    } else {
      dispatch(loginUser(values));
    }
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [notifications, props.history]);

  return (
    <>
      <div className="auth_container">
        {loading ? (
          <Loader />
        ) : (
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Enter your email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                {...errorHelper(formik, "email")}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "100%", marginTop: "7px" }}
                name="password"
                label="Enter your password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("password")}
                {...errorHelper(formik, "password")}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="small"
            >
              {props.formType ? "Register" : "Login"}
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default AuthForm;
