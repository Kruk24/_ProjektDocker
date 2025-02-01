using Microsoft.EntityFrameworkCore;

namespace LibraryAPI // lub inna odpowiednia przestrzeń nazw
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }
}
