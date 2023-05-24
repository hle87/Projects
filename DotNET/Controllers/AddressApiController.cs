using EllipticCurve;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Addresses;
using Sabio.Models.Requests.Addresses;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/addresses")]
    [ApiController]
    public class AddressApiController : BaseApiController
    {
        private IAddressService _service = null;
        private IAuthenticationService<int> _authService = null;
        public AddressApiController(IAddressService service
            , ILogger<AddressApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        //API Controller depends on this Service ; this Service needs to be injeced in constructor of this 'class'
        {
            _service = service;
            _authService = authService;
        }

        // GET   api/addresses <- ROUTE ->
        [HttpGet("")]
        public ActionResult<ItemsResponse<Address>> GetAll()
        {

            int code = 200; 
            BaseResponse response = null; // DO NOT DECLARE AN INSTANCE

            try
            {
                List<Address> list = _service.GetRandomAddresses();


                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource Not Found.");
                }
                else
                {
                   response = new ItemsResponse<Address> { Items = list };
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


        // api/addresses/{id:int}
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Address>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Address anAddress = _service.Get(id);

                //ItemResponse<Address> response = new ItemResponse<Address>();
                //response.Item = anAddress;

                if (anAddress == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource Not Found.");
                }
                else
                {
                    response = new ItemResponse<Address> { Item = anAddress };
                }
            }

            catch (SqlException sqlEx)
            {
                iCode= 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
                base.Logger.LogError(sqlEx.ToString());

                /* return base.StatusCode(500, new ErrorResponse($"SqlException Error: {sqlEx.Message}")); */
                //new ErrorResponse(sqlEx.Message); -> this apparently works too
            }

            catch (ArgumentException argEx)
            {
                //I am have some other clean up code, or logging to do
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

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(AddressAddRequest model)
        {
            //The default response code in this instance is 201. 
            //BUT we do not need it because of what we do below in the try block
            //int iCode = 201;

            //we need this instead of the BaseResponse
            ObjectResult result = null;

            try
            {
                //The UserId is often needed in many operations. 
                int userId = _authService.GetCurrentUserId();

                //if this operation errors, it would generate an exception and jump to the catch
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };


                //This sets the status code for us but also set Url that points back to 
                // the Get By Id endpoint. Setting a Url in the Response (for a 201 Response code) is a common practice
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


        //[HttpPost] // this is the same =  [HttpPost("")] 
        //public ActionResult<ItemResponse<int>> Create(AddressAddRequest model)
        //{
        //   int userId = _authService.GetCurrentUserId();
        //    IUserAuthData user = _authService.GetCurrentUser();

        //    //of the new widget
        //    int id = _service.Add(model, userId);


        //    ItemResponse<int> response = new ItemResponse<int>();
        //    response.Item = id;

        //    return Ok(response);
        //}

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {

            int code = 200;
            BaseResponse response = null; // DO NOT DECLARE AN INSTANCE

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


        [HttpPut("{id:int}")] 
        public ActionResult<SuccessResponse> Update(AddressUpdateRequest model)
        {

            int code = 200;
            BaseResponse response = null;//

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
