using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Models
{
    public class Task
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Priority { get; set; }
        public bool Urgency { get; set; }
        public int Constituent { get; set; }
        public DateTime CompletionTime { get; set; }
        public List<Document> Documents { get; set; }
    }
}
