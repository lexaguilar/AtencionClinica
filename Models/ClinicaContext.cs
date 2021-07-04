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
        public virtual DbSet<AdmissionType> AdmissionTypes { get; set; }
        public virtual DbSet<App> Apps { get; set; }
        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<AreaProductStock> AreaProductStocks { get; set; }
        public virtual DbSet<AreaService> AreaServices { get; set; }
        public virtual DbSet<AreaType> AreaTypes { get; set; }
        public virtual DbSet<Beneficiary> Beneficiaries { get; set; }
        public virtual DbSet<BeneficiaryStatus> BeneficiaryStatuses { get; set; }
        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<BillDetail> BillDetails { get; set; }
        public virtual DbSet<BillType> BillTypes { get; set; }
        public virtual DbSet<Cie10> Cie10s { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Contract> Contracts { get; set; }
        public virtual DbSet<Currency> Currencies { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<CustomerStatus> CustomerStatuses { get; set; }
        public virtual DbSet<CustomerType> CustomerTypes { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<DoctorTime> DoctorTimes { get; set; }
        public virtual DbSet<Family> Families { get; set; }
        public virtual DbSet<Follow> Follows { get; set; }
        public virtual DbSet<FollowsPrivate> FollowsPrivates { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<GroupProduct> GroupProducts { get; set; }
        public virtual DbSet<GroupProductPrivateCustumer> GroupProductPrivateCustumers { get; set; }
        public virtual DbSet<GroupProductsByDay> GroupProductsByDays { get; set; }
        public virtual DbSet<HemoLog> HemoLogs { get; set; }
        public virtual DbSet<HemoLogDetail> HemoLogDetails { get; set; }
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
        public virtual DbSet<PrivateCustomerType> PrivateCustomerTypes { get; set; }
        public virtual DbSet<PrivateSendTest> PrivateSendTests { get; set; }
        public virtual DbSet<PrivateSendTestDetail> PrivateSendTestDetails { get; set; }
        public virtual DbSet<PrivateServiceTest> PrivateServiceTests { get; set; }
        public virtual DbSet<PrivateServiceTestBaarDetail> PrivateServiceTestBaarDetails { get; set; }
        public virtual DbSet<PrivateServiceTestCultive> PrivateServiceTestCultives { get; set; }
        public virtual DbSet<PrivateServiceTestCultiveAntiBiotic> PrivateServiceTestCultiveAntiBiotics { get; set; }
        public virtual DbSet<PrivateServiceTestCultiveFresc> PrivateServiceTestCultiveFrescs { get; set; }
        public virtual DbSet<PrivateServiceTestDetail> PrivateServiceTestDetails { get; set; }
        public virtual DbSet<PrivateWorkOrder> PrivateWorkOrders { get; set; }
        public virtual DbSet<PrivateWorkOrderDetail> PrivateWorkOrderDetails { get; set; }
        public virtual DbSet<PrivateWorkPreOrder> PrivateWorkPreOrders { get; set; }
        public virtual DbSet<PrivateWorkPreOrderDetail> PrivateWorkPreOrderDetails { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductState> ProductStates { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }
        public virtual DbSet<ProviderState> ProviderStates { get; set; }
        public virtual DbSet<Rate> Rates { get; set; }
        public virtual DbSet<Region> Regions { get; set; }
        public virtual DbSet<Relationship> Relationships { get; set; }
        public virtual DbSet<Resource> Resources { get; set; }
        public virtual DbSet<Rol> Rols { get; set; }
        public virtual DbSet<RolResource> RolResources { get; set; }
        public virtual DbSet<SendTest> SendTests { get; set; }
        public virtual DbSet<SendTestDetail> SendTestDetails { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<ServiceDetail> ServiceDetails { get; set; }
        public virtual DbSet<ServiceProduct> ServiceProducts { get; set; }
        public virtual DbSet<ServiceTest> ServiceTests { get; set; }
        public virtual DbSet<ServiceTestBaarDetail> ServiceTestBaarDetails { get; set; }
        public virtual DbSet<ServiceTestCultive> ServiceTestCultives { get; set; }
        public virtual DbSet<ServiceTestCultiveAntiBiotic> ServiceTestCultiveAntiBiotics { get; set; }
        public virtual DbSet<ServiceTestCultiveFresc> ServiceTestCultiveFrescs { get; set; }
        public virtual DbSet<ServiceTestDetail> ServiceTestDetails { get; set; }
        public virtual DbSet<ServiceType> ServiceTypes { get; set; }
        public virtual DbSet<Sex> Sexs { get; set; }
        public virtual DbSet<Specialty> Specialties { get; set; }
        public virtual DbSet<Subsidy> Subsidies { get; set; }
        public virtual DbSet<Traslate> Traslates { get; set; }
        public virtual DbSet<TraslateDetail> TraslateDetails { get; set; }
        public virtual DbSet<TraslateStage> TraslateStages { get; set; }
        public virtual DbSet<TraslateState> TraslateStates { get; set; }
        public virtual DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<VwBeneficiariesActive> VwBeneficiariesActives { get; set; }
        public virtual DbSet<VwBillFinished> VwBillFinisheds { get; set; }
        public virtual DbSet<VwBillFinishedByClient> VwBillFinishedByClients { get; set; }
        public virtual DbSet<VwBillProductsService> VwBillProductsServices { get; set; }
        public virtual DbSet<VwFollow> VwFollows { get; set; }
        public virtual DbSet<VwFollowsPrivate> VwFollowsPrivates { get; set; }
        public virtual DbSet<VwKardex> VwKardices { get; set; }
        public virtual DbSet<VwLastMedicinesByBeneficiary> VwLastMedicinesByBeneficiaries { get; set; }
        public virtual DbSet<VwLastMedicinesByPrivate> VwLastMedicinesByPrivates { get; set; }
        public virtual DbSet<VwProductInfo> VwProductInfos { get; set; }
        public virtual DbSet<VwStocksForArea> VwStocksForAreas { get; set; }
        public virtual DbSet<VwTestsResult> VwTestsResults { get; set; }
        public virtual DbSet<WorkOrder> WorkOrders { get; set; }
        public virtual DbSet<WorkOrderDetail> WorkOrderDetails { get; set; }
        public virtual DbSet<WorkPreOrder> WorkPreOrders { get; set; }
        public virtual DbSet<WorkPreOrderDetail> WorkPreOrderDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=SQL5097.site4now.net;Initial Catalog=db_a73688_preflorsacuanjoche;User Id=db_a73688_preflorsacuanjoche_admin;Password=UH_qTKTis3cPAeq");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Admission>(entity =>
            {
                entity.HasIndex(e => e.AreaId, "IX_Admissions_Area");

                entity.HasIndex(e => e.BeneficiaryId, "IX_Admissions_Beneficiario");

                entity.HasIndex(e => e.CreateAt, "IX_Admissions_CreateAt");

                entity.HasIndex(e => e.CreateBy, "IX_Admissions_CreateBy");

                entity.HasIndex(e => e.Identification, "IX_Admissions_Identification");

                entity.HasIndex(e => e.Inss, "IX_Admissions_Inss");

                entity.HasIndex(e => e.NumberOfDay, "IX_Admissions_NumberOfDay");

                entity.HasIndex(e => e.SpecialtyId, "IX_Admissions_Specialty");

                entity.HasIndex(e => e.TypeId, "IX_Admissions_Type");

                entity.Property(e => e.AreaId).HasComment("Area al que ve el paciente");

                entity.Property(e => e.Cie10Id)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Identification)
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

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Admissions)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Admissions_AdmissionTypes");
            });

            modelBuilder.Entity<AdmissionType>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
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

                entity.HasIndex(e => e.Identification, "IX_Appointments_Identification");

                entity.HasIndex(e => e.Inss, "IX_Appointments_inss");

                entity.Property(e => e.AreaId).HasComment("Area al que ve el paciente");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateAppointment).HasColumnType("datetime");

                entity.Property(e => e.Identification)
                    .HasMaxLength(50)
                    .IsUnicode(false);

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

                entity.Property(e => e.TypeId).HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Areas)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Areas_AreaTypes");
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

            modelBuilder.Entity<AreaType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Beneficiary>(entity =>
            {
                entity.HasIndex(e => e.Inss, "IX_Beneficiaries");

                entity.HasIndex(e => e.FirstName, "IX_Beneficiaries_FirstName");

                entity.HasIndex(e => e.Id, "IX_Beneficiaries_Identification");

                entity.HasIndex(e => e.InssAlternative, "IX_Beneficiaries_InssAlternative");

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

                entity.Property(e => e.NameCustomer)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Rate).HasColumnType("money");

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

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.CurrencyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bills_Currencies");

                entity.HasOne(d => d.PrivateCustomer)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.PrivateCustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bills_CustomersPrivates");
            });

            modelBuilder.Entity<BillDetail>(entity =>
            {
                entity.HasIndex(e => e.ServiceId, "IX_BillDetails_Product");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.Quantity).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.Bill)
                    .WithMany(p => p.BillDetails)
                    .HasForeignKey(d => d.BillId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BillDetails_Bills");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.BillDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_BillDetails_Products");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.BillDetails)
                    .HasForeignKey(d => d.ServiceId)
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

            modelBuilder.Entity<Contract>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Currency>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Symbol)
                    .IsRequired()
                    .HasMaxLength(2)
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

            modelBuilder.Entity<Group>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Groups_Areas");
            });

            modelBuilder.Entity<GroupProduct>(entity =>
            {
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.GroupProducts)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupProducts_Groups");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.GroupProducts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupProducts_Products");
            });

            modelBuilder.Entity<GroupProductPrivateCustumer>(entity =>
            {
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.GroupProductPrivateCustumers)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupProductPrivateCustumers_GroupProductsByDays");

                entity.HasOne(d => d.PrivateCustomer)
                    .WithMany(p => p.GroupProductPrivateCustumers)
                    .HasForeignKey(d => d.PrivateCustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupProductPrivateCustumers_PrivateCustomers");
            });

            modelBuilder.Entity<GroupProductsByDay>(entity =>
            {
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.GroupProductsByDays)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupProductsByDays_GroupProducts");
            });

            modelBuilder.Entity<HemoLog>(entity =>
            {
                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.HemoLogs)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HemoLogs_Groups");
            });

            modelBuilder.Entity<HemoLogDetail>(entity =>
            {
                entity.Property(e => e.Cost).HasColumnType("money");

                entity.Property(e => e.Observation)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.HemoLog)
                    .WithMany(p => p.HemoLogDetails)
                    .HasForeignKey(d => d.HemoLogId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HemoLogDetails_HemoLogs");

                entity.HasOne(d => d.PrivateCustomer)
                    .WithMany(p => p.HemoLogDetails)
                    .HasForeignKey(d => d.PrivateCustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HemoLogDetails_PrivateCustomers");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.HemoLogDetails)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HemoLogDetails_Products");
            });

            modelBuilder.Entity<InPutProduct>(entity =>
            {
                entity.HasIndex(e => e.AreaId, "IX_InPutProducts_Area");

                entity.HasIndex(e => e.Number, "IX_InPutProducts_Number");

                entity.HasIndex(e => e.Reference, "IX_InPutProducts_Reference");

                entity.HasIndex(e => e.TypeId, "IX_InPutProducts_TypeInputProduct");

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

                entity.Property(e => e.Reference)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.InPutProducts)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InPutProducts_Areas");

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.InPutProducts)
                    .HasForeignKey(d => d.CurrencyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InPutProducts_Currencies");

                entity.HasOne(d => d.Provider)
                    .WithMany(p => p.InPutProducts)
                    .HasForeignKey(d => d.ProviderId)
                    .HasConstraintName("FK_InPutProducts_Providers");

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
                entity.HasIndex(e => e.InPutProductId, "IX_InPutProductDetails_InPutProduct");

                entity.HasIndex(e => e.ProductId, "IX_InPutProductDetails_Product");

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
                entity.HasIndex(e => e.AreaId, "IX_OutPutProducts_Area");

                entity.HasIndex(e => e.Number, "IX_OutPutProducts_Number");

                entity.HasIndex(e => e.Reference, "IX_OutPutProducts_Reference");

                entity.HasIndex(e => e.TypeId, "IX_OutPutProducts_TypeOutPutProduct");

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

                entity.Property(e => e.Reference)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.OutPutProducts)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OutPutProducts_Areas");

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.OutPutProducts)
                    .HasForeignKey(d => d.CurrencyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OutPutProducts_Currencies");

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
                entity.HasIndex(e => e.OutPutProductId, "IX_OutPutProductDetails_OutPutProduct");

                entity.HasIndex(e => e.ProductId, "IX_OutPutProductDetails_Product");

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

                entity.Property(e => e.ContractId).HasComment("Id del convenio");

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

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.PrivateCustomers)
                    .HasForeignKey(d => d.ContractId)
                    .HasConstraintName("FK_PrivateCustomers_Contracts");

                entity.HasOne(d => d.PrivateCustomerStatus)
                    .WithMany(p => p.PrivateCustomers)
                    .HasForeignKey(d => d.PrivateCustomerStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateCustomers_PrivateCustomerStats");

                entity.HasOne(d => d.Sex)
                    .WithMany(p => p.PrivateCustomers)
                    .HasForeignKey(d => d.SexId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateCustomers_Sexs");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.PrivateCustomers)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateCustomers_PrivateCustomerTypes");
            });

            modelBuilder.Entity<PrivateCustomerStat>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PrivateCustomerType>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PrivateSendTest>(entity =>
            {
                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.PrivateSendTests)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateSendTests_Doctors");

                entity.HasOne(d => d.PrivateFollow)
                    .WithMany(p => p.PrivateSendTests)
                    .HasForeignKey(d => d.PrivateFollowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateSendTests_Follows");
            });

            modelBuilder.Entity<PrivateSendTestDetail>(entity =>
            {
                entity.HasOne(d => d.PrivateSendTest)
                    .WithMany(p => p.PrivateSendTestDetails)
                    .HasForeignKey(d => d.PrivateSendTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateSendTestDetails_SendTests");
            });

            modelBuilder.Entity<PrivateServiceTest>(entity =>
            {
                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.PrivateServiceTests)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTests_Doctors");

                entity.HasOne(d => d.Follow)
                    .WithMany(p => p.PrivateServiceTests)
                    .HasForeignKey(d => d.FollowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTests_FollowsPrivates");

                entity.HasOne(d => d.SendTest)
                    .WithMany(p => p.PrivateServiceTests)
                    .HasForeignKey(d => d.SendTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTests_PrivateSendTests");
            });

            modelBuilder.Entity<PrivateServiceTestBaarDetail>(entity =>
            {
                entity.Property(e => e.Appearance)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AppearanceBio)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationBk)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ObservationBK");

                entity.Property(e => e.TestDate).HasColumnType("datetime");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.PrivateServiceTestBaarDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestBaarDetails_Services");

                entity.HasOne(d => d.ServiceTest)
                    .WithMany(p => p.PrivateServiceTestBaarDetails)
                    .HasForeignKey(d => d.ServiceTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestBaarDetails_ServiceTests");
            });

            modelBuilder.Entity<PrivateServiceTestCultive>(entity =>
            {
                entity.Property(e => e.Gram)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Isolated)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Mycologycal)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.TestDate).HasColumnType("datetime");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.PrivateServiceTestCultives)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestCultives_Services");

                entity.HasOne(d => d.ServiceTest)
                    .WithMany(p => p.PrivateServiceTestCultives)
                    .HasForeignKey(d => d.ServiceTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestCultives_ServiceTests");
            });

            modelBuilder.Entity<PrivateServiceTestCultiveAntiBiotic>(entity =>
            {
                entity.Property(e => e.TestId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ServiceTestCultive)
                    .WithMany(p => p.PrivateServiceTestCultiveAntiBiotics)
                    .HasForeignKey(d => d.ServiceTestCultiveId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestCultiveAntiBiotics_ServiceTestCultives");
            });

            modelBuilder.Entity<PrivateServiceTestCultiveFresc>(entity =>
            {
                entity.Property(e => e.ResultId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TestId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ServiceTestCultive)
                    .WithMany(p => p.PrivateServiceTestCultiveFrescs)
                    .HasForeignKey(d => d.ServiceTestCultiveId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestCultiveFrescs_ServiceTestCultives");
            });

            modelBuilder.Entity<PrivateServiceTestDetail>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Reference)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Result)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.ResultJson).IsUnicode(false);

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UM");

                entity.HasOne(d => d.ServiceDetail)
                    .WithMany(p => p.PrivateServiceTestDetails)
                    .HasForeignKey(d => d.ServiceDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestDetails_ServiceDetails");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.PrivateServiceTestDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestDetails_Services");

                entity.HasOne(d => d.ServiceTest)
                    .WithMany(p => p.PrivateServiceTestDetails)
                    .HasForeignKey(d => d.ServiceTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateServiceTestDetails_PrivateServiceTests");
            });

            modelBuilder.Entity<PrivateWorkOrder>(entity =>
            {
                entity.HasIndex(e => e.DoctorId, "IX_PrivateWorkOrders_Doctor");

                entity.HasIndex(e => e.FollowsPrivateId, "IX_PrivateWorkOrders_FollowPrivate");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Reference)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.PrivateWorkOrders)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateWorkOrders_Doctors");

                entity.HasOne(d => d.FollowsPrivate)
                    .WithMany(p => p.PrivateWorkOrders)
                    .HasForeignKey(d => d.FollowsPrivateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkOrders_FollowsPrivate");
            });

            modelBuilder.Entity<PrivateWorkOrderDetail>(entity =>
            {
                entity.Property(e => e.Costo).HasColumnType("money");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.PrivateWorkOrder)
                    .WithMany(p => p.PrivateWorkOrderDetails)
                    .HasForeignKey(d => d.PrivateWorkOrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateWorkOrderDetails_PrivateWorkOrders");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.PrivateWorkOrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_PrivateWorkOrderDetails_Products");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.PrivateWorkOrderDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK_PrivateWorkOrderDetails_Services");
            });

            modelBuilder.Entity<PrivateWorkPreOrder>(entity =>
            {
                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.PrivateWorkPreOrders)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateWorkPreOrders_Doctors");

                entity.HasOne(d => d.FollowsPrivate)
                    .WithMany(p => p.PrivateWorkPreOrders)
                    .HasForeignKey(d => d.FollowsPrivateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateWorkPreOrders_Follows");
            });

            modelBuilder.Entity<PrivateWorkPreOrderDetail>(entity =>
            {
                entity.Property(e => e.Costo).HasColumnType("money");

                entity.Property(e => e.Presentation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.PrivateWorkOrder)
                    .WithMany(p => p.PrivateWorkPreOrderDetails)
                    .HasForeignKey(d => d.PrivateWorkOrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateWorkPreOrderDetails_WorkPreOrders");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.PrivateWorkPreOrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateWorkPreOrderDetails_Products");
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

                entity.Property(e => e.StockMin).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CurrencyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Products_Currencies");

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

            modelBuilder.Entity<Provider>(entity =>
            {
                entity.HasIndex(e => e.Ruc, "IX_Providers");

                entity.HasIndex(e => e.Name, "IX_Providers_1");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastDateModificationAt).HasColumnType("datetime");

                entity.Property(e => e.LastModificationBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Ruc)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("RUC");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.StateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Providers_ProviderStates");
            });

            modelBuilder.Entity<ProviderState>(entity =>
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

            modelBuilder.Entity<SendTest>(entity =>
            {
                entity.HasIndex(e => e.DoctorId, "IX_SendTests_Doctor");

                entity.HasIndex(e => e.FollowId, "IX_SendTests_Follow");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.SendTests)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SendTests_Doctors");

                entity.HasOne(d => d.Follow)
                    .WithMany(p => p.SendTests)
                    .HasForeignKey(d => d.FollowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SendTests_Follows");
            });

            modelBuilder.Entity<SendTestDetail>(entity =>
            {
                entity.HasIndex(e => e.SendTestId, "IX_SendTestDetails_SentTest");

                entity.HasIndex(e => e.Serviceid, "IX_SendTestDetails_Service");

                entity.HasOne(d => d.SendTest)
                    .WithMany(p => p.SendTestDetails)
                    .HasForeignKey(d => d.SendTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SendTestDetails_SendTests");
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

                entity.Property(e => e.ReportName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TypeId).HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.Services)
                    .HasForeignKey(d => d.CurrencyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Services_Currencies");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Services)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Services_ServiceTypes");
            });

            modelBuilder.Entity<ServiceDetail>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Reference)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UM");
            });

            modelBuilder.Entity<ServiceProduct>(entity =>
            {
                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ServiceProducts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceProducts_Products");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceProducts)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceProducts_Services");
            });

            modelBuilder.Entity<ServiceTest>(entity =>
            {
                entity.HasIndex(e => e.DoctorId, "IX_ServiceTests_Doctor");

                entity.HasIndex(e => e.FollowId, "IX_ServiceTests_Follow");

                entity.HasIndex(e => e.SendTestId, "IX_ServiceTests_SendTest");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.ServiceTests)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTests_Doctors");

                entity.HasOne(d => d.Follow)
                    .WithMany(p => p.ServiceTests)
                    .HasForeignKey(d => d.FollowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTests_Follows");

                entity.HasOne(d => d.SendTest)
                    .WithMany(p => p.ServiceTests)
                    .HasForeignKey(d => d.SendTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTests_SendTests");
            });

            modelBuilder.Entity<ServiceTestBaarDetail>(entity =>
            {
                entity.HasIndex(e => e.ServiceTestId, "IX_ServiceTestBaarDetails_ServiceTest");

                entity.Property(e => e.Appearance)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AppearanceBio)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationBk)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ObservationBK");

                entity.Property(e => e.TestDate).HasColumnType("datetime");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceTestBaarDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestBaarDetails_Services");

                entity.HasOne(d => d.ServiceTest)
                    .WithMany(p => p.ServiceTestBaarDetails)
                    .HasForeignKey(d => d.ServiceTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestBaarDetails_ServiceTests");
            });

            modelBuilder.Entity<ServiceTestCultive>(entity =>
            {
                entity.HasIndex(e => e.ServiceId, "IX_ServiceTestCultives_Service");

                entity.HasIndex(e => e.ServiceTestId, "IX_ServiceTestCultives_ServiceTest");

                entity.Property(e => e.Gram)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Isolated)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Mycologycal)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.TestDate).HasColumnType("datetime");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceTestCultives)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestCultives_Services");

                entity.HasOne(d => d.ServiceTest)
                    .WithMany(p => p.ServiceTestCultives)
                    .HasForeignKey(d => d.ServiceTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestCultives_ServiceTests");
            });

            modelBuilder.Entity<ServiceTestCultiveAntiBiotic>(entity =>
            {
                entity.HasIndex(e => e.ServiceTestCultiveId, "IX_ServiceTestCultiveAntiBiotics_CultiveTest");

                entity.Property(e => e.TestId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ServiceTestCultive)
                    .WithMany(p => p.ServiceTestCultiveAntiBiotics)
                    .HasForeignKey(d => d.ServiceTestCultiveId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestCultiveAntiBiotics_ServiceTestCultives");
            });

            modelBuilder.Entity<ServiceTestCultiveFresc>(entity =>
            {
                entity.HasIndex(e => e.ServiceTestCultiveId, "IX_ServiceTestCultiveFrescs_CultiveTest");

                entity.Property(e => e.ResultId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TestId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ServiceTestCultive)
                    .WithMany(p => p.ServiceTestCultiveFrescs)
                    .HasForeignKey(d => d.ServiceTestCultiveId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestCultiveFrescs_ServiceTestCultives");
            });

            modelBuilder.Entity<ServiceTestDetail>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Reference)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Result)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.ResultJson).IsUnicode(false);

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UM");

                entity.HasOne(d => d.ServiceDetail)
                    .WithMany(p => p.ServiceTestDetails)
                    .HasForeignKey(d => d.ServiceDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestDetails_ServiceDetails");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceTestDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestDetails_Services");

                entity.HasOne(d => d.ServiceTest)
                    .WithMany(p => p.ServiceTestDetails)
                    .HasForeignKey(d => d.ServiceTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ServiceTestDetails_ServiceTests");
            });

            modelBuilder.Entity<ServiceType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
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

                entity.HasIndex(e => e.Identification, "IX_Subsidies_Identification");

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

                entity.Property(e => e.Identification)
                    .HasMaxLength(50)
                    .IsUnicode(false);

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

            modelBuilder.Entity<Traslate>(entity =>
            {
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

                entity.Property(e => e.LastDateModificationAt).HasColumnType("datetime");

                entity.Property(e => e.LastModificationBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation).HasMaxLength(500);

                entity.Property(e => e.Rate).HasColumnType("money");

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.AreaSource)
                    .WithMany(p => p.TraslateAreaSources)
                    .HasForeignKey(d => d.AreaSourceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Traslates_AreasSource");

                entity.HasOne(d => d.AreaTarget)
                    .WithMany(p => p.TraslateAreaTargets)
                    .HasForeignKey(d => d.AreaTargetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Traslates_AreasTarget");

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.Traslates)
                    .HasForeignKey(d => d.CurrencyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Traslates_Currencies");

                entity.HasOne(d => d.Stage)
                    .WithMany(p => p.Traslates)
                    .HasForeignKey(d => d.StageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Traslates_TraslateStages");
            });

            modelBuilder.Entity<TraslateDetail>(entity =>
            {
                entity.HasIndex(e => e.ProductId, "IX_TraslateDetails_Product");

                entity.HasIndex(e => e.TraslateId, "IX_TraslateDetails_Traslate");

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

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TraslateDetails)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TraslateDetails_Products");

                entity.HasOne(d => d.Traslate)
                    .WithMany(p => p.TraslateDetails)
                    .HasForeignKey(d => d.TraslateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TraslateDetails_Traslates");
            });

            modelBuilder.Entity<TraslateStage>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TraslateState>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
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

            modelBuilder.Entity<VwBeneficiariesActive>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwBeneficiariesActives");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.CellNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

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

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ralation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwBillFinished>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwBillFinished");

                entity.Property(e => e.Area)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(101)
                    .IsUnicode(false);

                entity.Property(e => e.NameService)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.Quantity).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<VwBillFinishedByClient>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwBillFinishedByClient");

                entity.Property(e => e.Area)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ContractType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(101)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.ServiceName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TypeCustomer)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwBillProductsService>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwBillProductsServices");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Contract)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Currency)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.GranTotal).HasColumnType("decimal(18, 4)");

                entity.Property(e => e.Name)
                    .HasMaxLength(101)
                    .IsUnicode(false);

                entity.Property(e => e.NameService)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.Quantity).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SubTotal).HasColumnType("money");

                entity.Property(e => e.TipoIngreso)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Total).HasColumnType("money");

                entity.Property(e => e.TypeCustomer)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwFollow>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwFollows");

                entity.Property(e => e.AdmissionType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

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

                entity.Property(e => e.Identification)
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

                entity.Property(e => e.BillTypeName)
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

                entity.Property(e => e.PrivateCustomerTypeName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwKardex>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwKardex");

                entity.Property(e => e.CostAvg)
                    .HasColumnType("money")
                    .HasColumnName("CostAVG");

                entity.Property(e => e.CostIn).HasColumnType("decimal(22, 4)");

                entity.Property(e => e.CostOut).HasColumnType("decimal(22, 4)");

                entity.Property(e => e.CostPromOut).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.CostTotalIn).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.CostTotalOut).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Reference)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwLastMedicinesByBeneficiary>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwLastMedicinesByBeneficiary");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Doctor)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Product)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwLastMedicinesByPrivate>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwLastMedicinesByPrivate");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Doctor)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Product)
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

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwStocksForArea>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwStocksForArea");

                entity.Property(e => e.Area)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CostAvg)
                    .HasColumnType("money")
                    .HasColumnName("CostAVG");

                entity.Property(e => e.CostReal).HasColumnType("money");

                entity.Property(e => e.Presentation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwTestsResult>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwTestsResults");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Doctor)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Edad).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Examen)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Paciente)
                    .IsRequired()
                    .HasMaxLength(101)
                    .IsUnicode(false);

                entity.Property(e => e.Procedimiento)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Reference)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Relationship)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Result)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UM");
            });

            modelBuilder.Entity<WorkOrder>(entity =>
            {
                entity.HasIndex(e => e.Reference, "IX_WorkOrders");

                entity.HasIndex(e => e.FollowId, "IX_WorkOrders_Follows");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Reference)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.WorkOrders)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkOrders_Doctors");

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

                entity.Property(e => e.Costo).HasColumnType("money");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.WorkOrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_WorkOrderDetails_Products");

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

            modelBuilder.Entity<WorkPreOrder>(entity =>
            {
                entity.HasIndex(e => e.FollowId, "IX_WorkPreOrders_Follow");

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.WorkPreOrders)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkPreOrders_Doctors");

                entity.HasOne(d => d.Follow)
                    .WithMany(p => p.WorkPreOrders)
                    .HasForeignKey(d => d.FollowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkPreOrders_Follows");
            });

            modelBuilder.Entity<WorkPreOrderDetail>(entity =>
            {
                entity.Property(e => e.Costo).HasColumnType("money");

                entity.Property(e => e.Presentation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.Total).HasColumnType("money");

                entity.Property(e => e.Um)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.WorkPreOrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkPreOrderDetails_Products");

                entity.HasOne(d => d.WorkOrder)
                    .WithMany(p => p.WorkPreOrderDetails)
                    .HasForeignKey(d => d.WorkOrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkPreOrderDetails_WorkPreOrders");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
