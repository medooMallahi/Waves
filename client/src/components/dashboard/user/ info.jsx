import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DashboardLayout from "../../../hoc/ dashboardLayout";

import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { updateUserProofile } from "../../../store/user";
import EmailStepper from "./ stepper";

const UserInfo = ({ user }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user.data.firstname,
      lastname: user.data.lastname,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(3, "3 char min")
        .max(30, "30 char max")
        .required("Sorry, you need the firstname"),
      lastname: Yup.string()
        .min(3, "3 char min")
        .max(30, "30 char max")
        .required("Sorry, you need the lastname"),
    }),
    onSubmit: (values) => {
      let formValues = { data: values };
      dispatch(updateUserProofile(formValues));
    },
  });

  return (
    <DashboardLayout title="User information">
      <form
        className="mt-3 article_form"
        style={{ maxWidth: "250px" }}
        onSubmit={formik.handleSubmit}
      >
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="firstname"
            label="Enter your firstname"
            variant="outlined"
            {...formik.getFieldProps("firstname")}
          />
          <div className="form-group">
            <TextField
              style={{ width: "100%", marginTop: "8px" }}
              name="lastname"
              label="Enter your lastname"
              variant="outlined"
              {...formik.getFieldProps("lastname")}
            />
          </div>
          <Button
            className="mb-3"
            variant="contained"
            color="primary"
            type="submit"
          >
            Edit profile
          </Button>
        </div>
      </form>
      <hr />
      <div>
        <EmailStepper user={user} />
      </div>
    </DashboardLayout>
  );
};
export default UserInfo;
