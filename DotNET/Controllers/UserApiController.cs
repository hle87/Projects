using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Sabio.Services;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using Sabio.Models.Domain.Users;
using Sabio.Web.Controllers;
using Sabio.Services.Interfaces;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using Sabio.Models.Requests.Users;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController
    {
        private IUserServiceV1 _service = null;
        private IAuthenticationService<int> _authService = null;

        public UserApiController(IUserServiceV1 service
            , ILogger<UserApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        // GET   api/addresses <- ROUTE ->
        [HttpGet]
        public ActionResult<ItemsResponse<User>> GetAll()
        {

            int code = 200;
            BaseResponse response = null; // DO NOT DECLARE AN INSTANCE

            try
            {
                List<User> list = _service.GetAll();


                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource Not Found.");
                }
                else
                {
                    response = new ItemsResponse<User> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<User>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                User aUser = _service.Get(id);


                if (aUser == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource Not Found.");
                }
                else
                {
                    response = new ItemResponse<User> { Item = aUser };
                }
            }

            catch (SqlException sqlEx)
            {
                iCode = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
                base.Logger.LogError(sqlEx.ToString());
            }

            catch (ArgumentException argEx)
            {
                iCode = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }

            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse>Update(UserUpdateRequest model) 
        {
            int code = 200;
            BaseResponse response = null;

            try 
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex) 
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }

}
