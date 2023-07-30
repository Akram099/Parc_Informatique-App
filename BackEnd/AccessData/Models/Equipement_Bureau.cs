using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Equipement_Bureau
    {
        public int Equipement_ID { get; set; }
        public int Bureau_ID { get; set; }
        public Equipement Equipements { get; set; }
        public Bureau Bureaux { get; set; }
    }
}
