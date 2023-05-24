import React, { useState } from "react";
import * as usersService from "../../services/usersService";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

// SETS UP INITIAL STATE FOR FORM DATA(REGISTER COMPONENT) - USER INPUT DATA MAKES AN AJAX CALL TO POST REGISTERED DATA
// Path: src\components\user\Register.jsx

function Register() {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U0442SJ2SF6",
  });
  console.log("REGISTER", userFormData);

  //SET UP NAVIGATION CONSTANT (purpose is to navigate to login page after successful registration)
  const navigate = useNavigate();

  //ALLOWS USER TO INPUT DATA INTO FORM FIELDS AND SETS STATE FOR FORM DATA (userFormData)
  // THIS IS CONSIDERED A SYNTHETIC EVENT
  const onFormChange = (e) => {
    console.log(e.target.name, e.target.value);
    console.log("onChange", { syntheticEvent: e });

    //this is the value of the input, the value in the text box the user types into
    //this is the name (so be sure to give your form fields a name attribute)
    const { name, value } = e.target;

    //updater function - this is the function that will be called to update the state
    setUserFormData((prevState) => {
      console.log("updater onChange", prevState);

      //spread operator - this is the object that will be updated
      const formData = { ...prevState };

      //change the value of the copied object using the name and using bracket notation
      formData[name] = value;

      return formData;
    });
  };

  //ONCLICK OF REGISTER BUTTON WILL SUBMIT FORM DATA TO POST (ajax call) REGISTERED USER
  const submitRegis = () => {
    console.log("submitRegis", userFormData);
    usersService.register(userFormData).then(onRegSuccess).catch(onRegErr);
  };
  //ON SUCCESSFUL REGISTRATION, NAVIGATE TO LOGIN PAGE
  const onRegSuccess = (response) => {
    console.log(response);
    navigate("/loginPage"); // Navigate to the Login Page with user input
    toastr.success("WELCOME!", "Registration recieved.");
  };
  //ON ERROR, DISPLAY ERROR MESSAGE
  const onRegErr = (err) => {
    console.log(err);
    toastr.error("Error!", "Something went wrong.");
  };

  //REGISTER FORM WITH INPUT FIELDS AND BUTTON TO SUBMIT FORM DATA
  // VALUE BINDS THE STATE TO THE INPUT FIELDS SO THAT THE USER CAN INPUT DATA
  // Even when the value is commented out, the form still works because the state is being updated via onFormChange's synthetic event
  // ONCHANGE TAKES THE FUNCTION ONFORMCHANGE TO SET STATE OF FORM DATA TO USER INPUT DATA (WHEN USER TYPES INTO INPUT FIELDS)
  return (
    <React.Fragment>
      <h1>Register</h1>
      <form>
        <div className="form-outline col-md-4">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control form-control"
            placeholder="example@sabio.la"
            value={userFormData.email}
            onChange={onFormChange}
          />
          <label className="form-label" htmlFor="formRegisterEmail"></label>
        </div>
        <div className="form-outline col-md-4">
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control form-control"
            placeholder="Enter First Name"
            value={userFormData.firstName}
            onChange={onFormChange}
          />
          <label className="form-label" htmlFor="formRegisterFirstName"></label>
        </div>
        <div className="form-outline col-md-4">
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control form-control"
            placeholder="Enter Last Name"
            value={userFormData.lastName}
            onChange={onFormChange}
          />
          <label className="form-label" htmlFor="formRegisterLastName"></label>
        </div>
        <div className="form-outline col-md-4">
          <input
            type="password"
            id="password"
            name="password"
            className="form-control form-control"
            placeholder="Enter Password"
            value={userFormData.password}
            onChange={onFormChange}
          />
          <label className="form-label" htmlFor="formRegisterPW"></label>
        </div>

        <div className="form-outline col-md-4">
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            className="form-control form-control"
            placeholder="Repeat Your Password"
            value={userFormData.passwordConfirm}
            onChange={onFormChange}
          />
          <label className="form-label" htmlFor="formRegisterConfPW"></label>
        </div>
        <div className="form-outline col-md-4">
          <input
            type="url"
            id="profileUrl"
            name="avatarUrl"
            className="form-control form-control"
            placeholder="Profile URL"
            value={userFormData.avatarUrl}
            onChange={onFormChange}
          />
          <label className="form-label" htmlFor="formRegisterURL"></label>
        </div>

        <div className="form-outline col-md-4">
          <button
            onClick={submitRegis}
            type="button"
            className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
          >
            Register
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Register;
