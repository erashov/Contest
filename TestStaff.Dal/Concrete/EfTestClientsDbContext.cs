using System.Data.Entity;
using TestStaff.Dal.Entities;

namespace TestStaff.Dal.Concrete
{
    public class EfTestClientsDbContext : DbContext
    {
        public EfTestClientsDbContext() : base("TestStaff_DB")
        {
            Configuration.ProxyCreationEnabled = false;
        }        

        public DbSet<Test> Tests{ get; set; }

        public DbSet<Question> Questions { get; set; }

        public  DbSet<Answer> Answers { get; set; }





        public DbSet<Employee> Employees { get; set; }

        public DbSet<Distribution> Distributions { get; set; }

        public DbSet<LogDistribution> LogDistributions { get; set; }

        public DbSet<EmployeeGroup> EmployeeGroups { get; set; }

        public DbSet<EmployeeAnswerAdditional> EmployeeAnswerAdditionals { get; set; }

        public DbSet<Setting> Settings { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Test>()
            //     .HasOptional(b => b.ParentTask)
            //     .WithMany(p => p.ChildTests).HasForeignKey(c => c.ParentId).WillCascadeOnDelete(false);

            base.OnModelCreating(modelBuilder);

        }
    }
}
