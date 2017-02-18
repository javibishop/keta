using System.Collections.Generic;
using Keta.ServiceModel.System;
using ServiceStack;
using ServiceStack.OrmLite;

namespace Keta.Web.ServiceInterface.System
{
    public class LocalizationServices : Service
    {
        public Dictionary<string, string> Any(Localization.GetResources request)
        {
            var languages = new Dictionary<string, int> {{"en", 1}, {"es", 2}};

            var query = Db.From<Domain.System.LocalizationResource>()
                .Select(x => new { x.Name, x.Value })
                .OrderByDescending(q => q.Id);

            if (!string.IsNullOrEmpty(request.Lang))
                query.Where(q => q.LanguageId == languages[request.Lang]);

            return Db.Dictionary<string, string>(query);
        }

        /*
        public object Any(Localization.MigrateResources request)
        {
            var enResources = Resources.Resources.ResourceManager.GetResourceSet(CultureInfo.GetCultureInfo("en"), true, true);
            var esResources = Resources.Resources.ResourceManager.GetResourceSet(CultureInfo.GetCultureInfo("es"), true, true);
            var resources = Db.Select<Domain.System.LocalizationResource>();

            foreach (DictionaryEntry resource in esResources)
            {
                if (resources.SingleOrDefault(x => x.LanguageId == 2 && x.Name == resource.Key.ToString()) == null)
                {
                    var item = new Domain.System.LocalizationResource
                    {
                        LanguageId = 2,
                        Name = resource.Key.ToString(),
                        Value = resource.Value.ToString()
                    };
                    Db.Insert(item);
                }
            }

            foreach (DictionaryEntry resource in enResources)
            {
                if (resources.SingleOrDefault(x => x.LanguageId == 1 && x.Name == resource.Key.ToString()) == null)
                {
                    var item = new Domain.System.LocalizationResource
                    {
                        LanguageId = 1,
                        Name = resource.Key.ToString(),
                        Value = resource.Value.ToString()
                    };
                    Db.Insert(item);
                }
            }

            return true;
        }
         */
    }
}
