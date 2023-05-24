import axios from "axios";

var jobsService = {
    endpoint: "https://api.remotebootcamp.dev/api/jobs",
  }; 

let getJobs = (pageIndex, pageSize) => {
      
     const config = {
        method: "GET",
        url: jobsService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
     
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
     };
      
     return axios(config);
      };

let getJobById = (id) => {

    const config = {
        method: "GET",
        url: jobsService.endpoint + `/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


let deleteJobById = (id) => {
    console.log("DEL ajax call executing", id)
    const statusId = "2"
    const config = {
        method: "PUT",
        url: jobsService.endpoint + `/${id}/${statusId}`,
        
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    
    return axios(config).then(()=>{
        return id
    }
    );
};

let addJob = (payload) => {

    const config = {
        method: "POST",
        url: jobsService.endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let editJob = (id, payload) => {

    const config = {
        method: "PUT",
        url: jobsService.endpoint + `/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let searchJobs = (pageIndex, pageSize, query) => {

    const config = {
        method: "GET",
        url: jobsService.endpoint + `/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};





export { getJobs, deleteJobById , addJob, getJobById, editJob, searchJobs};