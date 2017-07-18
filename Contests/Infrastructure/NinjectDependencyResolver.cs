using System;
using System.Collections.Generic;
using System.Web.Mvc;
using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Concrete;
using Ninject;
using ContestsClients.Dal.Entities;

namespace ContestsClients.Admin.Infrastructure
{
    public class NinjectDependencyResolver : IDependencyResolver
    {
        private readonly IKernel _kernel;
        public NinjectDependencyResolver(IKernel kernelParam)
        {
            _kernel = kernelParam;
            AddBindings();
        }
        public object GetService(Type serviceType)
        {
            return _kernel.TryGet(serviceType);
        }
        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _kernel.GetAll(serviceType);
        }
        private void AddBindings()
        {
            _kernel.Bind<IContestRepository>().To<EfContestRepository>();
            _kernel.Bind<IClientRepository>().To<EfClientRepository>();
            _kernel.Bind<IClientGroupRepository>().To<EfClientGroupRepository>();
            _kernel.Bind<IQuestionRepository>().To<EfQuestionRepository>();
            _kernel.Bind<IAnswerRepository>().To<EfAnswerRepository>();
            _kernel.Bind<IReportingRepository>().To<EfReportingRepository>();
            _kernel.Bind<IBaseRepository<Distribution>>().To<EfDistributionRepository>();
            _kernel.Bind<ISettingRepository>().To<EfSettingRepository>();
        }

    }
}