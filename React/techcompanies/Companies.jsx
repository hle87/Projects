import React, { useCallback, useEffect, useState } from "react";
import * as companiesService from "../../services/companiesService";
import { useNavigate } from "react-router-dom";
import CompanyCard from "./CompanyCard";

function Companies() {
  const [companyData, setCompanyData] = useState({
    companyData: [],
    companyComponents: [],
  });

  console.log("companyData", companyData);

  const navigate = useNavigate();

  // Get all
  useEffect(() => {
    companiesService
      .getCompanies()
      .then(onGetCompanySuccess)
      .catch(onGetCompanyErr);
  }, []);

  const onGetCompanySuccess = (response) => {
    console.log("res", response.data.item.pagedItems);
    let newArrayOfCompanies = response.data.item.pagedItems;
    setCompanyData((prevState) => {
      const cData = { ...prevState };
      cData.companyData = newArrayOfCompanies;
      cData.companyComponents = cData.companyData.map(mapTechCo);
      return cData;
    });
  };

  const onGetCompanyErr = (err) => {
    console.log("err", err);
  };

  const onDeleteRequested = useCallback((myCo) => {
    console.log("Delete Requested", myCo.id);
    const handler = getDeleteSuccessHandler(myCo.id);
    companiesService.deleteCompanyById(myCo.id).then(handler).catch(onDelErr);
  }, []);

  const getDeleteSuccessHandler = (idToBDel) => {
    return () => {
      console.log("delete request success", idToBDel);
      setCompanyData((prevState) => {
        const newCData = { ...prevState };
        newCData.companyData = [...newCData.companyData];

        const indexOf = newCData.companyData.findIndex((techCo) => {
          let result = false;

          if (techCo.id === idToBDel) {
            result = true;
          }
          return result;
        });

        if (indexOf >= 0) {
          newCData.companyData.splice(indexOf, 1);
          newCData.CosComponents = newCData.companyData.map(mapTechCo);
        }
        return newCData;
      });
    };
  };

  const onDelErr = (err) => {
    console.log("error", err);
  };

  const onEditRequest = (techCo) => {
    console.log("Edit/Update Request", techCo);
    navigate(`/Companies/AddEditCompany/${techCo.id}`, {
      state: { type: "COMPANY_VIEW", payload: techCo },
    });
  };

  const mapTechCo = (company) => {
    console.log("company", company);
    return (
      <CompanyCard
        key={company.id}
        job={company}
        onCoClicked={onDeleteRequested}
        onEditClicked={onEditRequest}
      ></CompanyCard>
    );
  };

  const onPostACompany = (e) => {
    console.log("onPostACompany", e.target.dataset.page);
    navigate("/companiesPage/new");
  };

  return (
    <React.Fragment>
      <h1>Companies</h1>
      <div className="gap-3 p-2">
        <button
          type="button"
          className="p-2 btn btn-dark btn-lg btn-block text-warning"
          data-page={"/Companies/new"}
          onClick={onPostACompany}
        >
          (<strong>+</strong>) Tech Company
        </button>
      </div>
      <div className="row">{companyData.companyComponents}</div>
    </React.Fragment>
  );
}

export default Companies;
