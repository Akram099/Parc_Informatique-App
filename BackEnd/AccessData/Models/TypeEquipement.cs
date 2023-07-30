using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class TypeEquipement
    {
        public int ID_Type { get; set; }
        public string nom_Type { get; set; }

        public ICollection<Equipement> Equipements { get; set; }
    }
}
