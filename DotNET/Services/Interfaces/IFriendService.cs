using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IFriendService
    {
        #region -FRIEND CRUD V1-
        void Update(FriendUpdateRequest model, int userId);
        int Add(FriendAddRequest model, int userId);
        Friend Get(int id);
        List<Friend> GetAll();

        void Delete(int id);
        Paged<Friend> GetByPagination(int page, int pageSize);
        #endregion

        #region -FRIEND CRUD V2-
        void UpdateV2(FriendUpdateRequestV2 model, int userId);
        int AddV2(FriendAddRequestV2 model, int userId);
        FriendV2 GetV2(int id);
        List<FriendV2> GetAllV2();

        void DeleteV2(int id);
        Paged<FriendV2> PaginationV2(int page, int pageSize);

        Paged<FriendV2> SearchPaginatedV2(int page, int pageSize, string query);
        #endregion


        #region -FRIEND CRUD V3-
        void UpdateV3(FriendUpdateRequestV3 model, int userId);
        int AddV3(FriendAddRequestV3 model, int userId);
        FriendV3 GetV3(int id);
        List<FriendV3> GetAllV3();

        void DeleteV3(int id);
        Paged<FriendV3> PaginationV3(int page, int pageSize);

        Paged<FriendV3> SearchPaginatedV3(int page, int pageSize, string query);
        #endregion
    }
}
