using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class SousDirection
    {
        public int SousDirection_ID { get; set; }
        public string Nom_SousDirection { get; set; }

        public ICollection<Division> Divisions { get; set; }
    }
}
