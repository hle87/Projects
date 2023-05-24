import React, { useState, useEffect } from "react";
import * as jobsService from "../../services/jobsService";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddEditJob() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "Active",
    techComapnyId: 0,
    skills: "",
    id: 0,
  });

  console.log(jobData, jobsService);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("is there a state?", state);

  useEffect(() => {
    console.log("useEffect fires", state);
    if (state?.type === "JOB_VIEW" && state.payload) {
      setJobData((prevState) => {
        let stateJobs = { ...prevState, ...state.payload };
        stateJobs.skills = stateJobs.skills[0].name;
        console.log("stateJobs", stateJobs);
        return stateJobs;
      });
    }
  }, [state]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => {
      console.log("updater onChange", value);
      const newObjJob = { ...prevState };
      newObjJob[name] = value;
      return newObjJob;
    });
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    var payload = { ...jobData };
    payload.skills = jobData.skills.split(",");
    if (state?.payload.id > 0) {
      jobsService
        .editJob(state.payload.id, jobData)
        .then((response) => {
          console.log("response", response);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      jobsService
        .addJob(jobData)
        .then((response) => {
          console.log("response", response);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    navigate("/jobsPage");
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>
          {state?.type === "PERSON_VIEW" && state.payload
            ? "Edit Job"
            : "(+) Job"}
        </h1>
        <div className="card col">
          <div className="card-body md-6">
            <form>
              <div className="form-outline col-md-6">
                <label htmlFor="roleInput" className="col-3 col-form-label">
                  ROLE
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={jobData.title}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="techCompanyId" className="col-3 col-form-label">
                  Tech Co.
                </label>
                <select
                  type="select"
                  id="techCompanyId"
                  name="techCompanyId"
                  value={jobData.techCompanyId}
                  onChange={onInputChange}
                >
                  <option value="0">Select a Tech Company</option>
                  <option value="63186">Sigma Corp.</option>
                  <option value="63172">Capsule Corp.</option>
                  <option value="63191">Spiral Technologies</option>
                  <option value="63163">SHINRA EPC</option>
                  <option value="63196">MM LAN Tech.</option>
                </select>
              </div>
              <div className="form-outline col-md-6">
                <label
                  htmlFor="descriptionInput"
                  className="col-3 col-form-label"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={jobData.description}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="summaryInput" className="col-3 col-form-label">
                  Summary
                </label>
                <input
                  type="text"
                  id="summary"
                  name="summary"
                  value={jobData.summary}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="payInput" className="col-3 col-form-label">
                  Pay
                </label>
                <input
                  type="text"
                  id="pay"
                  name="pay"
                  value={jobData.pay}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="statusId" className="col-3 col-form-label">
                  Status
                </label>
                <input
                  type="text"
                  id="statusId"
                  name="statusId"
                  value={jobData.statusId}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="skills" className="col-3 col-form-label">
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={jobData.skills}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="form-outline col-md-6">
                <label htmlFor="slug" className="col-3 col-form-label">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  placeholder="unique identifier"
                  value={jobData.slug}
                  onChange={onInputChange}
                ></input>
              </div>
              <div className="d-flex pt-3 justify-content-center">
                <Link to="/jobsPage/new">
                  <button
                    type="submit"
                    className="p-2 btn btn-outline-success  btn-block"
                    onClick={onSubmitClick}
                  >
                    Submit
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddEditJob;
