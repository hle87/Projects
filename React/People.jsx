import React, { useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";
function People() {
  const [people, setPeople] = useState({
    list: [
      {
        id: 1,
        first_name: "Horst",
        last_name: "Boulde",
        email: "hboulde0@ovh.net",
        gender: "Male",
        birthYear: 1980,
      },
      {
        id: 2,
        first_name: "Janna",
        last_name: "George",
        email: "jgeorge1@sitemeter.com",
        gender: "Female",
        birthYear: 1987,
      },
      {
        id: 3,
        first_name: "Rourke",
        last_name: "Berger",
        email: "rberger2@pcworld.com",
        gender: "Male",
        birthYear: 1980,
      },
      {
        id: 4,
        first_name: "Karlen",
        last_name: "Suarez",
        email: "ksuarez3@addthis.com",
        gender: "Female",
        birthYear: 1990,
      },
      {
        id: 5,
        first_name: "Norean",
        last_name: "Marchelli",
        email: "nmarchelli4@digg.com",
        gender: "Female",
        birthYear: 1990,
      },
    ],
    mapped: [],
  });
  const [showPeople, setToggle] = useState(false);

  useEffect(() => {
    console.log("ran useEffect People", people);
    setPeople((prevState) => {
      let newState = { ...prevState };
      newState.mapped = newState.list.map(mapAItem);
      return newState;
    });
  }, []);
  const handleClick = (person) => {
    console.log("person_handleClick", person);
  };
  const handleToggle = () => setToggle(!showPeople);
  const mapAItem = (aPerson, index) => {
    return (
      <PeopleCard key={index} person={aPerson} handleClick={handleClick} />
    );
  };

  const handleFilter = () => {
    setPeople((prevState) => {
      let newState = { ...prevState };
      newState.mapped = newState.list.filter(filterFunction).map(mapAItem);
      return newState;
    });
  };

  const filterFunction = (aPerson) => {
    if (aPerson.gender === "Female") {
      return true;
    } else {
      return false;
    }
  };

  const handleFilter2 = () => {
    setPeople((prevState) => {
      let newState = { ...prevState };
      newState.mapped = newState.list.filter(filterFunction2).map(mapAItem);
      return newState;
    });
  };

  const filterFunction2 = (aPerson) => {
    if (aPerson.birthYear >= 1987) {
      return true;
    } else {
      return false;
    }
  };

  //#region
  // const handleFilter = () => {
  //   setPeople((prevState) => {
  //     let newState = { ...prevState };
  //     const filterHandler = (person) => {
  //       return filterAItem(person, "gender", "Male");
  //     };

  //     newState.mapped = newState.list.filter(filterHandler).map(mapAItem);
  //     return newState;
  //   });
  // };

  // const handleFilter2 = () => {
  //   setPeople((prevState) => {
  //     let newState = { ...prevState };
  //     const filterHandler = (person) => {
  //       return filterAItem(person, "birthYear", 1990);
  //     };
  //     newState.mapped = newState.list.filter(filterHandler).map(mapAItem);
  //     return newState;
  //   });
  // };

  // const filterAItem = (aPerson, aProperty, aValue) => {
  //   //console.log("filterAItem", aPerson);
  //   if (aPerson[aProperty] === aValue) {
  //     return true;
  //     //   <PeopleCard key={index} person={aPerson} />;
  //   }
  //   return false;
  // };
  //#endregion

  return (
    <>
      <h2>People Component first run</h2>
      <div className="container">
        <button className="btn btn-warning" onClick={handleToggle}>
          {showPeople ? "Hide" : "Show"}
        </button>
        <button className="btn btn-info" onClick={handleFilter}>
          Filter Male
        </button>
        <button className="btn btn-info" onClick={handleFilter2}>
          Filter 1990
        </button>
        <div className="row">{showPeople && people.mapped}</div>
      </div>
    </>
  );
}
export default People;
