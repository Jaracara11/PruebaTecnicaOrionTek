using PruebaTecnicaOrionTek.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PruebaTecnicaOrionTek.Server.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly AppDbContext _context;

        public ClientRepository(AppDbContext context) => _context = context;

        public List<Client> GetAllClients() => _context.Clients.Include(c => c.Addresses).ToList();

        public Client GetClientById(int id) => _context.Clients.Include(c => c.Addresses).FirstOrDefault(c => c.Id == id);

        public void AddClient(Client client)
        {
            _context.Clients.Add(client);
            _context.SaveChanges();
        }

        public void UpdateClient(Client client)
        {
            _context.Clients.Update(client);
            _context.SaveChanges();
        }

        public void RemoveClient(int id)
        {
            var client = _context.Clients.Find(id);
            if (client != null)
            {
                _context.Clients.Remove(client);
                _context.SaveChanges();
            }
        }

        public List<Address> GetAddressesByClientId(int clientId)
        {
            return _context.Addresses.Where(a => a.ClientId == clientId).ToList();
        }

        public void AddAddressToClient(int clientId, Address address)
        {
            var client = _context.Clients.Find(clientId);
            if (client != null)
            {
                client.Addresses.Add(address);
                _context.SaveChanges();
            }
        }
    }
}