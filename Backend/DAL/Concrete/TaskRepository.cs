﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Concrete
{
    public class TaskRepository : BaseRepository<DOMAIN.Models.Task>, ITaskRepository
    {
       
    }
}
