using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Eltemtek.ToDoList.Db.DataAccess
{
    public partial class DbEntities : DbContext
    {
        public DbEntities()
        {
        }

        public DbEntities(DbContextOptions<DbEntities> options)
            : base(options)
        {
        }

        public virtual DbSet<TblNote> TblNotes { get; set; }
        public virtual DbSet<TblToken> TblTokens { get; set; }
        public virtual DbSet<TblUser> TblUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost;Database=todo;Username=postgres;Password=180106");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Turkish_Turkey.1254");

            modelBuilder.Entity<TblNote>(entity =>
            {
                entity.HasKey(e => e.Noteid)
                    .HasName("tbl_note_pkey");

                entity.Property(e => e.Userid).HasDefaultValueSql("nextval('\"tbl_note_Userid_seq\"'::regclass)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TblNotes)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("id_userid_foreign");
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("nextval('tbl_user_id_seq'::regclass)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
