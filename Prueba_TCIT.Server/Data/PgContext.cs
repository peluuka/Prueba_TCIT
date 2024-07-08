using Microsoft.EntityFrameworkCore;
using Prueba_TCIT.Server.Models;

namespace Prueba_TCIT.Server.Data
{
    public class PgContext : DbContext
    {
        public PgContext(DbContextOptions<PgContext> options) : base(options) { }
        public DbSet<Post> Posts { get; set; }
    }
}
