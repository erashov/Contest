using ContestsClients.Dal.Entities;

namespace ContestsClients.Dal.Abstract
{
    public interface IContestRepository : IBaseRepository<Contest>
    {
        Question GetLastQuestion(int contestId, int clientId);
    }
}
