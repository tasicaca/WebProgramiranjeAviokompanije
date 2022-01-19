using Microsoft.EntityFrameworkCore;

namespace Aviokompanija.Models
{
    public class AviokompanijaContext:DbContext
    {
       
        public DbSet<Destinacija> Destination{get;set;}
        public DbSet<ZakazanLet> DestinationAirplane{get;set;}
        public DbSet<Aviocompany>Aviocompany{get;set;}
        public DbSet<Avion> Airplane{get;set;}
        public AviokompanijaContext(DbContextOptions options):base(options)
        {

        }

    }
}