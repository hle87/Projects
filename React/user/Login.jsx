import React, { useState, useEffect } from "react";
import * as usersService from "../../services/usersService";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const logInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email provided").required("Required"),
  password: Yup.string().required("Required"),
});

function Login(props) {
  console.log("login props", props);
  const [userFormDataLog] = useState({
    email: "",
    password: "",
    tenantId: "U0442SJ2SF6",
  });

  const navigate = useNavigate();

  // const onLogChange = (e) => {
  //   console.log(e.target.name, e.target.value);
  //   console.log("onChange", { syntheticEvent: e });

  //   const { name, value } = e.target;

  //   setUserFormDataLog((prevState) => {
  //     console.log("updater onChange");

  //     const logData = { ...prevState };
  //     logData[name] = value;

  //     return logData;
  //   });
  // };

  //ONCLICK FUNCTION FOR LOGIN BUTTON - CALLS FROM USERSERVICE AND PASSES IN THE userFormDataLog STATE AND SETS THE CURRENT USER GIVEN THE RESPONSE DATA
  const logInUser = (values) => {
    console.log(usersService);
    usersService.logIn(values).then(onLogSuccess).catch(onLogErr);
  };
  //SUCCESS HANDLER FOR LOGIN - DISPLAYS TOAST SUCCESS MESSAGE
  const onLogSuccess = (response) => {
    console.log("RESPONSE.DATA", response.data);
    toastr.success("Login Successful");
    navigate("/"); //navigate to the HOME Page after SUCCESSFUL LOGIN;
    usersService
      .getCurrentUser()
      .then(currentUserSuccess)
      .catch(currentUserErr);
  };
  //ERROR HANDLER FOR LOGIN - DISPLAYS ERROR MESSAGE
  const onLogErr = (err) => {
    console.log(err);
    toastr.error("Something went wrong.", "Error!");
  };
  //UPON SUCCESSFUL LOGIN, SETS THE CURRENT USER VIA THE RESPONSE DATA AND UPDATES THE APP STATE WITH THE CURRENT USER
  //TARGET ID PROPERTY OF CURRENT USER
  const currentUserSuccess = (response) => {
    console.log("Current logged in", response);
    usersService
      .getUserById(response.data.item.id)
      .then(onSuccessGetById)
      .catch(onErrorGetById);
  };

  //SUCCESS HANDLER getUserById - ON SUCCESS, RENDERS USER FN AND LN TO THE HOME PAGE
  const onSuccessGetById = (response) => {
    let loggedUser = { ...props.user }; //SPREAD OPERATOR TO COPY THE PROPS.USER STATE - (avatarUrl, email, firstName, isLoggedIn, lastName)
    let userData = response.data.item; //TARGET ITEM PROPERTY OF CURRENT USER ID FROM RESPONSE DATA
    console.log("ON SUCCESS GET BY ID", loggedUser, "USER DATA", userData);

    loggedUser.firstName = userData.firstName; // SET FIRST NAME OF CURRENT USER TO THE FIRST NAME OF THE USER STATE
    loggedUser.lastName = userData.lastName; // SET LAST NAME OF CURRENT USER TO THE LAST NAME OF THE USER STATE
    loggedUser.isLoggedIn = true;

    // PROPS.SETCURRENTUSER IS THE SETSTATE FUNCTION FOR THE USER STATE
    props.setCurrentUser(() => {
      //RETURN THE UPDATED USER STATE - USER THAT IS LOGGED IN
      return loggedUser;
    });
    navigate("/"); //NAVIGATES THE FN AND LN TO THE HOME PAGE
  };

  //ERROR HANDLER FOR getUserById
  const onErrorGetById = (err) => {
    console.log(err);
  };
  //ERROR HANDLER FOR getCurrentUser
  const currentUserErr = (err) => {
    console.log(err, "Current error not logged in");
  };

  useEffect(() => {
    console.log("User Name Shows");
  });

  //logout function  to set the user state to null and navigate to the home page
  // const logout = (e) => {

  //   e.preventDefault();
  //   props.setCurrentUser(null);
  //   navigate("/");
  // };

  return (
    <React.Fragment>
      {/* <h1>Login</h1> */}
      <Formik
        enableReinitialize={true}
        initialValues={userFormDataLog}
        onSubmit={logInUser}
        validationSchema={logInSchema}
      >
        <Form>
          <div className="d-flex pt-3 justify-content-center">
            <div className="col-3">
              <p className="text-center">Please Log In</p>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" className="form-control" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="has-error"
                />
                {/* value={userFormDataLog.email}
                onChange={onLogChange} */}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  className="form-control"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="has-error"
                />
              </div>
              <button type="submit" className="btn btn-dark btn-lg ">
                Login
              </button>

              {/* <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={userFormDataLog.password}
                onChange={onLogChange}
              /> */}
              {/* <button
                onClick={logInUser}
                type="submit"
                className="btn btn-dark btn-lg "
              >
                Login
              </button> */}
            </div>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default Login;
