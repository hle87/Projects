import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";

function JobCard(props) {
  console.log("props", props);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const aJob = props.job;
  console.log("aJOB", aJob);

  const onDeleteJobClicked = (e) => {
    e.preventDefault();
    props.onJobClicked(aJob, e);
    console.log(aJob);
  };
  //#region
  const onEditJobClicked = (e) => {
    console.log("edit button has been clicked", aJob);
    // navigate(`/jobsPage/${aJob.id}`,
    navigate(e.currentTarget.dataset.page, {
      state: { type: "JOB_VIEW", payload: aJob },
    });
  };
  //#endregion
  const onHandleClose = () => setShowModal(false);
  const onHandleShow = () => setShowModal(true);

  return (
    <React.Fragment>
      <div className="card">
        <div className="col-md-3 p-4" key={aJob.id}>
          <div className="row">
            <div className="card" width="100px">
              <img
                src={aJob.techCompany?.images[0].imageUrl}
                alt="currentJob"
              />
              <div className="card-body">
                <h5 className="card-title">{aJob.title}</h5>
                <p className="card-text">{aJob.pay}</p>
                <p className="card-text">{aJob.description}</p>

                <button
                  className="btn btn-secondary btn-sm"
                  id="editId"
                  data-page={aJob.id}
                  onClick={onEditJobClicked}
                >
                  Edit
                </button>
                <a
                  href="#button"
                  className="btn btn-danger btn-sm"
                  id="deleteBtn"
                  onClick={onDeleteJobClicked}
                >
                  Delete
                </a>

                <Button
                  variant="btn btn-primary btn-sm"
                  id="view"
                  data-page=""
                  onClick={onHandleShow}
                >
                  View More
                </Button>
                <Modal show={showModal} onHide={onHandleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <strong>About Job</strong>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <strong>{aJob.title}</strong>
                  </Modal.Body>
                  <Modal.Body>{aJob.pay}</Modal.Body>
                  <Modal.Body>{aJob.summary}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={onHandleClose}>
                      Close Window
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default JobCard;
