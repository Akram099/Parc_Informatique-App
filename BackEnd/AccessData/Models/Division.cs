using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Division
    {
        public int Division_ID { get; set; }
        public string Nom_Division { get; set; }
        public int SousDirection_ID { get; set; }
        public SousDirection SousDirections { get; set; }
        public ICollection<Service> Services { get;set; }
    }
}
