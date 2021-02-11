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
        public virtual DbSet<App> Apps { get; set; }
        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<AreaProductStock> AreaProductStocks { get; set; }
        public virtual DbSet<AreaService> AreaServices { get; set; }
        public virtual DbSet<Beneficiary> Beneficiaries { get; set; }
        public virtual DbSet<BeneficiaryStatus> BeneficiaryStatuses { get; set; }
        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<BillDetail> BillDetails { get; set; }
        public virtual DbSet<BillType> BillTypes { get; set; }
        public virtual DbSet<Cie10> Cie10s { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<CustomerStatus> CustomerStatuses { get; set; }
        public virtual DbSet<CustomerType> CustomerTypes { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<DoctorTime> DoctorTimes { get; set; }
        public virtual DbSet<Family> Families { get; set; }
        public virtual DbSet<Follow> Follows { get; set; }
        public virtual DbSet<FollowService> FollowServices { get; set; }
        public virtual DbSet<FollowServiceDetail> FollowServiceDetails { get; set; }
        public virtual DbSet<FollowsPrivate> FollowsPrivates { get; set; }
        public virtual DbSet<InPutProduct> InPutProducts { get; set; }
        public virtual DbSet<InPutProductDetail> InPutProductDetails { get; set; }
        public virtual DbSet<InPutProductState> InPutProductStates { get; set; }
        public virtual DbSet<InPutProductType> InPutProductTypes { get; set; }
        public virtual DbSet<OutPutProduct> OutPutProducts { get; set; }
        public virtual DbSet<OutPutProductDetail> OutPutProductDetails { get; set; }
        public virtual DbSet<OutPutProductState> OutPutProductStates { get; set; }
        public virtual DbSet<OutPutProductType> OutPutProductTypes { get; set; }
        public virtual DbSet<Parameter> Parameters { get; set; }
        public virtual DbSet<Percapita> Percapitas { get; set; }
        public virtual DbSet<Presentation> Presentations { get; set; }
        public virtual DbSet<PrivateCustomer> PrivateCustomers { get; set; }
        public virtual DbSet<PrivateCustomerStat> PrivateCustomerStats { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductState> ProductStates { get; set; }
        public virtual DbSet<Rate> Rates { get; set; }
        public virtual DbSet<Region> Regions { get; set; }
        public virtual DbSet<Relationship> Relationships { get; set; }
        public virtual DbSet<Resource> Resources { get; set; }
        public virtual DbSet<Rol> Rols { get; set; }
        public virtual DbSet<RolResource> RolResources { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<ServiceDetail> ServiceDetails { get; set; }
        public virtual DbSet<Sex> Sexs { get; set; }
        public virtual DbSet<Specialty> Specialties { get; set; }
        public virtual DbSet<Subsidy> Subsidies { get; set; }
        public virtual DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<VwFollow> VwFollows { get; set; }
        public virtual DbSet<VwFollowsPrivate> VwFollowsPrivates { get; set; }
        public virtual DbSet<VwProductInfo> VwProductInfos { get; set; }
        public virtual DbSet<WorkOrder> WorkOrders { get; set; }
        public virtual DbSet<WorkOrderDetail> WorkOrderDetails { get; set; }

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
                entity.HasIndex(e => e.CreateAt, "IX_Admissions");

                entity.HasIndex(e => e.BeneficiaryId, "IX_Admissions_Beneficiario");

                entity.HasIndex(e => e.Inss, "IX_Admissions_Inss");

                entity.HasIndex(e => e.NumberOfDay, "IX_Admissions_NumberOfDay");

                entity.Property(e => e.AreaId).HasComment("Area al que ve el paciente");

                entity.Property(e => e.Cie10Id)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Motive)
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

                entity.HasOne(d => d.Cie10)
                    .WithMany(p => p.Admissions)
                    .HasForeignKey(d => d.Cie10Id)
                    .HasConstraintName("FK_Admissions_CIE10");

                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.Admissions)
                    .HasForeignKey(d => d.CreateBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Admissions_Users");

                entity.HasOne(d => d.Specialty)
                    .WithMany(p => p.Admissions)
                    .HasForeignKey(d => d.SpecialtyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Admissions_Specialties");
            });

            modelBuilder.Entity<App>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.CellNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Slogan)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Website)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasIndex(e => e.BeneficiaryId, "IX_Appointments_Beneficiario");

                entity.HasIndex(e => e.DateAppointment, "IX_Appointments_DateAppointment");

                entity.HasIndex(e => e.DoctorId, "IX_Appointments_Doctors");

                entity.HasIndex(e => e.Inss, "IX_Appointments_inss");

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

            modelBuilder.Entity<AreaProductStock>(entity =>
            {
                entity.HasKey(e => new { e.AreaId, e.ProductId });

                entity.Property(e => e.CostAvg)
                    .HasColumnType("money")
                    .HasColumnName("CostAVG");

                entity.Property(e => e.CostReal).HasColumnType("money");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.AreaProductStocks)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AreaProductStocks_Areas");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.AreaProductStocks)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AreaProductStocks_Products");
            });

            modelBuilder.Entity<AreaService>(entity =>
            {
                entity.HasIndex(e => new { e.AreaId, e.ServiceId }, "IX_AreaServices_AreaServices");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.AreaServices)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AreaServices_Areas");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.AreaServices)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AreaServices_Services");
            });

            modelBuilder.Entity<Beneficiary>(entity =>
            {
                entity.HasIndex(e => e.Inss, "IX_Beneficiaries");

                entity.HasIndex(e => e.FirstName, "IX_Beneficiaries_FirstName");

                entity.HasIndex(e => e.Id, "IX_Beneficiaries_Identification");

                entity.HasIndex(e => e.LastName, "IX_Beneficiaries_LastName");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.BeneficiaryStatusId).HasComment("Estado si es activo o no");

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

                entity.Property(e => e.UpdateWithPercapita).HasComment("Indica si el estado se va actualizar con la subida del percapita mensual, si es true se actualiza el estado contra percapita, sino no se actializa el estado");

                entity.HasOne(d => d.BeneficiaryStatus)
                    .WithMany(p => p.Beneficiaries)
                    .HasForeignKey(d => d.BeneficiaryStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Beneficiaries_BeneficiaryStatus");

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

                entity.HasOne(d => d.Region)
                    .WithMany(p => p.Beneficiaries)
                    .HasForeignKey(d => d.RegionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Beneficiaries_Regions");

                entity.HasOne(d => d.Relationship)
                    .WithMany(p => p.Beneficiaries)
                    .HasForeignKey(d => d.RelationshipId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Beneficiaries_Relationships");

                entity.HasOne(d => d.Sex)
                    .WithMany(p => p.Beneficiaries)
                    .HasForeignKey(d => d.SexId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Beneficiaries_Sexs");
            });

            modelBuilder.Entity<BeneficiaryStatus>(entity =>
            {
                entity.ToTable("BeneficiaryStatus");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.HasIndex(e => e.AreaId, "IX_Bills_Area");

                entity.HasIndex(e => e.PrivateCustomerId, "IX_Bills_CustomerPrivateId");

                entity.Property(e => e.BillTypeId).HasComment("Facturas por ingreso o Facturas espontánea");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Total).HasColumnType("decimal(18, 4)");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bills_Areas");

                entity.HasOne(d => d.BillType)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.BillTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bills_BillTypes");

                entity.HasOne(d => d.PrivateCustomer)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.PrivateCustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bills_CustomersPrivates");
            });

            modelBuilder.Entity<BillDetail>(entity =>
            {
                entity.HasIndex(e => e.ServiceId, "IX_BillDetails_Product");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 4)");

                entity.Property(e => e.Quantity).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Total).HasColumnType("decimal(18, 4)");

                entity.HasOne(d => d.Bill)
                    .WithMany(p => p.BillDetails)
                    .HasForeignKey(d => d.BillId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BillDetails_Bills");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.BillDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BillDetails_Services");
            });

            modelBuilder.Entity<BillType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Cie10>(entity =>
            {
                entity.ToTable("CIE10");

                entity.Property(e => e.Id)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250)
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

                entity.HasIndex(e => e.Identification, "IX_Customers_Identification");

                entity.Property(e => e.Inss).ValueGeneratedNever();

                entity.Property(e => e.CustomerStatusId).HasComment("Indica si esta activo o no el asegurado");

                entity.Property(e => e.CustomerTypeId).HasComment("Tipo de cliente, Asegurado Inss, privado o convenio");

                entity.Property(e => e.DateAdd).HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Identification)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatronalId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CustomerStatus)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.CustomerStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Customers_CustomerStatus");

                entity.HasOne(d => d.CustomerType)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.CustomerTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Customers_CustomerTypes");
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

            modelBuilder.Entity<CustomerType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.MinsaCode)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Specialty)
                    .WithMany(p => p.Doctors)
                    .HasForeignKey(d => d.SpecialtyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Doctors_Specialties");
            });

            modelBuilder.Entity<DoctorTime>(entity =>
            {
                entity.HasKey(e => e.DoctorId);

                entity.Property(e => e.DoctorId).ValueGeneratedNever();

                entity.Property(e => e.Days)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.StartHour).HasColumnType("datetime");

                entity.HasOne(d => d.Doctor)
                    .WithOne(p => p.DoctorTime)
                    .HasForeignKey<DoctorTime>(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DoctorTimes_Doctors");
            });

            modelBuilder.Entity<Family>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Follow>(entity =>
            {
                entity.HasIndex(e => e.AdmissionId, "IX_Follows");

                entity.HasIndex(e => e.AreaSourceId, "IX_Follows_AreaSource");

                entity.HasIndex(e => e.AreaTargetId, "IX_Follows_AreaTarget");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Admission)
                    .WithMany(p => p.Follows)
                    .HasForeignKey(d => d.AdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Follows_Admissions");

                entity.HasOne(d => d.AreaSource)
                    .WithMany(p => p.FollowAreaSources)
                    .HasForeignKey(d => d.AreaSourceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Follows_Areas_Origen");

                entity.HasOne(d => d.AreaTarget)
                    .WithMany(p => p.FollowAreaTargets)
                    .HasForeignKey(d => d.AreaTargetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Follows_Areas_Destino");
            });

            modelBuilder.Entity<FollowService>(entity =>
            {
                entity.HasIndex(e => e.FollowId, "IX_Table_Follows");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observacion)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Follow)
                    .WithMany(p => p.FollowServices)
                    .HasForeignKey(d => d.FollowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowServices_Follows");
            });

            modelBuilder.Entity<FollowServiceDetail>(entity =>
            {
                entity.HasIndex(e => e.FollowServiceId, "IX_FollowServiceDetails_FollowService");

                entity.HasIndex(e => e.ServiceId, "IX_FollowServiceDetails_Services");

                entity.Property(e => e.Quantity).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.FollowService)
                    .WithMany(p => p.FollowServiceDetails)
                    .HasForeignKey(d => d.FollowServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowServiceDetails_FollowServices");
            });

            modelBuilder.Entity<FollowsPrivate>(entity =>
            {
                entity.HasIndex(e => e.AreaSourceId, "IX_FollowsPrivates_AreaSource");

                entity.HasIndex(e => e.AreaTargetId, "IX_FollowsPrivates_AreaTarget");

                entity.HasIndex(e => e.BillId, "IX_FollowsPrivates_Bill");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.AreaSource)
                    .WithMany(p => p.FollowsPrivateAreaSources)
                    .HasForeignKey(d => d.AreaSourceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowsPrivates_AreasSource");

                entity.HasOne(d => d.AreaTarget)
                    .WithMany(p => p.FollowsPrivateAreaTargets)
                    .HasForeignKey(d => d.AreaTargetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowsPrivates_AreasTarget");

                entity.HasOne(d => d.Bill)
                    .WithMany(p => p.FollowsPrivates)
                    .HasForeignKey(d => d.BillId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowsPrivates_Bills");
            });

            modelBuilder.Entity<InPutProduct>(entity =>
            {
                entity.HasIndex(e => e.Number, "IX_InPutProductsNumber");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Discount).HasColumnType("money");

                entity.Property(e => e.Import).HasColumnType("money");

                entity.Property(e => e.Iva)
                    .HasColumnType("money")
                    .HasColumnName("IVA");

                entity.Property(e => e.Observation).HasMaxLength(500);

                entity.Property(e => e.Rate).HasColumnType("money");

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.InPutProducts)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InPutProducts_Areas");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.InPutProducts)
                    .HasForeignKey(d => d.StateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InPutProducts_InPutProductStates");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.InPutProducts)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InPutProducts_InPutProductTypes");
            });

            modelBuilder.Entity<InPutProductDetail>(entity =>
            {
                entity.Property(e => e.Cost).HasColumnType("money");

                entity.Property(e => e.CostAvg)
                    .HasColumnType("money")
                    .HasColumnName("CostAVG");

                entity.Property(e => e.Discount).HasColumnType("money");

                entity.Property(e => e.Import).HasColumnType("money");

                entity.Property(e => e.Iva)
                    .HasColumnType("money")
                    .HasColumnName("IVA");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.InPutProduct)
                    .WithMany(p => p.InPutProductDetails)
                    .HasForeignKey(d => d.InPutProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InPutProductDetails_InPutProducts");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.InPutProductDetails)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InPutProductDetails_Products");
            });

            modelBuilder.Entity<InPutProductState>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<InPutProductType>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OutPutProduct>(entity =>
            {
                entity.HasIndex(e => e.Number, "IX_OutPutProductsNumber");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Discount).HasColumnType("money");

                entity.Property(e => e.Import).HasColumnType("money");

                entity.Property(e => e.Iva)
                    .HasColumnType("money")
                    .HasColumnName("IVA");

                entity.Property(e => e.Observation).HasMaxLength(500);

                entity.Property(e => e.Rate).HasColumnType("money");

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.OutPutProducts)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OutPutProducts_Areas");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.OutPutProducts)
                    .HasForeignKey(d => d.StateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OutPutProducts_OutPutProductStates");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.OutPutProducts)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OutPutProducts_OutPutProductTypes");
            });

            modelBuilder.Entity<OutPutProductDetail>(entity =>
            {
                entity.Property(e => e.Cost).HasColumnType("money");

                entity.Property(e => e.CostAvg)
                    .HasColumnType("money")
                    .HasColumnName("CostAVG");

                entity.Property(e => e.Discount).HasColumnType("money");

                entity.Property(e => e.Import).HasColumnType("money");

                entity.Property(e => e.Iva)
                    .HasColumnType("money")
                    .HasColumnName("IVA");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.OutPutProduct)
                    .WithMany(p => p.OutPutProductDetails)
                    .HasForeignKey(d => d.OutPutProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OutPutProductDetails_OutPutProducts");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OutPutProductDetails)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OutPutProductDetails_Products");
            });

            modelBuilder.Entity<OutPutProductState>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OutPutProductType>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Parameter>(entity =>
            {
                entity.HasKey(e => e.Name);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Percapita>(entity =>
            {
                entity.HasIndex(e => new { e.Year, e.Month }, "IX_Percapitas");

                entity.Property(e => e.Address)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Adscription)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.DateAdd).HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Identification)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatronalId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rason)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Presentation>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PrivateCustomer>(entity =>
            {
                entity.HasIndex(e => e.FirstName, "IX_PrivateCustomers_FN");

                entity.HasIndex(e => e.LastName, "IX_PrivateCustomers_LN");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.CellNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasComment("Cuidad del beneficiario");

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .IsUnicode(false);

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

                entity.HasOne(d => d.PrivateCustomerStatus)
                    .WithMany(p => p.PrivateCustomers)
                    .HasForeignKey(d => d.PrivateCustomerStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateCustomers_PrivateCustomerStats");
            });

            modelBuilder.Entity<PrivateCustomerStat>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasIndex(e => e.FamilyId, "IX_ProductsFamily");

                entity.HasIndex(e => e.Name, "IX_ProductsName");

                entity.HasIndex(e => e.PresentationId, "IX_ProductsPresentation");

                entity.HasIndex(e => e.StateId, "IX_ProductsStatus");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.HasIva).HasColumnName("HasIVA");

                entity.Property(e => e.LastDateModificationAt).HasColumnType("datetime");

                entity.Property(e => e.LastModificationBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StockMin).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Family)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.FamilyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Products_Families");

                entity.HasOne(d => d.Presentation)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.PresentationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Products_Presentations");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.StateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Products_ProductStates");

                entity.HasOne(d => d.UnitOfMeasure)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.UnitOfMeasureId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Products_UnitOfMeasures");
            });

            modelBuilder.Entity<ProductState>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Rate>(entity =>
            {
                entity.HasIndex(e => e.Date, "IX_Rates")
                    .IsUnique();

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Value).HasColumnType("money");
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Relationship>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rule).HasMaxLength(350);
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

            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasIndex(e => e.Name, "IX_Services")
                    .IsUnique();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 4)");

                entity.Property(e => e.PriceCalculate)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ServiceDetail>(entity =>
            {
                entity.Property(e => e.Reference)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UM");
            });

            modelBuilder.Entity<Sex>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Specialty>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Subsidy>(entity =>
            {
                entity.HasIndex(e => e.BeneficiaryId, "IX_Subsidies_Beneficiary");

                entity.HasIndex(e => e.Inss, "IX_Subsidies_Inss");

                entity.HasIndex(e => e.Reference, "IX_Subsidies_Referencia");

                entity.Property(e => e.Cie10Id)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateEnd).HasColumnType("date");

                entity.Property(e => e.DateStart).HasColumnType("date");

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Reference)
                    .IsRequired()
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Subsidies)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Subsidies_Areas");

                entity.HasOne(d => d.Beneficiary)
                    .WithMany(p => p.Subsidies)
                    .HasForeignKey(d => d.BeneficiaryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Subsidies_Beneficiaries");

                entity.HasOne(d => d.Cie10)
                    .WithMany(p => p.Subsidies)
                    .HasForeignKey(d => d.Cie10Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Subsidies_CIE10");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.Subsidies)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Subsidies_Doctors");
            });

            modelBuilder.Entity<UnitOfMeasure>(entity =>
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

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Areas");

                entity.HasOne(d => d.Rol)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RolId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Rols");
            });

            modelBuilder.Entity<VwFollow>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwFollows");

                entity.Property(e => e.AreaSource)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Relationship)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwFollowsPrivate>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwFollowsPrivates");

                entity.Property(e => e.AreaSource)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwProductInfo>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwProductInfo");

                entity.Property(e => e.Cost).HasColumnType("money");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Presentation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<WorkOrder>(entity =>
            {
                entity.HasIndex(e => e.FollowId, "IX_WorkOrders_Follows");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observacion)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Follow)
                    .WithMany(p => p.WorkOrders)
                    .HasForeignKey(d => d.FollowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkOrders_Follows");
            });

            modelBuilder.Entity<WorkOrderDetail>(entity =>
            {
                entity.HasIndex(e => e.ProductId, "IX_WorkOrderDetails_Product");

                entity.HasIndex(e => e.ServiceId, "IX_WorkOrderDetails_Service");

                entity.HasIndex(e => e.WorkOrderId, "IX_WorkOrderDetails_WorkOrder");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 4)");

                entity.Property(e => e.Quantity).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Total).HasColumnType("decimal(18, 4)");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.WorkOrderDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK_WorkOrderDetails_Services");

                entity.HasOne(d => d.WorkOrder)
                    .WithMany(p => p.WorkOrderDetails)
                    .HasForeignKey(d => d.WorkOrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkOrderDetails_WorkOrders");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
