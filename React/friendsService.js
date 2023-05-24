import axios from "axios";

var friendsService = {
    endpoint: "https://localhost:50001/api/v3/friends",
  }; 


let getFriends = (pageIndex, pageSize) => {
  
    const config = {
      method: "GET",
      //url: `${friendsService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      url: friendsService.endpoint + `/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let deleteFriendById = (id) => {
    console.log("DEL ajax call executing", id)
    const config = {
      method: "DELETE",
      url: friendsService.endpoint + `/${id}`,
      
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(()=>{
      return id
    });
  };

  let addFriend = (payload) => {
  
    const config = {
      method: "POST",
      url: friendsService.endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let getFriendById = (id) => {
  
    const config = {
      method: "GET",
      url: friendsService.endpoint + `/${id}`,
    
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let editFriendById = (id , payload) => {
  
    const config = {
      method: "PUT",
      url: friendsService.endpoint + `/${id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };


  let searchFriend = (pageIndex, pageSize, query) => {
   console.log(pageIndex, pageSize, query)
      const config = {
        method: "GET",
        url: friendsService.endpoint + `/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
    };



  export {getFriends , deleteFriendById, addFriend, getFriendById, editFriendById, searchFriend }