import axios from "axios";

var companiesService = {
    endpoint: "https://api.remotebootcamp.dev/api/techcompanies",
  }; 

let getCompanies = () => {
      
     const config = {
        method: "GET",
        url: companiesService.endpoint + "?pageIndex=0&pageSize=10",
     
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
     };
      
     return axios(config);
      }

 
let getCompanyById = (id) => {

    const config = {
        method: "GET",
        url: companiesService.endpoint + `/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let addCompany = (payload) => {
    
        const config = {
            method: "POST",
            url: companiesService.endpoint,
            data: payload,
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
        };
    
        return axios(config);
    };


    let updateCompany = (id, payload) => {
        console.log("PUT ajax call executing", id, "Payload ->", payload)
        const config = {
            method: "PUT",
            url: companiesService.endpoint + `/${id}`,
            data: payload,
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
        };
        
        return axios(config).then(()=>{
            return id
        }
        );
    };

    let deleteCompanyById = (id) => {
        console.log("DEL ajax call executing", id)
        const statusId = "2"
        const config = {
            method: "PUT",
            url: companiesService.endpoint + `/${id}/${statusId}`,
            
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
        };
        
        return axios(config).then(()=>{
            return id
        }
        );
    };



export  { getCompanies, getCompanyById , addCompany, updateCompany, deleteCompanyById};