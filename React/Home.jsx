import React from "react";

//HOME COMPONENT (HOME PAGE) - APP STATE GETS PASSED AS PROPS
// Path: src\components\Home.jsx
// AFTER USER LOG IN, USER STATE IS UPDATED AND HOME PAGE RENDERED WITH USER INFO
function Home(props) {
  console.log("Home props", props);
  return (
    <React.Fragment>
      <h1>
        Hello {props.user.firstName} {props.user.lastName}!
      </h1>
    </React.Fragment>
  );
}

export default Home;
