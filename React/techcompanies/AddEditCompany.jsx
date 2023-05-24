import React, { useState, useEffect } from "react";
import toastr from "toastr";
import * as companiesService from "../../services/companiesService";
import { useLocation } from "react-router-dom";

function CompaniesForm() {
  const [companyId, setCompanyId] = useState({
    id: 0,
  });

  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    slug: "",
    statusId: "Active",
    images: " ",

    urls: "",
    tags: "",
    friendIds: [0],
  });
  console.log("this b formData", formData);
  const { state } = useLocation();

  useEffect(() => {
    console.log("pathname", state);
    if (
      state?.type === "COMPANY_VIEW" &&
      state.payload
      // && state.payload !== formData
    ) {
      setCompanyId((prevState) => {
        const newCompanyId = { ...prevState };
        newCompanyId.id = state.payload.id;
        return newCompanyId;
      });

      setFormData((prevState) => {
        console.log("setFormData", prevState, state.payload);
        const newFormData = { ...prevState, ...state.payload };

        return newFormData;
      });
    }
  }, [state]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      console.log("updater onChange", value);
      const newCoObj = { ...prevState };
      newCoObj[name] = value;
      return newCoObj;
    });
  };

  const onEditFinish = () => {
    console.log("companyId", companyId);
    let payload = { ...formData };
    payload.images = formData.images.split(",").map((image) => {
      return { imageUrl: image, imageTypeId: 1 };
    });

    payload.urls = [];
    payload.tags = [];

    if (companyId.id >= 0) {
      companiesService
        .updateCompany(companyId.id, payload)
        .then(onEditCoSuccess)
        .catch(onErrorForm);
    } else {
      companiesService
        .addCompany(payload)
        .then(onFormSuccess)
        .catch(onErrorForm);
    }
  };

  const onEditCoSuccess = () => {
    toastr.success("Edit Successful");
  };

  const onFormSuccess = (response) => {
    toastr.success("Add Successful");
    setCompanyId((prevState) => {
      const newCompanyId = { ...prevState };
      newCompanyId.id = response.data.item;
      return newCompanyId;
    });
  };

  const onErrorForm = () => {
    toastr.error("Add/Edit Unsuccessful");
  };

  return (
    <React.Fragment>
      <div className="container form-fill">
        <div className="row">
          <header className="pt-3">
            <h1>
              {" "}
              {state?.type === "COMPANY_VIEW" && state.payload
                ? "Edit Tech Company"
                : "Add Tech Company"}
            </h1>
          </header>
          <div className="col-md-6">
            <form className="pt-2" name="champInfoForm">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Company Name"
                  value={formData.name}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group pt-3">
                <label>Profile</label>
                <input
                  type="text"
                  className="form-control"
                  name="profile"
                  placeholder="Profile"
                  value={formData.profile}
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
                  name="headline"
                  placeholder="Headline"
                  value={formData.headline}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group inputpad pt-3">
                <label>Contact Information</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactInformation"
                  placeholder="Contact Information"
                  value={formData.contactInformation}
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
                  placeholder="Type unique identifier"
                  value={formData.slug}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group pt-3">
                <label>Image Url</label>
                <input
                  type="text-url"
                  className="form-control"
                  id="images"
                  name="images"
                  placeholder="Please enter image url"
                  value={formData.images}
                  onChange={onInputChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-outline-success btn-lg mt-4"
                id="Submit"
                onClick={onEditFinish}
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
        </pre> */}
      </div>
    </React.Fragment>
  );
}

export default CompaniesForm;
