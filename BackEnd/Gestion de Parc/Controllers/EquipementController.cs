using AccessData.Data;
using AccessData.Models;
using Gestion_de_Parc.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace Gestion_de_Parc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipementController : ControllerBase
    {
        private readonly DataContext EquipementContext;

        public EquipementController(DataContext dataContext)
        {
            this.EquipementContext = dataContext;
        }

        [Authorize(Roles = "Administrateur,Chef Service,Technicien")]
        [HttpGet]
        public async Task<IActionResult> GetEquipement()
        {
            var equipements = await EquipementContext.Equipement.ToListAsync();
            return Ok(equipements);
        }

        [Authorize(Roles = "Administrateur,Chef Service,Technicien")]
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Equipement([FromRoute] int id)
        {
            var equipement = await EquipementContext.Equipement.FirstOrDefaultAsync(x => x.Equipement_ID == id);

            if (equipement == null)
            {
                return NotFound();
            }
            return Ok(equipement);
        }

        [HttpGet("GetcountEquipement")]
        public async Task<IActionResult> GetEquipementCount()
        {
            var equipementcount = await EquipementContext.Equipement.CountAsync();
            return Ok(equipementcount);
        }

        [Authorize(Roles = "Administrateur,Chef Service,Technicien")]
        [HttpPost]
        public async Task<IActionResult> CreateEquipement([FromBody] Equipement equipe)
        {
            if (equipe == null)
                return BadRequest();

            //Check NumSérie
            if (await CheckNumSérieExistAsync(equipe.Num_Serie))
            {
                return BadRequest(new { Message = "NumSérie Already Exist!" });
            }

            await EquipementContext.Equipement.AddAsync(equipe);
            await EquipementContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "Equipement Ajouté!"
            });
        }

        [Authorize(Roles = "Administrateur,Chef Service,Technicien")]
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateEquipement([FromRoute] int id, [FromBody] Equipement equipe)
        {
            if (equipe == null)
                return BadRequest();

            var equipement = await EquipementContext.Equipement.FirstOrDefaultAsync(a => a.Equipement_ID == id);

            if (equipement != null)
            {
                equipement.Archivee = equipe.Archivee;
                equipement.Num_Serie = equipe.Num_Serie;
                equipement.ID_Type = equipe.ID_Type;
                equipement.Num_Marche = equipe.Num_Marche;
                equipement.ID_Caracteristique = equipe.ID_Caracteristique;
                await EquipementContext.SaveChangesAsync();

                return Ok(equipement);
            }
            else
            {
                return NotFound("Equipement not Found");
            }
        }

        [Authorize(Roles = "Administrateur,Chef Service,Technicien")]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            var equipement = await EquipementContext.Equipement.FirstOrDefaultAsync(a => a.Equipement_ID == id);

            if (equipement != null)
            {
                EquipementContext.Equipement.Remove(equipement);
                await EquipementContext.SaveChangesAsync();

                return Ok(equipement);
            }
            else
            {
                return NotFound("Employee not Found");
            }
        }

        private Task<bool> CheckNumSérieExistAsync(string numSérie)
          => EquipementContext.Equipement.AnyAsync(x => x.Num_Serie == numSérie);
    }
}
