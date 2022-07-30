using DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ViewModels
{
    public class ListCompaniesViewModel
    {
        [Column("Companies_Id")]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
