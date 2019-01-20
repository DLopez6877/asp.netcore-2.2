using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto dto)
        {
            dto.Username = dto.Username.ToLower();
            if (await _authRepository.UserExists(dto.Username))
                return BadRequest("Username already exists.");

            var userToCreate = new User
            {
                Username = dto.Username
            };

            var createdUser = await _authRepository.Register(userToCreate, dto.Password);

            return StatusCode(201);
        }

    }
}