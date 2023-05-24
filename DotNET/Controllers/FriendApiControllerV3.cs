using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models.Domain.Friends;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using Sabio.Models;
using Sabio.Models.Requests.Friends;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/v3/friends")]
    [ApiController]
    public class FriendApiControllerV3 : BaseApiController
    {
        private IFriendService _service = null;
        private IAuthenticationService<int> _authService = null;

        public FriendApiControllerV3(IFriendService service
            , ILogger<FriendApiControllerV3> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }



        [HttpGet]
        public ActionResult<ItemResponse<FriendV3>> GetAllV3()
        {

            int code = 200;
            BaseResponse response = null; // DO NOT DECLARE AN INSTANCE

            try
            {
                List<FriendV3> list = _service.GetAllV3();


                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource Not Found.");
                }
                else
                {
                    response = new ItemsResponse<FriendV3> { Items = list };
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

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<FriendV3>>> PaginationV3(int pageIndex, int pageSize) 
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<FriendV3> paged = _service.PaginationV3(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records Not Found");
                }
                else
                {

                    response = new ItemResponse<Paged<FriendV3>> { Item = paged };
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


        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<FriendV3>>> SearchPaginatedV2(int page, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<FriendV3> paged = _service.SearchPaginatedV3(page, pageSize, query);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<FriendV3>>() { Item = paged };
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
        public ActionResult<ItemResponse<FriendV3>> GetV3(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                FriendV3 friend = _service.GetV3(id);


                if (friend == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("No Records Found.");
                }
                else
                {
                    response = new ItemResponse<FriendV3> { Item = friend };
                }
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
        public ActionResult<SuccessResponse> DeleteV3(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteV3(id);
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
        public ActionResult<ItemResponse<int>> Create(FriendAddRequestV3 model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddV3(model, userId);
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
        public ActionResult<SuccessResponse> Update(FriendUpdateRequestV3 model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateV3(model, userId);
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
