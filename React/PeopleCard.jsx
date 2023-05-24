import React from "react";

function PeopleCard(props) {
  console.log("this is props", props);

  return (
    <div className="col-4">
      <div className="card" style={{ width: "18rem" }}>
        <img src="..." className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">
            {props.person.first_name} {props.person.last_name}
          </h5>
          <p className="card-text">
            {props.person.gender} {props.person.birthYear}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PeopleCard;
