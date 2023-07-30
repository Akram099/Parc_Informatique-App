using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Caractéristique
    {
        public int ID_Caracteristique { get; set; }
        public string CPU { get; set; }
        public string Memoire_RAM { get; set; }
        public string Disque_dur { get; set; }
        public string Vitesse { get; set; }

        public ICollection<Equipement> Equipements { get; set; }
    }
}
