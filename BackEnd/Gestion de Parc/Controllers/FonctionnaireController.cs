using AccessData.Data;
using AccessData.Models;
using Gestion_de_Parc.Helpers;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace Gestion_de_Parc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FonctionnaireController : ControllerBase
    {
        private readonly DataContext FonctionnaireContext;

        public FonctionnaireController(DataContext dataContext)
        {
            this.FonctionnaireContext = dataContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Fonctionnaire userobj)
        {
            if (userobj == null)
                return BadRequest();

            var user = await FonctionnaireContext.Fonctionnaire.FirstOrDefaultAsync(x => x.Username == userobj.Username);

            if (user == null)
                return NotFound(new { Message = "User Not Found !" });

            if (!PasswordHasher.VerifyPassword(userobj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }

            user.Token = CreateJwt(user);

            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success !"
            });
        }

        [Authorize(Roles = "Administrateur")]
        [HttpGet]
        public async Task<IActionResult> GetEmployee()
        {
            var fonctionnaires = await FonctionnaireContext.Fonctionnaire.ToListAsync();
            return Ok(fonctionnaires);
        }


        [Authorize(Roles = "Administrateur")]
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Employee([FromRoute] int id)
        {
            var employee = await FonctionnaireContext.Fonctionnaire.FirstOrDefaultAsync(x => x.Fonctionnaire_ID == id);

            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpGet("GetcountFonctionnaire")]
        public async Task<IActionResult> GetFonctionnaireCount()
        {
            var fonctionnairecount = await FonctionnaireContext.Fonctionnaire.CountAsync();
            return Ok(fonctionnairecount);
        }

        [Authorize(Roles = "Administrateur")]
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] Fonctionnaire fonc)
        {
            if (fonc == null)
                return BadRequest();

            //Check username
            if (await CheckUserNameExistAsync(fonc.Username))
            {
                return BadRequest(new { Message = "Username Already Exist!" });
            }

            //Check Email
            if (await CheckEmailExistAsync(fonc.Email))
            {
                return BadRequest(new { Message = "Email Already Exist!" });
            }

            //Check Password Strength
            var pass = CheckPasswordStrength(fonc.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass.ToString() });
            }

            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("directionbudget8@gmail.com"));
            email.To.Add(MailboxAddress.Parse(fonc.Email));
            email.Subject = "L'Ajout du Fonctionnaire";
            email.Body = new TextPart("plain")
            {
                Text = $"Cher fonctionnaire,\n\nVous avez été enregistré avec succès. Voici vos informations de connexion :\n\nNom d'utilisateur : {fonc.Username}\nMot de passe : {fonc.Password}"
            };

            SmtpClient smtp = new SmtpClient();
            smtp.ServerCertificateValidationCallback = (sender, certificate, chain, errors) => true;
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.Auto);
            smtp.Authenticate("directionbudget8@gmail.com", "oxfgmciruoxuaehh");
            smtp.Send(email);
            smtp.Disconnect(true);

            fonc.Password = PasswordHasher.HashPassword(fonc.Password);
            fonc.Token = "";
            await FonctionnaireContext.Fonctionnaire.AddAsync(fonc);
            await FonctionnaireContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "Fonctionnaire Ajouté!"
            });
        }

        [Authorize(Roles = "Administrateur")]
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] int id, [FromBody] Fonctionnaire fonc)
        {
            if (fonc == null)
                return BadRequest();

            ////Check username
            //if (await CheckUserNameExistAsync(fonc.Username))
            //{
            //    return BadRequest(new { Message = "Username Already Exist!" });
            //}

            ////Check Email
            //if (await CheckEmailExistAsync(fonc.Email))
            //{
            //    return BadRequest(new { Message = "Email Already Exist!" });
            //}

            ////Check Password Strength
            //var pass = CheckPasswordStrength(fonc.Password);
            //if (!string.IsNullOrEmpty(pass))
            //{
            //    return BadRequest(new { Message = pass.ToString() });
            //}

            var fonctionnaire = await FonctionnaireContext.Fonctionnaire.FirstOrDefaultAsync(a => a.Fonctionnaire_ID == id);

            if (fonctionnaire != null)
            {

                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("directionbudget8@gmail.com"));
                email.To.Add(MailboxAddress.Parse(fonc.Email));
                email.Subject = "Modification du Fonctionnaire";
                email.Body = new TextPart("plain")
                {
                    Text = $"Cher fonctionnaire,\n\nVous avez été enregistré avec succès. Voici vos NOUVELLES informations de connexion :\n\nNom d'utilisateur : {fonc.Username}\nMot de passe : {fonc.Password}"
                };

                SmtpClient smtp = new SmtpClient();
                smtp.ServerCertificateValidationCallback = (sender, certificate, chain, errors) => true;
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.Auto);
                smtp.Authenticate("directionbudget8@gmail.com", "lqmfcexiohsjhdos");
                smtp.Send(email);
                smtp.Disconnect(true);

                fonctionnaire.Nom = fonc.Nom;
                fonctionnaire.Prenom = fonc.Prenom;
                fonctionnaire.Username = fonc.Username;
                fonctionnaire.Password = PasswordHasher.HashPassword(fonc.Password);
                fonctionnaire.Email = fonc.Email;
                fonctionnaire.Telephone = fonc.Telephone;
                fonctionnaire.Role = fonc.Role;
                fonctionnaire.Service_ID = fonc.Service_ID;
                await FonctionnaireContext.SaveChangesAsync();
                return Ok(fonctionnaire);
            }
            else
            {
                return NotFound("Employee not Found");
            }
        }

        [Authorize(Roles = "Administrateur")]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            var fonctionnaire = await FonctionnaireContext.Fonctionnaire.FirstOrDefaultAsync(a => a.Fonctionnaire_ID == id);

            if (fonctionnaire != null)
            {
                FonctionnaireContext.Fonctionnaire.Remove(fonctionnaire);
                await FonctionnaireContext.SaveChangesAsync();

                return Ok(fonctionnaire);
            }
            else
            {
                return NotFound("Employee not Found");
            }
        }

        [HttpGet("GetAllAdmin")]
        public async Task<IActionResult> GetAllAdmin(string name)
        {
            var ad = await FonctionnaireContext.Fonctionnaire.Where(emp => emp.Role == name).ToListAsync();
            return Ok(ad);
        }
        
        private Task<bool> CheckUserNameExistAsync(string username)
            => FonctionnaireContext.Fonctionnaire.AnyAsync(x => x.Username == username);
        private Task<bool> CheckEmailExistAsync(string email)
            => FonctionnaireContext.Fonctionnaire.AnyAsync(x => x.Email == email);
        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain speial Chars" + Environment.NewLine);
            return sb.ToString();
        }

        private string CreateJwt(Fonctionnaire user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("this is my custom Secret key for authentication");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Fonctionnaire_ID.ToString()),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name,$"{user.Prenom} {user.Nom}")
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
