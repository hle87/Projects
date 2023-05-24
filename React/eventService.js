import axios from "axios";

var eventService = {
    endpoint: 'https://api.remotebootcamp.dev/api/events'
};

let getEvents = () => {
    const config = {
        method: 'GET',
        url: eventService.endpoint,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' }
    };

    return axios(config);
};

let postEvent = (payload) => {
    const config = {
        method: 'POST',
        url: eventService.endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' }
    };

    return axios(config);
}

let updateEvent = (id, payload) => {
    const config = {
        method: 'PUT',
        url: eventService.endpoint + `/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' }
    };

    return axios(config);
};

let searchEvent = (pageIndex, pageSize, dateStart, dateEnd) => {
    console.log("search event firing" , pageIndex, pageSize, dateStart, dateEnd)
       const config = {
         method: "GET",
         url: eventService.endpoint + `/search?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=${dateStart}&$dateEnd=${dateEnd}`,
         //url: "https://api.remotebootcamp.dev/api/events/search?pageIndex=0&pageSize=10&dateStart=2022-12-09T01%3A12%3A22.219Z&dateEnd=2022-12-30T01%3A12%3A22.219Z",
         withCredentials: true,
         crossdomain: true,
         headers: { "Content-Type": "application/json" }
       };
     
       return axios(config);
     };

     let getFeeds = () => {
        
           const config = {
             method: "GET",
             url: eventService.endpoint + '/feeds',
             
             withCredentials: true,
             crossdomain: true,
             headers: { "Content-Type": "application/json" }
           };
         
           return axios(config);
         };

let getPaginatedFeeds = (pageIndex, pageSize) => {
        
        const config = {
            method: "GET",
            url: eventService.endpoint + `/feed?pageIndex=${pageIndex}&pageSize=${pageSize}`,
            
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
        };
        
        return axios(config);
        };

        let emailPost = (payload) => {
            const config = {
                method: 'POST',
                url: "https://api.remotebootcamp.dev/api/emails",
                data: payload,
                withCredentials: true,
                crossdomain: true,
                headers: { 'Content-Type': 'application/json' }
            };
        
            return axios(config);
        }


        let fileUpload = (payload) => {
            const config = {
                method: 'POST',
                url: "https://api.remotebootcamp.dev/api/files",
                data: payload,
                withCredentials: true,
                crossdomain: true,
                headers: { 'Content-Type': 'application/json' }
            };
        
            return axios(config).then((response) =>response.data.items);
        }
        


export { getEvents, postEvent, updateEvent, searchEvent, getFeeds,getPaginatedFeeds, fileUpload, emailPost}

