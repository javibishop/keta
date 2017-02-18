using ServiceStack;

namespace Keta.ServiceModel.System
{
    public class Localization
    {
        [Route("/localization/resources")]
        public class GetResources
        {
            public string Lang { get; set; }
        }
    }
}
