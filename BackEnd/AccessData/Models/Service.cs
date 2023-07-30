using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Service
    {
        public int Service_ID { get; set; }
        public string Nom_Service { get; set; }

        public int Division_ID { get; set; }
        public Division Divisions { get; set; }

        public ICollection<Fonctionnaire> Fonctionnaires { get; set; }
    }
}
