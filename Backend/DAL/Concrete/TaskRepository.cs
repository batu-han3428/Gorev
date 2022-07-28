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

                int companiesId = context.Users.Where(x => x.Id == UserId).Select(x => x.Companies.Id).FirstOrDefault();

                //var dada = context.Documents.ToList();

                //foreach (var item in dada)
                //{
                //    var asdada = item.Data;
                //}

                tasksList1 = context.Tasks.Where(x => x.User.Companies.Id == companiesId).Include(x => x.User).ThenInclude(x => x.Companies).Include(x => x.Documents).Select(x => new ListTaskViewModel
                {
                    Assigned = x.User.Name,
                    Constituent = x.Constituent,
                    Title = x.Title,
                    Description = x.Description,
                    Priority = x.Priority,
                    Urgency = x.Urgency,
                    CompletionTime = x.CompletionTime,
                    DocumentViewModels = x.Documents.ToList()
                }).ToList();

               

                //foreach (var item in tasksList1)
                //{
                //    foreach (var item1 in item.DocumentViewModels)
                //    {
                //        var eedasda = item1.Name;
                //    }      
                //}

                //var veri = context.ListTask.FromSqlRaw<ListTask>("EXEC ListTask @UserId = {0}",UserId);

                //var veri1 = context.Tasks.FromSqlRaw<DOMAIN.Models.Task>($"EXEC ListTask @UserId = {UserId}").ToList();

                //tasksList = context.Tasks.Include(x => x.User).Include(x => x.Documents).Where(x => x.Id == UserId).ToList();


            }
            else
            {
                tasksList1 = context.Tasks.Where(x => x.UserId == UserId).Include(x => x.User).ThenInclude(x => x.Companies).Include(x => x.Documents).Select(x => new ListTaskViewModel
                {
                    Assigned = x.User.Name,
                    Constituent = x.Constituent,
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
