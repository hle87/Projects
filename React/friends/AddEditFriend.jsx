import React, { useState, useEffect } from "react";
import * as friendsService from "../../services/friendsService";
import { useLocation } from "react-router-dom";
import toastr from "toastr";
//import { useNavigate } from "react-router-dom";

function AddEditFriends() {
  //SETTING UP STATE VIA USESTATE HOOK
  const [friendData, setFriendData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: 1,
    imageTypeId: 1,
    imageUrl: "",
    skills: "",
    id: 0,
  });

  //const navigate = useNavigate();

  const { state } = useLocation(); //DECLARING {STATE} TO RETURN THE CURRENT LOCATION OBJECT WHICH IS PASSED FROM FRIENDS COMPONENT
  console.log("this is for STATE", state);

  //USEEFFECT POPULATES FORM WITH DATA THAT IS BEING EDITED IF STATE EXISTS; FUNCTION THAT RUNS EVERY TIME THERE IS A RE-RENDER
  // (IF STATE EXISTS, IT MEANS THAT THE USER IS EDITING A FRIEND) OTHERWISE, IT WILL POPULATE THE FORM WITH EMPTY VALUES
  useEffect(() => {
    console.log("useEffect fires", state);
    //IF STATE EXISTS AND HAS TYPE PROPETY WHERE IT MUST EQUAL "PERSON_VIEW" AND PAYLOAD PROPERTY...
    if (state?.type === "PERSON_VIEW" && state.payload) {
      console.log("Person change firing", state.payload);
      //THEN SET FRIEND DATA TO STATE PAYLOAD TARGETING PRIMARY IMAGE TO IMAGE URL
      setFriendData((prevState) => {
        let stateOfFriends = { ...prevState, ...state.payload };
        stateOfFriends.primaryImage = stateOfFriends.primaryImage.url;
        // stateOfFriends.skills = stateOfFriends.skills.

        console.log("setState:setFriendData", stateOfFriends);
        //RETURNS STATE OF FRIENDS WHICH CONTAINS THE NEWLY DECLARED PAYLOAD PROPERTIES: (stateOfFriends.primaryImage.imageUrl)
        return stateOfFriends;
      });
    }
  }, [state]);

  //#region NOtes from Video
  // const navigateToProdPage = ()=> {
  //     const stateForTransports = {type:"PRODUCT_VIEW", payload: product}
  //   navigate (`/products/${product.id}`, {state: stateForTransports})
  // };

  // const navigateNoProd = ()=> {

  //     navigate (`/products/2555}`);
  // };
  //#endregion

  //ENABLES INPUTS TO BE CHANGED ON FORM FIELDS
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFriendData((prevState) => {
      console.log("updater onChange", value);
      const newObjFr = { ...prevState };
      newObjFr[name] = value;

      if (name === "skills") {
        newObjFr[name] = value.split(",");
      }

      return newObjFr;
    });
  };

  //CLICK FINISH BUTTON TO EITHER ADD OR UPDATE FRIEND DEPENDING ON CONDITION
  const onFinishButtonClicked = (e) => {
    e.preventDefault();
    //IF STATE HAS PAYLOAD.ID PROPERTY, THEN UPDATE/EDIT FRIEND BY TARGETING ID AND UPDATING STATE WTIHIN friendData OBJECT
    if (state?.payload.id > 0) {
      // state.payload.skills = state.payload.skills
      //   .split(",")
      //   .map((skill) => skill.trim());
      friendsService
        .editFriendById(state.payload.id, friendData)
        .then(onEditSuccess)
        .catch(onEditError);
      //IF STATE DOES NOT HAVE PAYLOAD.ID PROPERTY, THEN ADD NEW FRIEND BY CREATING NEW FRIEND WITH friendData OBJECT
    } else {
      // state.payload.skills = state.payload.skills
      //   .split(",")
      //   .map((skill) => skill.trim());
      friendsService
        .addFriend(friendData)
        .then(onAddFrSuccess)
        .catch(onAddFrErr);
    }
  };

  //SUCCESS HANDLER FOR UPDATE/EDIT
  const onEditSuccess = (payload) => {
    console.log("edit success", payload); //
    toastr.success("Friend Edited Successfully");
  };
  //ERROR HANDLER FOR UPDATE/EDIT
  const onEditError = (err) => {
    console.log("error editing", err);
    toastr.error("Failed to Edit");
  };

  //SUCCESS HANDLER FOR ADDFRIEND
  const onAddFrSuccess = (payload) => {
    console.log("add success", payload);
    toastr.success("Friend Added Successfully");
  };

  //ERROR HANDLER FOR ADDFRIEND
  const onAddFrErr = (err) => {
    console.log("error adding", err);
    toastr.error("Failed to Add");
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>
          {state?.type === "PERSON_VIEW" && state.payload
            ? "Edit Friend"
            : "(+) Friend"}
        </h1>
        <div className="card col-sm-6">
          <div className="card-body md-6">
            <form>
              <div className="form-outline col-md-6">
                <label htmlFor="titleInput" className="col-3 col-form-label">
                  Title :
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Name"
                  value={friendData.title}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="headlineInput" className="col-3 col-form-label">
                  Headline :
                </label>
                <input
                  type="text"
                  id="headline"
                  name="headline"
                  placeholder="Header"
                  value={friendData.headline}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="bioInput" className="col-3 col-form-label">
                  Bio :
                </label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  placeholder="Write a brief bio"
                  value={friendData.bio}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="summaryInput" className="col-3 col-form-label">
                  Summary :
                </label>
                <input
                  type="text"
                  id="summary"
                  name="summary"
                  placeholder="Summary"
                  value={friendData.summary}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="statusIdInput" className="col-3 col-form-label">
                  Status :
                </label>
                <input
                  type="text"
                  id="statusId"
                  name="statusId"
                  placeholder="What's the status?"
                  value={friendData.statusId}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label
                  htmlFor="primaryImageInput"
                  className="col-3 col-form-label"
                >
                  Image Url :
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Place Primary Image URL"
                  value={friendData.imageUrl}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label
                  htmlFor="primaryImageInput"
                  className="col-3 col-form-label"
                >
                  Skills :
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="What skills do you have?"
                  value={friendData.skills}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="slugInput" className="col-3 col-form-label">
                  slug :
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  placeholder="unique identifier"
                  value={friendData.slug}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="d-flex pt-3 justify-content-center">
                <button
                  type="submit"
                  className="p-2 btn btn-outline-success  btn-block"
                  onClick={onFinishButtonClicked}
                >
                  Finish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddEditFriends;
