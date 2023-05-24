using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models.Domain.Friends;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using Sabio.Models.Requests.Friends;
using Sabio.Models;
using System.Data.SqlClient;
using Sabio.Web.Models;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/v2/friends")]
    [ApiController]
    public class FriendApiControllerV2 : BaseApiController
    {
        private IFriendService _service = null;
        private IAuthenticationService<int> _authService = null;

        public FriendApiControllerV2(IFriendService service
            , ILogger<FriendApiControllerV2> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpGet]
        public ActionResult<ItemResponse<FriendV2>> GetAllV2()
        {

            int code = 200;
            BaseResponse response = null; // DO NOT DECLARE AN INSTANCE

            try
            {
                List<FriendV2> list = _service.GetAllV2();


                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource Not Found.");
                }
                else
                {
                    response = new ItemsResponse<FriendV2> { Items = list };
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
        public ActionResult<ItemResponse<Paged<FriendV2>>> PaginationV2(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
         
            try
            {
                Paged<FriendV2> paged = _service.PaginationV2(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<FriendV2>>() { Item = paged };
                    
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
        public ActionResult<ItemResponse<Paged<FriendV2>>> SearchPaginatedV2(int page, int pageSize, string query)
        {
            ActionResult result = null;
            try
            {
                Paged<FriendV2> paged = _service.SearchPaginatedV2(page, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<FriendV2>> response = new ItemResponse<Paged<FriendV2>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.ToString()));
            }
            return result;
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<FriendV2>> GetV2(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                FriendV2 friend = _service.GetV2(id);


                if (friend == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("No Records Found.");
                }
                else
                {
                    response = new ItemResponse<FriendV2> { Item = friend };
                }
            }

            //catch (SqlException sqlEx)
            //{
            //    iCode = 500;
            //    response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            //    base.Logger.LogError(sqlEx.ToString());
            //}

            //catch (ArgumentException argEx)
            //{
            //    iCode = 500;
            //    response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            //}

            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteV2(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteV2(id);
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
        public ActionResult<ItemResponse<int>> Create(FriendAddRequestV2 model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddV2(model, userId);
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
        public ActionResult<SuccessResponse> Update(FriendUpdateRequestV2 model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateV2(model, userId);
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

