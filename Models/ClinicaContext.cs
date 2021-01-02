using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ClinicaContext : DbContext
    {
        public ClinicaContext()
        {
        }

        public ClinicaContext(DbContextOptions<ClinicaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admission> Admissions { get; set; }
        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<Beneficiary> Beneficiaries { get; set; }
        public virtual DbSet<BeneficiaryType> BeneficiaryTypes { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<CustomerStatus> CustomerStatuses { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<Percapita> Percapitas { get; set; }
        public virtual DbSet<Resource> Resources { get; set; }
        public virtual DbSet<Rol> Rols { get; set; }
        public virtual DbSet<RolResource> RolResources { get; set; }
        public virtual DbSet<Specialty> Specialties { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LEX-PC\\PCLEX;Database=ClinicalCare;User Id=sa;Password=123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Admission>(entity =>
            {
                entity.Property(e => e.AreaId).HasComment("Area al que ve el paciente");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumberOfDay).HasComment("numero de admision de ese dia");

                entity.Property(e => e.Observation)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.SpecialtyId).HasComment("Especialidad a la que va el paciente");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Admissions)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Admissions_Areas");

                entity.HasOne(d => d.Beneficiary)
                    .WithMany(p => p.Admissions)
                    .HasForeignKey(d => d.BeneficiaryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Admissions_Beneficiaries");

                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.Admissions)
                    .HasForeignKey(d => d.CreateBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Admissions_Users");
            });

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.Property(e => e.AreaId).HasComment("Area al que ve el paciente");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateAppointment).HasColumnType("datetime");

                entity.Property(e => e.Observation)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.SpecialtyId).HasComment("Especialidad a la que va el paciente");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Appointments_Areas");

                entity.HasOne(d => d.Beneficiary)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.BeneficiaryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Appointments_Beneficiaries");

                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.CreateBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Appointments_Users");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Appointments_Doctors");

                entity.HasOne(d => d.Specialty)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.SpecialtyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Appointments_Specialties");
            });

            modelBuilder.Entity<Area>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Beneficiary>(entity =>
            {
                entity.HasIndex(e => e.Inss, "IX_Beneficiaries");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BeneficiaryStatusId).HasComment("Estado si es activo o no");

                entity.Property(e => e.BeneficiaryTypeId).HasComment("Tipo de beneficiario, Asegurado Inss, privado o convenio");

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.CellNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasComment("Cuidad del beneficiario");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Identification)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastDateModificationAt).HasColumnType("datetime");

                entity.Property(e => e.LastModificationBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RelationshipId).HasComment("Tipo de relacion con el asegurado, esposo, hijo");

                entity.Property(e => e.Sexo)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.UpdateWithPercapita).HasComment("Indica si el estado se va actualizar con la subida del percapita mensual, si es true se actualiza el estado contra percapita, sino no se actializa el estado");

                entity.HasOne(d => d.BeneficiaryStatus)
                    .WithMany(p => p.Beneficiaries)
                    .HasForeignKey(d => d.BeneficiaryStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Beneficiaries_CustomerStatus");

                entity.HasOne(d => d.BeneficiaryType)
                    .WithMany(p => p.Beneficiaries)
                    .HasForeignKey(d => d.BeneficiaryTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Beneficiaries_BeneficiaryTypes");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Beneficiaries)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Beneficiaries_Cities");

                entity.HasOne(d => d.InssNavigation)
                    .WithMany(p => p.Beneficiaries)
                    .HasForeignKey(d => d.Inss)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Beneficiaries_Customers");
            });

            modelBuilder.Entity<BeneficiaryType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.Inss)
                    .HasName("PK_Customers_1");

                entity.HasIndex(e => e.Inss, "IX_Customers")
                    .IsUnique();

                entity.Property(e => e.Inss).ValueGeneratedNever();

                entity.Property(e => e.CustomerStatusId).HasComment("Indica si esta activo o no el asegurado");

                entity.Property(e => e.DateAdd).HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CustomerStatus)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.CustomerStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Customers_CustomerStatus");
            });

            modelBuilder.Entity<CustomerStatus>(entity =>
            {
                entity.ToTable("CustomerStatus");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Percapita>(entity =>
            {
                entity.HasIndex(e => new { e.Year, e.Month }, "IX_Percapitas");

                entity.Property(e => e.Adscription)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.DateAdd).HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rason)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Resource>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RolResource>(entity =>
            {
                entity.HasOne(d => d.Resource)
                    .WithMany(p => p.RolResources)
                    .HasForeignKey(d => d.ResourceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolResources_Resource");

                entity.HasOne(d => d.Rol)
                    .WithMany(p => p.RolResources)
                    .HasForeignKey(d => d.RolId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolResources_Rols");
            });

            modelBuilder.Entity<Specialty>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username);

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Rol)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RolId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Rols");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
