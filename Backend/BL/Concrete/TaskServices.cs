using BL.Models;
using DAL.Models;
using DOMAIN.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Concrete
{
    public class TaskServices: ITaskServices
    {
        private readonly ITaskRepository _TaskRepository;
        private readonly SqlDbContext _context;
        public TaskServices(ITaskRepository TaskRepository)
        {
            _TaskRepository = TaskRepository;
            _context = new SqlDbContext();
        }

        public int CreateTask(DOMAIN.Models.Task task)
        {
            if (_context.UserRoles.Any(x => x.UserId == task.UserId && x.RoleId == 2))
                return _TaskRepository.Add(task);

            else
                return 0;
        }
    }
}
