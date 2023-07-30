using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Requete
    {
        public int Num_Identification { get; set; }

        [RegularExpression("^(Soft|Hard)$")]
        public string Description { get; set; }

        public DateTime date_prise_en_charge { get; set; } = DateTime.Now;
        public DateTime? date_cloture { get; set; }

        [RegularExpression("^(Initiale|En cours|Assigné|Fait|Clôturé)$")]
        public string Etat_Requete { get; set; }

        public int Administrateur_ID { get; set; }
        public Fonctionnaire Fonctionnaire_admin { get; set; }

        public int Technicien_ID { get; set; }
        public Fonctionnaire Fonctionnaire_tech { get; set; }

        public int Fonctionnaire_ID { get; set; }
        public Fonctionnaire Fonctionnaire_fonc { get; set; }
    }
}
