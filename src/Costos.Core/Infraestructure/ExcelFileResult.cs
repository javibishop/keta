using System.Collections.Generic;
using System.IO;
using ServiceStack;
using ServiceStack.Web;

namespace Keta.Infraestructure
{
    public class ExcelFileResult : IHasOptions, IStreamWriter
    {
        private readonly Stream responseStream;
        public IDictionary<string, string> Options { get; private set; }

        public ExcelFileResult(Stream responseStream, string fileName)
        {
            this.responseStream = responseStream;

            Options = new Dictionary<string, string> {
             {"Content-Type", "application/octet-stream"},
             {"Content-Disposition", string.Format("attachment; filename=\"{0}.xls\";", fileName)}
         };
        }

        public void WriteTo(Stream responseStream)
        {
            if (this.responseStream == null)
                return;

            this.responseStream.WriteTo(responseStream);
            responseStream.Flush();
        }
    }
}
