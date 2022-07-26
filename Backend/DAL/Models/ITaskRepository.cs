﻿using Common.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public interface ITaskRepository : IBaseRepository<DOMAIN.Models.Task>
    {
        List<ListTaskViewModel> ListTask(int UserId);
    }
}
