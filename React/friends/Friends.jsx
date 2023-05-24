import React, { useState, useEffect, useCallback } from "react";
import * as friendsService from "../../services/friendsService";
import FriendCards from "./FriendCards";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";

//SETTING UP FRIENDS PAGE
//SETTING UP USESTATE WITH EMPTY ARRAYS FOR PARAMETERS TO BE PASSED TO FRIENDSCARDS COMPONENT
// Path: src\components\friends\Friends.jsx
function Friends() {
  const [pageData, setPageData] = useState({
    arrayOfFriends: [],
    friendComponents: [],
  });
  console.log("PAGE DATA", pageData);

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 8,
    totalPages: 4,
    totalCount: 40,
  });
  console.log("pagination", pagination);

  //SETTING UP PAGINATION
  const onPageChange = (currentPage) => {
    setPagination((prevState) => {
      const newState = { ...prevState };

      newState.pageIndex = currentPage;
      return newState;
    });
    console.log("On Page Change");
    friendsService
      .getFriends(currentPage - 1, pagination.pageSize)
      .then(onGetFrSuccess)
      .catch(onGetFrError);
  };

  //SETTING UP USEEFFECT TO GET FRIENDS DATA FROM FRIENDSSERVICE
  //USEEFFECT WILL RUN ONCE WHEN COMPONENT IS DONE RENDERING
  useEffect(() => {
    console.log("useEffect");
    friendsService
      .getFriends(pagination.pageIndex - 1, pagination.pageSize)
      .then(onGetFrSuccess)
      .catch(onGetFrError);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  console.log("SEARCH TERM", searchTerm);

  //NAVIGATION VARIABLE TO USE useNavigate HOOK
  const navigate = useNavigate();

  const [toggleFriend, setToggleFriend] = useState({ toggle: false });
  false && console.log(pageData.arrayOfFriends);

  //SUCCESS HANDLER FOR GETFRIENDS
  //SET arrayOfPpl TO RESPONSE DATA, TARGETING PAGEDITEMS PROPERTY
  const onGetFrSuccess = (response) => {
    console.log("response from getting friends", response);
    let arrayOfPpl = response.data.item.pagedItems;
    // let totalPages = response.data.item.totalPages;
    // let totalCount = response.data.item.totalCount;
    console.log("array of ppl", arrayOfPpl);

    setPageData((prevState) => {
      const pData = { ...prevState };

      console.log("pData", pData);

      pData.arrayOfFriends = arrayOfPpl;
      pData.friendComponents = arrayOfPpl.map(mapFriend);
      return pData;
    });
  };

  //ERROR HANDLER FOR GETFRIENDS
  const onGetFrError = (err) => {
    console.log(err);
  };

  //useCallback HOOK TO PREVENT FROM RE-RENDERING (lets you cache a function between renders)
  //SETTING UP ONPERSONCLICKED TO DELETE FRIENDS BY GETTING A DELETE REQUEST FROM FRIENDSSERVICE
  const onDeleteRequested = useCallback((myFriend) => {
    console.log("looking for ID of friend", myFriend.id);

    //SETS HANDLER FOR SUCCESSFUL DELETE REQUEST TARGETING FRIEND ID AND SETTING UP VALUES TO BE CARRIED TO FUTURE
    const handler = getDeleteSuccessHandler(myFriend.id);

    //AJAX DELETE REQUEST TO FRIENDSSERVICE - deleteFriendById
    friendsService
      .deleteFriendById(myFriend.id)
      .then(handler)
      .catch(onDeleteFriendErr);
  }, []);

  //ACTUAL SUCCESS HANDLER FOR DELETE REQUEST
  const getDeleteSuccessHandler = (idToBeDeleted) => {
    console.log("getDeleteSuccessHandler", idToBeDeleted);

    return () => {
      console.log("onDeleteSuccess", idToBeDeleted);

      setPageData((prevState) => {
        const pData = { ...prevState };
        pData.arrayOfFriends = [...pData.arrayOfFriends]; //COPY THE ARRAY OF FRIENDS FROM PREVIOUS STATE INTO NEW STATE OBJECT / ...POINTS TO A NEW ARRAY    (P1)
        //console.log("pData.arrayOfFriends", pData.arrayOfFriends);

        //FILTER OUT THE FRIEND THAT WAS DELETED,
        const indexOf = pData.arrayOfFriends.findIndex((friend) => {
          //LOOPS OVER THE ARRAYOFFRIENDS AND STOPS AT THE FRIST INDEX FOUND TRUE PER CONDITION BELOW       (P2)
          console.log("friend upon delete", friend);
          let result = false;

          //CHECK IF FRIEND ID IS EQUAL TO ID TO BE DELETED - IF SO, SET RESULT TO TRUE AND FILTER OUT FRIEND PER CONDITION BELOW AND STATEMENT ABOVE       (P3)
          if (friend.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });

        //IF ID INDEX OF FRIEND >= 0, THEN SPLICE(CUT/REMOVE) OUT AN (1)ID GREATER THAN OR EQUAL TO 0    (P4)
        //SET PDATA.FRIENDCOMPONENTS TO PDATA.ARRAYOFFRIENDS.MAP(MAPFRIEND) -> THIS WILL RE-RENDER THE FRIENDS PAGE TO INCLUDE THE DETLETED FRIEND   (P4.5)
        if (indexOf >= 0) {
          pData.arrayOfFriends.splice(indexOf, 1);
          pData.friendComponents = pData.arrayOfFriends.map(mapFriend);
          //console.log("pData.friendComponents", pData.friendComponents);
        }
        return pData;
      });
    };
  };

  // ON THE ADD BUTTON CLICK, NAVIGATE TO THE ADD FRIEND FORM PAGE
  const onPlusClicked = (e) => {
    e.preventDefault();
    navigate(`/friendsPage/new`);
  };
  //ERROR HANDLER FOR DELETE REQUEST
  const onDeleteFriendErr = (err) => {
    console.log("DELETED", err);
  };

  //SETTING UP MAPFRIEND FUNCTION TO MAP THROUGH FRIENDS VIA aFriend PARAMETER AND RETURN FRIENDCARDS COMPONENT
  //ALLOWS FOR FRIENDS TO BE DISPLAYED ON FRIENDS PAGE AND DELETE BY ID VIA friend, key, onPersonClicked PROPS
  //THESE PROPERTIES WILL BE PASSED TO FRIENDCARDS COMPONENT AS 'PROPS'
  const mapFriend = (aFriend) => {
    console.log("A FRIEND", aFriend);
    return (
      <FriendCards
        friend={aFriend}
        key={"ListA-" + aFriend.id}
        onPersonClicked={onDeleteRequested}
      ></FriendCards>
    );
  };

  //SETTING UP TOGGLE FRIENDS FUNCTION TO SHOW/HIDE CARDS OF FRIENDS
  const onClickToggleContent = () => {
    setToggleFriend((prevState) => {
      //IF PREVIOUS STATE IS TRUE, SET TO FALSE ELSE SET TO TRUE - In other words, the DEFUALT PAGE SHOWS NO FRIENDS UNTIL THE TOGGLE BUTTON IS CLICKED
      if (prevState.toggle) {
        return { ...prevState, toggle: false };
      } else {
        return { ...prevState, toggle: true };
      }
    });
  };
  //#region - Search Attempt
  // onSearchfriend function
  // const onSearchFriend = (e) => {
  //   e.preventDefault();
  //   console.log("searching for friend");
  //   friendsService
  //     .searchFriend()
  //     .then(onSearchFriendSuccess)
  //     .catch(onSearchFriendErr);
  // };
  // const onSearchFriendSuccess = (response) => {
  //   console.log("response from getting friends", response);
  //   let arrayOfPpl = response.data.item.pagedItems;
  //   console.log("array of ppl", arrayOfPpl);
  //   //map setPagedata to render on search
  //   setPageData((prevState) => {
  //     const pData = { ...prevState };
  //     pData.arrayOfFriends = arrayOfPpl;
  //     pData.friendComponents = arrayOfPpl.map(mapFriend);
  //     return pData;
  //   });
  // };
  // const onSearchFriendErr = (err) => {
  //   console.log(err);
  // };
  //#endregion

  //SET UP onSearchFriend FUNCTION
  const onSearchFriend = (e) => {
    e.preventDefault();
    console.log("searching for friend");
    friendsService
      .searchFriend(pagination.pageIndex - 1, pagination.pageSize, searchTerm)
      .then(onSearchSuccess)
      .catch(onSearchErr);
  };
  //SUCCESS HANDLER FOR SEARCH REQUEST
  const onSearchSuccess = (response) => {
    console.log("response from getting friends", response);
    let arrayOfPpl = response.data.item.pagedItems;
    console.log("new search array", arrayOfPpl);

    setPageData((prevState) => {
      const pData = { ...prevState };
      pData.arrayOfFriends = arrayOfPpl;
      pData.friendComponents = arrayOfPpl.map(mapFriend);
      return pData;
    });
  };

  //ERROR HANDLER FOR SEARCH REQUEST
  const onSearchErr = (err) => {
    console.log("search fail", err);
  };

  const onInputChangeForSearch = (e) => {
    e.preventDefault();
    console.log("onInputChangeForSearch", e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <h1>Friends</h1>
      <div className="container">
        <form>
          <div className="form-outline col-md-3 p-2">
            <div className="input-group">
              <input
                type="search"
                className="SearchInputs"
                placeholder=" find friend"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchTerm}
                onChange={onInputChangeForSearch}
              />
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={onSearchFriend}
              >
                <strong>search</strong>
              </button>
            </div>
          </div>
        </form>
        <div className="d-grid gap-3 p-2">
          <div className="RenderButton">
            <button
              type="submit"
              className="p-2 btn btn-dark btn-lg text-warning"
              onClick={onClickToggleContent}
            >
              <strong>Show Friends</strong>
            </button>
            <Link to="/friendsPage/new">
              <button
                type="button"
                className="p-2 btn btn-warning btn-lg btn-block"
                onClick={onPlusClicked}
              >
                <strong>+</strong> Friend
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          {toggleFriend.toggle && pageData.friendComponents}{" "}
          {/*IF TOGGLE IS TRUE (which is set to false) AND PAGE DATA HAS FRIEND COMPONENTS, THEN RENDER CARDS */}
        </div>
        <Pagination
          onChange={onPageChange}
          current={pagination.pageIndex}
          pageSize={pagination.pageSize}
          total={pagination.totalCount}
          locale={locale}
        ></Pagination>
      </div>
    </React.Fragment>
  );
}

export default Friends;
