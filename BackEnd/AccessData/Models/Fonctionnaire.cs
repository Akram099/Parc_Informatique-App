using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Fonctionnaire
    {
        [Key]
        public int Fonctionnaire_ID { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }

        public int Service_ID { get; set; }
        public Service Services { get; set; }

        public ICollection<Bureau> Bureaux { get; set; }
        public ICollection<Requete> Requetes { get; set; }
        public ICollection<Equipement_Fonctionnaire> Equipement_Fonctionnaire { get; set; }

    }
}
