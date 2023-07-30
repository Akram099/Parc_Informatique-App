using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Models
{
    public class Bureau
    {
        [Key]
        public int Bureau_ID { get; set; }

        public int Numéro_Bureau { get; set; }

        [RegularExpression("^(Batiment principale|Batiment annexe)$")]
        public string Batiment { get; set; }

        public int Fonctionnaire_ID { get; set; }
        public Fonctionnaire Fonctionnaires { get; set; }

        public ICollection<Equipement_Bureau> EquipementBureau { get; set; }

    }
}
