using System;
using System.Collections.Generic;
using System.Web.Mvc;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Concrete;
using Ninject;

namespace TestStaff.Front.Infrastructure
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
            _kernel.Bind<ITestRepository>().To<EfTestRepository>();
            _kernel.Bind<IEmployeeRepository>().To<EfEmployeeRepository>();
        }

    }
}