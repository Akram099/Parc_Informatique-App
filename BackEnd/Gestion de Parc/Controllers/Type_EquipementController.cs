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
    public class Type_EquipementController : ControllerBase
    {
        private readonly DataContext Type_EquipementContext;

        public Type_EquipementController(DataContext dataContext)
        {
            this.Type_EquipementContext = dataContext;
        }

        [Authorize(Roles = "Administrateur,Chef Service,Technicien")]
        [HttpGet]
        public async Task<IActionResult> GetTypeEquipement()
        {
            var type_equipements = await Type_EquipementContext.TypeEquipement.ToListAsync();
            return Ok(type_equipements);
        }
    }
}
