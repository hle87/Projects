import React, { useState, useEffect } from "react";
import toastr from "toastr";
import * as eventService from "../../services/eventService";
import { useLocation } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.min.css";

function EventForm(props) {
  const [eventId, setEventId] = useState({
    id: 0,
  });
  console.log("form props", props);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "Active",
    metaData: {
      dateStart: "",
      dateEnd: "",
      location: {
        latitude: 0,
        longitude: 0,
        zipCode: "",
        address: "",
      },
    },
  });

  const { state } = useLocation();

  useEffect(() => {
    console.log("this is state, form", state);
    if (
      state?.type === "EVENT_VIEW" &&
      state.payload &&
      state.payload !== formData
    ) {
      setEventId((prevState) => {
        const eventIdState = { ...prevState };
        eventIdState.id = state.payload.id;
        return eventIdState;
      });

      setFormData((prevState) => {
        const fData = { ...prevState, ...state.payload };
        return fData;
      });
    }
  }, [state]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      console.log("updater onChange", value);
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };

  const onNewEditEventClicked = () => {
    console.log("i am eventId", eventId);
    if (eventId.id >= 0) {
      eventService
        .updateEvent(eventId.id, formData)
        .then(onUpdateSuccess)
        .catch(onFormError);
    } else {
      eventService
        .postEvent(formData)
        .then(onAddEventSucess)
        .catch(onFormError);
    }
  };

  const onUpdateSuccess = () => {
    toastr.success("Edit Event Successful");
  };

  const onAddEventSucess = (response) => {
    toastr.success("Add Event Successful");
    setEventId((prevState) => {
      const eventIdState = { ...prevState };
      eventIdState.id = response.data.item;
      return eventIdState;
    });
  };

  const onFormError = () => {
    toastr.error("Add/Edit Event Unsuccessful");
  };

  return (
    <React.Fragment>
      <header className="pt-3">
        <h1>Event Form</h1>
      </header>

      <div className="container">
        <div className="col-md-12">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name: Dwight Schrute"
              value={formData.name}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group pt-3">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="This is a Description"
              value={formData.description}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group pt-3">
            <label>Summary</label>
            <input
              type="text"
              className="form-control"
              name="summary"
              placeholder="Summary"
              value={formData.summary}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group inputpad pt-3">
            <label>Headline</label>
            <input
              type="text"
              className="form-control"
              id="inputHeadline"
              name="headline"
              placeholder="Headline"
              value={formData.headline}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group pt-3">
            <label>Slug</label>
            <input
              type="text"
              className="form-control"
              id="inputSlug"
              name="slug"
              placeholder="Unique Identifier"
              value={formData.slug}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group pt-3">
            <label>Date Start</label>
            <input
              type="text"
              className="form-control"
              name="dateStart"
              placeholder="Date Start"
              value={formData.metaData.dateStart}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group pt-3">
            <label>Date End</label>
            <input
              type="text"
              className="form-control"
              name="dateEnd"
              placeholder="Date End"
              value={formData.metaData.dateEnd}
              onChange={onInputChange}
            />
          </div>
          {/* <div className="form-group pt-3">
            <label>Latitude</label>
            <input
              type="text"
              className="form-control"
              name="latitude"
              placeholder="Latitude"
              value={formData.metaData.location.latitude}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group pt-3">
            <label>Longitude</label>
            <input
              type="text"
              className="form-control"
              name="longitude"
              placeholder="longitude"
              value={formData.metaData.location.longitude}
              onChange={onInputChange}
            />
          </div> */}
          <div className="form-group pt-3">
            <label>Zip Code</label>
            <input
              type="text"
              className="form-control"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.metaData.location.zipCode}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group pt-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Address"
              value={formData.metaData.location.address}
              onChange={onInputChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-lg mt-4"
            id="cmdSubmit"
            onClick={onNewEditEventClicked}
          >
            Submit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EventForm;

//#region
/* <React.Fragment>
<div className="container form-fill">
  <div className="row">
    <header className="pt-3">
      <h1>Event Form</h1>
    </header>
    <div className="col-md-6">
      <form className="pt-2" name="champInfoForm">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name: Dwight Schrute"
            value={formData.name}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            name="Description"
            placeholder="This is a Description"
            value={formData.description}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Summary</label>
          <input
            type="text"
            className="form-control"
            name="summary"
            placeholder="Summary"
            value={formData.summary}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group inputpad pt-3">
          <label>Headline</label>
          <input
            type="text"
            className="form-control"
            id="inputHeadline"
            name="headline"
            placeholder="Headline"
            value={formData.headline}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Slug</label>
          <input
            type="text"
            className="form-control"
            id="inputSlug"
            name="slug"
            placeholder="Slug: www.schrutefarms.com"
            value={formData.slug}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Date Start</label>
          <input
            type="text"
            className="form-control"
            name="dateStart"
            placeholder="Date Start"
            value={formData.metaData.dateStart}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Date End</label>
          <input
            type="text"
            className="form-control"
            name="dateEnd"
            placeholder="Date End"
            value={formData.metaData.dateEnd}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Latitude</label>
          <input
            type="text"
            className="form-control"
            name="latitude"
            placeholder="Latitude"
            value={formData.metaData.location.latitude}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Longitude</label>
          <input
            type="text"
            className="form-control"
            name="longitude"
            placeholder="longitude"
            value={formData.metaData.location.longitude}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.metaData.location.zipCode}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group pt-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
            value={formData.metaData.location.address}
            onChange={onInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg mt-4"
          id="cmdSubmit"
          onClick={onNewEditEventClicked}
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</div>
<div>
  {/* <pre>
         <code>{JSON.stringify(formData, undefined, 2)}</code>
      </pre> */
// </div>
// </React.Fragment> */}
//#endregion
