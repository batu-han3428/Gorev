using Common.ViewModels;
using DAL.Models;
using DOMAIN.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Concrete
{
    public class TaskRepository : BaseRepository<DOMAIN.Models.Task>, ITaskRepository
    {
       public List<ListTaskViewModel> ListTask(int UserId)
        {

            List<ListTaskViewModel> tasksList1;

            if (context.UserRoles.Any(x => x.UserId == UserId && x.RoleId == 2))
            {

                int companiesId = context.Users.Where(x => x.Id == UserId && x.Companies.Id != null).Select(x => x.Companies.Id).FirstOrDefault();

                if(companiesId != null)
                {
                    tasksList1 = context.Tasks.Where(x => x.User.Companies.Id == companiesId).Include(x => x.User).ThenInclude(x => x.Companies).Include(x => x.Documents).Select(x => new ListTaskViewModel
                    {
                        Assigned = x.User.Name,
                        Constituent = context.Users.Where(c => c.Id == x.Constituent && x.User.Companies.Id == companiesId).Select(v => v.Name).FirstOrDefault(),
                        Title = x.Title,
                        Description = x.Description,
                        Priority = x.Priority,
                        Urgency = x.Urgency,
                        CompletionTime = x.CompletionTime,
                        DocumentViewModels = x.Documents.ToList()
                    }).ToList();
                }

                return null;

            }
            else
            {
                tasksList1 = context.Tasks.Where(x => x.UserId == UserId).Include(x => x.User).ThenInclude(x => x.Companies).Include(x => x.Documents).Select(x => new ListTaskViewModel
                {
                    Id = x.Id,
                    Assigned = x.User.Name,
                    Constituent = context.Users.Where(c => c.Id == x.Constituent).Select(v => v.Name).FirstOrDefault(),
                    Title = x.Title,
                    Description = x.Description,
                    Priority = x.Priority,
                    Urgency = x.Urgency,
                    CompletionTime = x.CompletionTime,
                    DocumentViewModels = x.Documents.ToList()
                }).ToList();
            }

            return tasksList1;
        }
    }
}
