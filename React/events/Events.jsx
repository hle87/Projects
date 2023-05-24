import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftEvent from "./LeftEvent";
import RightEvent from "./RightEvent";
import * as eventService from "../../services/eventService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";

function Events() {
  const [pageData, setPageData] = useState({
    eventData: [],
    eventComponents: [],
    beginEvComponents: [],
    pageIndex: 1,
    pageSize: 3,
    total: 10,
  });

  const [search, setSearch] = useState({
    startSearch: "2022-12-01",
    endSearch: "2022-12-31",
  });

  const [emailData] = useState({
    to: ["user@example.com"],
    bcc: "user@example.com",
    body: "101010100110",
    name: "Name",
  });

  const [files, setFiles] = useState(null);

  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => {
      console.log("updater onChange", value);
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };

  const onEditRequested = (aEvent) => {
    console.log("aEvent", aEvent);
    navigate(`/Events/EventForm/${aEvent.id}`, {
      state: { type: "EVENT_VIEW", payload: aEvent },
    });
  };

  useEffect(() => {
    eventService
      .getPaginatedFeeds(pageData.pageIndex - 1, pageData.pageSize)
      .then(onEventSearchSuccess)
      .catch(onEvSearchErr);
  }, []);

  const onEventSearchSuccess = (response) => {
    let tempArEvent = response.data.item.pagedItems;
    console.log("Event Search Success", tempArEvent);
    let newEventAr = [];
    for (let i = 0; i < tempArEvent.length; i++) {
      newEventAr.push(tempArEvent[i]);
    }
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.eventData = newEventAr;
      pd.eventComponents = newEventAr.map(mapString);
      pd.beginEvComponents = mapAnEvent(newEventAr[0]);
      return pd;
    });
  };

  const onEvSearchErr = () => {
    toastr.error("Searching Error");
    console.log("ERORRRRRROAR");
  };

  const mapString = (eventP) => {
    return (
      <RightEvent
        theEvents={eventP}
        key={eventP.id}
        onEventClickedForEdit={onEditRequested}
        onEventClickedForRender={onRenderRequested}
      />
    );
  };

  const mapAnEvent = (eventP) => {
    console.log("LOOK mapAnEvent", eventP);
    return <LeftEvent theEvents={eventP} key={eventP.id} />;
  };

  const paginationStyle = { textAlign: "center" };

  const pagination = (current) => {
    setPageData((prevState) => {
      const newPage = { ...prevState };
      newPage.pageIndex = current;
      return newPage;
    });
    eventService
      .getPaginatedFeeds(current - 1, pageData.pageSize)
      .then(onEventSearchSuccess)
      .catch(onEvSearchErr);
  };

  const onSearch = (pageIndex, pageSize, dateStart, dateEnd) => {
    console.log("onSearch firing", pageIndex, pageSize, dateStart, dateEnd);
    eventService
      .searchEvent(
        pageData.pageIndex - 1,
        pageData.pageSize,
        search.startSearch,
        search.endSearch
      )
      .then(onEventSearchSuccess)
      .catch(onEvSearchErr);
  };

  function onFileChange(e) {
    console.log("onFileChange", e);
    setFiles(() => {
      let formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("file", e.target.files[i]);
      }
      return formData;
    });
  }

  function onUploadButtonClicked() {
    eventService
      .fileUpload(files)
      .then(onFileUploadSuccess)
      .catch(onFileUploadError);
  }

  //LOGS RESPONSE ON SUCCESS
  const onFileUploadSuccess = (response) => {
    console.log("onFileUploadSuccess", response);
  };

  const onFileUploadError = (err) => {
    console.log("onFileUploadError", err);
  };

  const onRenderRequested = (aEvent) => {
    console.log("onRenderRequested", aEvent);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.beginEvComponents = mapAnEvent(aEvent);
      return pd;
    });

    eventService
      .emailPost(emailData)
      .then(onEmailSuccess)
      .catch(onGetEventError);
  };

  const onEmailSuccess = (response) => {
    console.log("email success", response);
  };
  const onGetEventError = (err) => {
    console.log("email error", err);
  };

  return (
    <React.Fragment>
      <h1>Events</h1>

      <div className="container">
        <div className="row pt-3">
          <header className="pt-3">
            <input type="file" onChange={onFileChange} />
            <button
              className="btn btn-secondary btn-sm"
              onClick={onUploadButtonClicked}
            >
              upload
            </button>
          </header>
          <div className="col-md-6 border rounded">
            <div className="text-center pb-3 row">
              <div className="input-group input-daterange pb-3">
                <input
                  type="text"
                  className="form-control col-5"
                  value={search.startSearch}
                  onChange={onInputChange}
                />
                <h2 className="input-group-addon">-</h2>
                <input
                  type="text"
                  className="form-control col-5"
                  value={search.endSearch}
                  onChange={onInputChange}
                />
                <button
                  type="button"
                  className="link-btn btn btn-sm btn-outline-warning "
                  id="cmdSearch"
                  onClick={onSearch}
                >
                  <strong>Search</strong>
                </button>
              </div>
            </div>
            {pageData.beginEvComponents}
          </div>
          <div className=" col-6">
            <Pagination
              style={paginationStyle}
              className="friendsPagination"
              locale={locale}
              current={pageData.pageIndex}
              pageSize={pageData.pageSize}
              total={pageData.total}
              onChange={pagination}
            ></Pagination>
            {pageData.eventComponents}
            {/* this is for RIGHT side */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Events;
