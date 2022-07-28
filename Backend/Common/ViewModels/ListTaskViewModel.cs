using DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ViewModels
{
    public class ListTaskViewModel
    {
        public string Assigned { get; set; }
        public int Constituent { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Priority { get; set; }
        public bool Urgency { get; set; }
        public DateTime CompletionTime { get; set; }
        public List<Document>? DocumentViewModels { get; set; }
    }
}
