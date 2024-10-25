using PruebaTecnicaOrionTek.Server.Models;

namespace PruebaTecnicaOrionTek.Server.Repository
{
    public interface IClientRepository
    {
        List<Client> GetAllClients();
        Client GetClientById(int id);
        void AddClient(Client client);
        void UpdateClient(Client client);
        void RemoveClient(int id);
        List<Address> GetAddressesByClientId(int clientId);
        void AddAddressToClient(int clientId, Address address);
    }
}
