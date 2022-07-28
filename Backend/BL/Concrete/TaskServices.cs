using BL.Models;
using Common.ViewModels;
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

        public Tuple<int, string, string> CreateTask(DOMAIN.Models.Task task)
        {
            if (_context.UserRoles.Any(x => x.UserId == task.UserId && x.RoleId == 2))
                return new Tuple<int, string, string>(_TaskRepository.Add(task), _context.Users.Where(x=>x.Id == task.Constituent).Select(x=>x.Name).FirstOrDefault().ToString(), _context.Users.Where(x => x.Id == task.UserId).Select(x => x.Email).FirstOrDefault().ToString());
            else
                return new Tuple<int ,string, string>(0, "", "");
        }
    }
}
