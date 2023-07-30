using AccessData.Data;
using AccessData.Models;
using Gestion_de_Parc.Helpers;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using Org.BouncyCastle.Asn1.X500;
using System;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace Gestion_de_Parc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequeteController : ControllerBase
    {
        private readonly DataContext dataDbContext;

        public RequeteController(DataContext dataContext)
        {
            this.dataDbContext = dataContext;
        }

        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpGet]
        public async Task<IActionResult> GetRequete()
        {
            var requetes = await dataDbContext.Requete.ToListAsync();
            return Ok(requetes);
        }

        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpGet]
        [Route("get/{id}")]
        public async Task<IActionResult> Requete([FromRoute] int id)
        {
            var requ = await dataDbContext.Requete.FirstOrDefaultAsync(x => x.Num_Identification == id);

            if (requ == null)
            {
                return NotFound();
            }
            return Ok(requ);
        }

        [HttpGet]
        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> Requete(string role, int id)
        {
            // Vérifier si l'"id" est valide dans la base de données
            bool idIsValid = await dataDbContext.Fonctionnaire.AnyAsync(u => u.Fonctionnaire_ID == id);

            // Vérifier si le "role" est valide dans la base de données
            bool roleIsValid = await dataDbContext.Fonctionnaire.AnyAsync(r => r.Role == role);

            if (!roleIsValid || !idIsValid)
            {
                return BadRequest("Invalid role or id.");
            }
            // Vérifier si l'utilisateur avec l'"id" donné a effectivement le rôle spécifié
            bool userHasRole = await dataDbContext.Fonctionnaire.AnyAsync(ur => ur.Fonctionnaire_ID == id && ur.Role == role);

            if (!userHasRole)
            {
                return BadRequest("The user does not have the specified role.");
            }


            if (role == "Administrateur" || role == "Chef Service")
            {
                var Res1 = await dataDbContext.Requete.ToListAsync();
                return Ok(Res1);
            }
            else if (role == "Technicien")
            {
                var Res2 = await dataDbContext.Requete.Where(emp => emp.Technicien_ID == id).ToListAsync();
                return Ok(Res2);
            }
            else if (role == "Fonctionnaire")
            {
                var Res3 = await dataDbContext.Requete.Where(emp => emp.Fonctionnaire_ID == id).ToListAsync();
                return Ok(Res3);
            }
            else
            {
                return BadRequest("Invalid");
            }
        }

        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpPost]
        public async Task<IActionResult> CreateRequete([FromBody] Requete requ)
        {
            if (requ == null)
                return BadRequest();
            requ.Etat_Requete = "Initiale";

            var tech = await dataDbContext.Fonctionnaire.FirstOrDefaultAsync(a => a.Fonctionnaire_ID == requ.Technicien_ID);

            await dataDbContext.Requete.AddAsync(requ);
            await dataDbContext.SaveChangesAsync();
            
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("directionbudget8@gmail.com\r\n"));
            email.To.Add(MailboxAddress.Parse(tech.Email));
            email.Subject = "Panne Affectée";
            email.Body = new TextPart("plain")
            {
                Text = $"Cher technicien,\n\nVous avez été affecté à une panne. Voici les détails :\n\n" +
                $"Numéro de panne : {requ.Num_Identification}\n" +
                $"Description de la panne : {requ.Description}\n" +
                $"Date de prise en charge : {requ.date_prise_en_charge}\n" +
                       $"État de la panne : {requ.Etat_Requete}\n" +
                       // Ajoutez d'autres détails pertinents ici
                       $"Vous pouvez maintenant commencer à travailler sur la résolution de cette panne.\n" +
                       $"Merci pour votre collaboration."
            };


            SmtpClient smtp = new SmtpClient();
            smtp.ServerCertificateValidationCallback = (sender, certificate, chain, errors) => true;
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.Auto);
            smtp.Authenticate("directionbudget8@gmail.com\r\n", "oxfgmciruoxuaehh\r\n");
            smtp.Send(email);
            smtp.Disconnect(true);
            

            return Ok(new
            {
                Message = "Requete Ajouté!"
            });
        }

        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpPut]
        [Route("updateRequete/{id:int}")]
        public async Task<IActionResult> UpdateRequete([FromRoute] int id, [FromBody] Requete requ)
        {
            if (requ == null)
                return BadRequest();

            var requete = await dataDbContext.Requete.FirstOrDefaultAsync(a => a.Num_Identification == id);

            if (requete != null)
            {
                requete.Description = requ.Description;
                requete.date_prise_en_charge = requ.date_prise_en_charge;
                requete.date_cloture = requ.date_cloture;
                requete.Etat_Requete = requ.Etat_Requete;
                requete.Administrateur_ID = requ.Administrateur_ID;
                requete.Technicien_ID = requ.Technicien_ID;
                requete.Fonctionnaire_ID = requ.Fonctionnaire_ID;
                await dataDbContext.SaveChangesAsync();

                return Ok(requete);
            }
            else
            {
                return NotFound("Requete not Found");
            }
        }

        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            var requ = await dataDbContext.Requete.FirstOrDefaultAsync(a => a.Num_Identification == id);

            if (requ != null)
            {
                dataDbContext.Requete.Remove(requ);
                await dataDbContext.SaveChangesAsync();

                return Ok(requ);
            }
            else
            {
                return NotFound("Employee not Found");
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Updatedatecloture(string etat, int id)
        {

            var Requete = await dataDbContext.Requete.FirstOrDefaultAsync(a => a.Num_Identification == id);
            if (Requete != null)
            {
                Requete.Etat_Requete = etat;
                if (etat == "Clôturé")
                {
                    Requete.date_cloture = DateTime.Now;
                }

                await dataDbContext.SaveChangesAsync();

                return Ok("Date Cloture Ajouté!");

            }
            else
            {
                return NotFound("Requete not Found");
            }

        }

        [HttpGet("GetcountReqClôturé")]
        public async Task<IActionResult> GetRequeteCountCL()
        {
            var requeteCount = await dataDbContext.Requete.Where(emp => emp.Etat_Requete == "Clôturé").CountAsync();
            return Ok(requeteCount);
        }

        [HttpGet("GetcountReqnotClôturé")]
        public async Task<IActionResult> GetRequeteCountnotC()
        {
            var requeteCount = await dataDbContext.Requete.Where(emp => emp.Etat_Requete != "Clôturé").CountAsync();
            return Ok(requeteCount);
        }

    }
}
