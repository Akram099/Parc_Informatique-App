using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Equipement_Fonctionnaire
    {
        public int Equipement_ID { get; set; }
        public int Fonctionnaire_ID { get; set; }
        public Equipement Equipements { get; set; }
        public Fonctionnaire Fonctionnaires { get; set; }
    }
}
