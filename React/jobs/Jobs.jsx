import React, { useCallback, useEffect, useState } from "react";
import * as jobsService from "../../services/jobsService";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";

function Jobs(props) {
  //set up state for jobs
  const [jobData, setJobData] = useState({
    jobData: [],
    jobComponents: [],
  });
  console.log("props", props);
  // const [show, setShow] = useState(false);
  //const [job, setJob] = useState({});

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 3,
    pageCount: 2,
    totalCount: 12,
  });

  const navigate = useNavigate();
  const aJob = props.job;

  const onPageChange = (currentPage, pageSize) => {
    setPagination((prevState) => {
      const pageState = { ...prevState };
      pageState.pageIndex = currentPage;
      pageState.pageSize = pageSize;
      return pageState;
    });
    jobsService
      .getJobs(currentPage - 1, pagination.pageSize)
      .then(onJobSearchSuccess)
      .catch(onJobSearchError);
  };
  // Get all
  useEffect(() => {
    console.log("useEffect Jobs");
    jobsService
      .getJobs(pagination.pageIndex - 1, pagination.pageSize)
      .then(onGetJobSuccess)
      .catch(onGetJobErr);
  }, []);

  const onGetJobSuccess = (response) => {
    console.log("response Job Success", response.data.item);
    setJobData((prevState) => {
      const jData = { ...prevState };
      jData.jobData = response.data.item?.pagedItems;
      jData.jobComponents = jData.jobData?.map(mapJobSearched);
      return jData;
    });
  };

  const onGetJobErr = (err) => {
    console.log("err", err);
  };

  const [search, setSearch] = useState("");

  console.log(search, setSearch);

  const onJobSearch = (e) => {
    e.preventDefault();
    console.log("Searching Jobs");
    jobsService
      .searchJobs(pagination.pageIndex - 1, pagination.pageSize, search)
      .then(onJobSearchSuccess)
      .catch(onJobSearchError);
  };

  const onJobSearchSuccess = (response) => {
    console.log("Search Success", response);
    setJobData((prevState) => {
      const jData = { ...prevState };
      jData.jobData = response.item?.pagedItems;
      jData.jobComponents = jData.jobData?.map(mapJobSearched);
      return jData;
    });

    // setShow(!show);
  };

  const onJobSearchError = (response) => {
    console.log("Search Error", response);
  };

  const onDeleteRequested = useCallback((myJob) => {
    console.log("Delete Requested", myJob.id);

    var payload = { ...myJob };
    payload.skills = myJob.skills;
    console.log("delete payload part", payload);
    const handler = getDeleteHandler(myJob.id);

    jobsService
      .deleteJobById(myJob.id, payload)
      .then(handler)
      .catch(onDelError);
  }, []);

  const getDeleteHandler = (idDeleted) => {
    return () => {
      console.log("Delete Success", idDeleted);

      setJobData((prevState) => {
        const jData = { ...prevState };
        jData.jobData = [...jData.jobData];
        const indexOf = jData.jobData.findIndex((job) => {
          console.log("job upon delete", job);
          let result = false;

          if (job.id === idDeleted) {
            result = true;
          }
          return result;
        });

        if (indexOf > 0) {
          jData.jobData.splice(indexOf, 1);
          jData.jobComponents = jData.jobData.map(mapJobSearched);
        }
        return jData;
      });
    };
  };

  const onDelError = (err) => {
    console.log("Delete Error", err);
  };

  const mapJobSearched = (aJob) => {
    console.log("A JOB", aJob);
    return (
      <JobCard
        key={aJob.id}
        job={aJob}
        onJobClicked={onDeleteRequested}
      ></JobCard>
    );
  };

  const onSearchChange = (e) => {
    e.preventDefault();
    console.log("Search Change", e.target.value);
    setSearch(e.target.value);
  };

  const onAddJob = (e) => {
    e.preventDefault();
    console.log("Add Job Clicked", aJob);
    navigate(`/jobsPage/new`);
  };

  return (
    <React.Fragment>
      <h1>Jobs</h1>
      {/* {show && <JobCard></JobCard>} */}
      <div className="container">
        <form>
          <div className="form-outline col-md-3 p-2">
            <div className="input-group">
              <input
                type="search"
                className="SearchInputs"
                placeholder="search jobs"
                aria-label="Search"
                aria-describedby="search-addon"
                value={search}
                onChange={onSearchChange}
              />

              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={onJobSearch}
              >
                <strong>search</strong>
              </button>
            </div>
          </div>
        </form>
        <div className="gap-3 p-2">
          <button
            type="button"
            className="p-2 btn btn-dark btn-lg btn-block text-warning"
            data-page={aJob}
            onClick={onAddJob}
          >
            <strong>+</strong> Jobs
          </button>
        </div>
        <Pagination
          onChange={onPageChange}
          current={pagination.pageIndex}
          pageSize={pagination.pageSize}
          total={pagination.totalCount}
          locale={locale}
        ></Pagination>
      </div>
      {jobData.jobComponents}
    </React.Fragment>
  );
}

export default Jobs;
