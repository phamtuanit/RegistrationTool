using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;
using RatingTool.Server.Data;

namespace RatingTool.Server.Service.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReferenceController : ApiController
    {
        /// <summary>
        /// The logger
        /// </summary>
        private readonly log4net.ILog Logger = log4net.LogManager.GetLogger(typeof(ReferenceController));

        // POST api/Reference/5 
        public async Task<HttpResponseMessage> Post([FromUri] int id, HttpRequestMessage request)
        {
            Logger.Debug($"[Post] Add new item: {id}.");

            var refDataStr = await request.Content.ReadAsStringAsync();
            Logger.Debug($"[Post] Add new item data:\n{refDataStr}.");

            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                try
                {
                    var refListStr = dataMgr.LoadReferenceData();
                    var refList = JArray.Parse(refListStr);

                    var existingItem = refList.FirstOrDefault(json => json["id"].Value<int>() == id);
                    if (existingItem != null)
                    {
                        Logger.Debug($"[Put] Found an existing item: {existingItem}.");
                        throw new System.Exception($"The item [{id}] is exiting");
                    }

                    var registrationData = JObject.Parse(refDataStr);
                    registrationData["id"] = id;
                    refList.Add(registrationData);

                    dataMgr.SaveReferenceData(refList.ToString());
                }
                catch (System.Exception ex)
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new StringContent(ex.Message, Encoding.UTF8, "text/html")
                    };
                }
            }

            Logger.Debug($"[Post] Add new item: {id}. Done");
            var response = new HttpResponseMessage(HttpStatusCode.Created);
            return response;
        }

        // PUT api/Reference/5 
        public async Task<HttpResponseMessage> Put([FromUri] int id, HttpRequestMessage request)
        {
            Logger.Debug($"[Put] Update new item: {id}.");

            var refDataStr = await request.Content.ReadAsStringAsync();
            Logger.Debug($"[Put] Update new item data:\n{refDataStr}.");

            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                try
                {
                    var refListStr = dataMgr.LoadReferenceData();
                    var refList = JArray.Parse(refListStr);

                    var existingItem = refList.FirstOrDefault(json => json["id"].Value<int>() == id);
                    if (existingItem != null)
                    {
                        Logger.Debug($"[Put] Update existing item: {existingItem}.");
                        var refData = JObject.Parse(refDataStr);
                        ((JContainer)existingItem).Merge(refData);

                        existingItem["id"] = id;
                        dataMgr.SaveReferenceData(refList.ToString());
                    }
                    else
                    {
                        return new HttpResponseMessage(HttpStatusCode.NotFound)
                        {
                            Content = new StringContent($"The item [{id}] could not be found.", Encoding.UTF8, "text/html")
                        };
                    }
                }
                catch (System.Exception ex)
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new StringContent(ex.ToString(), Encoding.UTF8, "text/html")
                    };
                }
            }

            Logger.Debug($"[Put] Update new item: {id}. Done");
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            return response;
        }

        // DEL api/Reference/5 
        public HttpResponseMessage Delete([FromUri] int id)
        {
            Logger.Debug($"[Delete] Delete item: {id}.");

            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                try
                {
                    var refListStr = dataMgr.LoadReferenceData();
                    var refList = JArray.Parse(refListStr);

                    var existingItem = refList.FirstOrDefault(json => json["id"].Value<int>() == id);
                    if (existingItem != null)
                    {
                        refList.Remove(existingItem);
                        dataMgr.SaveReferenceData(refList.ToString());
                    }
                }
                catch (System.Exception ex)
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new StringContent(ex.Message, Encoding.UTF8, "text/html")
                    };
                }
            }

            Logger.Debug($"[Delete] Delete item: {id}. Done");
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            return response;
        }

        // GET api/Reference 
        public HttpResponseMessage Get()
        {
            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                var refJsonStr = dataMgr.LoadReferenceData();
                var response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StringContent(refJsonStr, Encoding.UTF8, "application/json");
                return response;
            }
        }

        // GET api/Registration 
        public HttpResponseMessage Get([FromUri] int id)
        {
            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                var rawJsonData = dataMgr.LoadReferenceData();
                var refList = JArray.Parse(rawJsonData);
                var existingItem = refList.FirstOrDefault(json => json["id"]?.Value<int>() == id);
                if (existingItem != null)
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    response.Content = new StringContent(existingItem.ToString(), Encoding.UTF8, "application/json");
                    return response;
                }
            }

            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }
    }
}
