using Microsoft.EntityFrameworkCore;
using PruebaTecnicaOrionTek.Server.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Client> Clients { get; set; }
    public DbSet<Address> Addresses { get; set; }
}
