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
    public class MarchéController : ControllerBase
    {
        private readonly DataContext MarchéContext;

        public MarchéController(DataContext dataContext)
        {
            this.MarchéContext = dataContext;
        }

        [Authorize(Roles = "Administrateur,Chef Service,Technicien")]
        [HttpGet]
        public async Task<IActionResult> GetMarché()
        {
            var marchés = await MarchéContext.Marché.ToListAsync();
            return Ok(marchés);
        }
        
        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Marché([FromRoute] int id)
        {
            var marché = await MarchéContext.Marché.FirstOrDefaultAsync(x => x.Num_Marche == id);

            if (marché == null)
            {
                return NotFound();
            }
            return Ok(marché);
        }

        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpPost]
        public async Task<IActionResult> CreateMarché([FromBody] Marché marché)
        {
            if (marché == null)
                return BadRequest();

            await MarchéContext.Marché.AddAsync(marché);
            await MarchéContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "Marché Ajouté!"
            });
        }

        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateMarché([FromRoute] int id, [FromBody] Marché mar)
        {
            if (mar == null)
                return BadRequest();

            var marché = await MarchéContext.Marché.FirstOrDefaultAsync(a => a.Num_Marche == id);

            if (marché != null)
            {
                marché.date_marche = mar.date_marche;
                marché.date_reception = mar.date_reception;
                marché.Fournisseur = mar.Fournisseur;
                await MarchéContext.SaveChangesAsync();

                return Ok(marché);
            }
            else
            {
                return NotFound("Marché not Found");
            }
        }

        [Authorize(Roles = "Administrateur,Chef Service")]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteMarché([FromRoute] int id)
        {
            var marché = await MarchéContext.Marché.FirstOrDefaultAsync(a => a.Num_Marche == id);

            if (marché != null)
            {
                MarchéContext.Marché.Remove(marché);
                await MarchéContext.SaveChangesAsync();

                return Ok(marché);
            }
            else
            {
                return NotFound("Marché not Found");
            }
        }
    }
}
