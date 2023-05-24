import React from "react";
//import * as friendsService from "../../services/friendsService";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import PropTypes from "prop-types";

const _logger = debug.extend("FriendCard");
const _loggerFCard = debug.extend("FriendCard");

//SETTING UP FRIENDSCARD COMPONENT
//PROPS PASSED FROM FRIENDS COMPONENT (OBJECT PROPERTYS = friend & onPersonClicked; SEE CONSOLE.LOG)
// Path: src\components\friends\FriendCards.jsx
function FriendCard(props) {
  // console.log("PROPS FR & ONPERCLICKED", props);
  const navigate = useNavigate();
  const aFriend = props.friend;

  _logger("Checking FriendCard props", props);
  _loggerFCard("Checking new variable definition", aFriend);

  //FUNCTION TO HANDLE CLICK EVENT FOR DELETE BUTTON
  //props.onPersonClicked IS PASSED FROM FRIENDS COMPONENT --> 'onPersonClicked={onDeleteRequested}'
  const onLocalPersonClicked = (e) => {
    e.preventDefault();
    props.onPersonClicked(aFriend, e);
    //console.log(aFriend);
  };

  //FUNCTION TO HANDLE CLICK EVENT FOR EDIT BUTTON
  const onUpdateBtnClicked = (e) => {
    console.log("update button has been clicked");

    //NAVIGATE TO EDIT FRIEND PAGE
    navigate(e.currentTarget.dataset.page, {
      state: { type: "PERSON_VIEW", payload: aFriend }, //PASSING STATE TO EDIT FRIEND PAGE TO INCLUDE TYPE AND PAYLOAD PROPERTIES
    });
    console.log("Nav to edit", e);
  };

  //TAKES PROPS FROM FRIEND COMPONENT AND APPLIES THEM TO FRIENDS CARDS PER ASSOCIATED FRIEND OBJECT'S ID AND PROPERTIES
  //HTML CARD TO BE RENDERED ON PAGE 0 - 10 FRIENDS PER PAGE
  return (
    <React.Fragment>
      <div className="col-md-3 p-4" key={aFriend.id}>
        <div className="row">
          <div className="card" width="100px">
            <img src={aFriend.primaryImage.url} alt="currentFriend" />
            <div className="card-body">
              <h5 className="card-title">{aFriend.title}</h5>

              <p className="card-text">{aFriend.summary}</p>

              {/* <p className="card-text">
                {aFriend.skills.map((skill) => skill.name)}
              </p> */}

              <button
                className="btn btn-outline-dark btn-sm"
                id="editId"
                data-page={aFriend.id}
                onClick={onUpdateBtnClicked}
              >
                UPDATE
              </button>
              <a
                href="#button"
                className="btn btn-outline-danger btn-sm"
                id="deleteBtn"
                onClick={onLocalPersonClicked}
              >
                DELETE
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

FriendCard.propTypes = {
  friend: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    primaryImage: PropTypes.string.isRequired, // error because it's an object
    // primaryImage: PropTypes.shape({
    //   url: PropTypes.string.isRequired,
    // }), //end primaryImage
    id: PropTypes.number,
  }),
};

export default FriendCard;
