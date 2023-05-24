using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IUserServiceV1
    {
        void Update(UserUpdateRequest model);
        int Add(UserAddRequest model);
        User Get(int id);
        List<User> GetAll();
        void Delete(int id);
    }
}
