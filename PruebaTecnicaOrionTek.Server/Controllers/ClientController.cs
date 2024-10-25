using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaOrionTek.Server.Models;
using PruebaTecnicaOrionTek.Server.Repository;

namespace PruebaTecnicaOrionTek.Server.Controllers
{
    [ApiController]
    [Route("api/client")]
    public class ClientsController : ControllerBase 
    {
        private readonly IClientRepository _clientRepository;

        public ClientsController(IClientRepository clientRepository) 
        {
            _clientRepository = clientRepository;
        }

        [HttpGet]
        public ActionResult<List<Client>> GetClients()
        {
            return _clientRepository.GetAllClients();
        }

        [HttpGet("{id}")]
        public ActionResult<Client> GetClient(int id)
        {
            var client = _clientRepository.GetClientById(id);
            if (client == null)
            {
                return NotFound();
            }
            return client;
        }

        [HttpGet("{id}/addresses")]
        public ActionResult<List<Address>> GetAddressesByClientId(int id)
        {
            var addresses = _clientRepository.GetAddressesByClientId(id);
            return addresses ?? new List<Address>(); 
        }

        [HttpPost]
        public ActionResult<Client> CreateClient(Client client)
        {
            _clientRepository.AddClient(client);
            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateClient(int id, Client client)
        {
            if (id != client.Id)
            {
                return BadRequest();
            }
            _clientRepository.UpdateClient(client);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteClient(int id)
        {
            _clientRepository.RemoveClient(id);
            return NoContent();
        }

        [HttpPost("{id}/addresses")]
        public IActionResult AddAddress(int id, Address address)
        {
            _clientRepository.AddAddressToClient(id, address);
            return NoContent();
        }
    }
}
