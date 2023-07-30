using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Equipement
    {
        public int Equipement_ID { get; set; }
        public string Archivee { get; set; }
        public string Num_Serie { get; set; }

        public int ID_Type { get; set; }
        public TypeEquipement TypeEquipements { get; set; }

        public int Num_Marche { get; set; }
        public Marché Marchés { get; set; }

        public int ID_Caracteristique { get; set; }
        public Caractéristique Caractéristiques { get; set; }

        public ICollection<Equipement_Fonctionnaire> EquipementFonctionnaire { get; set; }
        public ICollection<Equipement_Bureau> EquipementBureau { get; set; }
    }
}
