import React from "react";
import { useNavigate } from "react-router-dom";

function CompanyCard(props) {
  console.log("props for CC", props);

  const navigate = useNavigate();
  const aCompany = props.job;
  console.log("A COMPANY", aCompany);

  const onLocalDelClicked = (e) => {
    e.preventDefault();
    props.onCoClicked(aCompany, e);
  };

  const onLocalEditClicked = (e) => {
    e.preventDefault();
    props.onEditClicked(aCompany);
    navigate(e.currentTarget.dataset.page);
  };

  return (
    <React.Fragment>
      <div className="col-md-3 p-4" key={aCompany}>
        <div className="card" width="100px">
          <div className="row">
            <img
              src={aCompany.images[0].imageUrl}
              alt="coImage"
              className="card-img-top"
            />
            <div className="card-body">
              <h3 className="card-title">{aCompany.name}</h3>
              <h6 className="card-bio">{aCompany.profile}</h6>
              <p className="card-summary">{aCompany.summary}</p>

              <button
                type="button"
                className="link-btn btn btn-outline-dark"
                id="editId"
                data-page={aCompany.id}
                onClick={onLocalEditClicked}
              >
                Edit
              </button>

              <button
                type="button"
                className="link-btn btn btn-outline-danger ms-1"
                onClick={onLocalDelClicked}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CompanyCard;
