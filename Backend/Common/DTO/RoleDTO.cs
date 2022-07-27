using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO
{
    public class RoleDTO
    {
        public string Name { get; set; }
        public ICollection<UserRoleDTO> UserRoles { get; set; }
    }
}
