import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import EventForm from "./EventForm";
import Form from "react-bootstrap/Form";
//import { useNavigate } from "react-router-dom";

function RightEvent(props) {
  console.log("rightEventProps", props);

  const metaEvent = props.theEvents;

  const [showModal, setShowModal] = useState(false);
  const onHandleClose = () => setShowModal(false);
  //const navigate = useNavigate();

  const onHandleShow = (e) => {
    e.preventDefault();

    setShowModal(true);
  };

  // const onLocalClick = (e) => {
  //   e.preventDefault();
  //   props.onEventClicked(metaEvent, e);
  // };

  return (
    <React.Fragment>
      <div className="col-4 pt-3" key={metaEvent.id}>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{metaEvent.name}</h3>
            <h6 className="card-bio">{metaEvent.headline}</h6>
            <p className="card-headline">{metaEvent.summary}</p>
            <p className="card-headline">{metaEvent.slug}</p>
            <Button variant="dark text-warning" onClick={onHandleShow}>
              Add Event
            </Button>

            <Modal
              size="lg"
              className="modal"
              show={showModal}
              onHide={onHandleClose}
            >
              <Form>
                <EventForm></EventForm>
              </Form>
              <Modal.Footer>
                <Button variant="secondary" onClick={onHandleClose}>
                  <strong>Close</strong>
                </Button>
                <Button
                  variant="outline-warning text-dark"
                  onClick={onHandleClose}
                >
                  <strong>Save Changes </strong>
                </Button>
              </Modal.Footer>
            </Modal>
            <Button variant="warning ms-3" onClick={onHandleShow}>
              Make Changes
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RightEvent;
