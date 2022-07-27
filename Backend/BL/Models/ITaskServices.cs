using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public interface ITaskServices
    {
        int CreateTask(DOMAIN.Models.Task task);
    }
}
