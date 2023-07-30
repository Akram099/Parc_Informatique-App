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
    public class CaractéristiqueController : ControllerBase
    {
        private readonly DataContext CaractéristiqueContext;

        public CaractéristiqueController(DataContext dataContext)
        {
            this.CaractéristiqueContext = dataContext;
        }

        [Authorize(Roles = "Administrateur,Chef Service, Technicien")]
        [HttpGet]
        public async Task<IActionResult> GetCaractére()
        {
            var caractéristiques = await CaractéristiqueContext.Caractéristique.ToListAsync();
            return Ok(caractéristiques);
        }
    }
}
