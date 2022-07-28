using Common.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public interface ITaskServices
    {
        Tuple<int, string, string> CreateTask(DOMAIN.Models.Task task);
        List<ListTaskViewModel> ListTask(int UserId);
    }
}
