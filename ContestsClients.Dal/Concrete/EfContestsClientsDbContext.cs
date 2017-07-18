using System.Data.Entity;
using ContestsClients.Dal.Entities;

namespace ContestsClients.Dal.Concrete
{
    public class EfContestsClientsDbContext  : DbContext
    {
        public EfContestsClientsDbContext() : base("Contests_DB")
        {
            Configuration.ProxyCreationEnabled = false;
        }        

        public DbSet<Contest> Contests{ get; set; }

        public DbSet<Question> Questions { get; set; }

        public  DbSet<Answer> Answers { get; set; }

        public DbSet<QuestionType> QuestionTypes { get; set; }

        public DbSet<AnswerType> AnswerTypes { get; set; }

        public DbSet<Client> Clients { get; set; }

        public DbSet<Distribution> Distributions { get; set; }

        public DbSet<LogDistribution> LogDistributions { get; set; }

        public DbSet<ClientGroup> ClientGroups { get; set; }

        public DbSet<ClientAnswerAdditional> ClientAnswerAdditionals { get; set; }

        public DbSet<Setting> Settings { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
