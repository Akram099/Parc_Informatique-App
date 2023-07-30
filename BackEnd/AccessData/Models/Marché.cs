using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Marché
    {
        public int Num_Marche { get; set; }
        public DateTime date_marche { get; set; }
        public DateTime date_reception { get; set; }
        public string Fournisseur { get; set; }

        public ICollection<Equipement> Equipements { get; set; }

    }
}
