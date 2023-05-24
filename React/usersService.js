import axios from "axios";

var usersService = {
    endpoint: "https://api.remotebootcamp.dev/api/users",
  }; 


  let logIn = (payload) => {
    const config = {
        method: "POST",
        url: usersService.endpoint + "/login",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    }
    console.log(payload)

    return axios(config)
};
  
  let register = (payload) => {
  
    const config = {
      method: "POST",
      url: usersService.endpoint + "/register",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let getCurrentUser = () => {
  
    const config = {
      method: "GET",
      url: usersService.endpoint + "/current",
    
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let getUserById = (id) => {
  
    const config = {
      method: "GET",
      url: usersService.endpoint + `/${id}`,
    
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };
  
  let logout = () => {
  
    const config = {
      method: "GET",
      url: usersService.endpoint + "/logout",
    
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  export { logIn, register, getCurrentUser, getUserById, logout}; // export all your calls here
