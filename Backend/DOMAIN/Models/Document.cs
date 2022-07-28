using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Models
{
    public class Document
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public DOMAIN.Models.Task Task { get; set; } 
        public string Name { get; set; }
        public Byte[] Data { get; set; }
    }
}
