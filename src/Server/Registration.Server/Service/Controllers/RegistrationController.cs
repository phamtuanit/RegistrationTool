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
    public class RegistrationController : ApiController
    {
        /// <summary>
        /// The logger
        /// </summary>
        private readonly log4net.ILog Logger = log4net.LogManager.GetLogger(typeof(RegistrationController));

        // POST api/Registration/5 
        public async Task<HttpResponseMessage> Post([FromUri] int id, HttpRequestMessage request)
        {
            Logger.Debug($"[Post] Add new item: {id}.");

            var registrationDataStr = await request.Content.ReadAsStringAsync();
            Logger.Debug($"[Post] Add new item data:\n{registrationDataStr}.");

            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                try
                {
                    var registrationListStr = dataMgr.LoadRegistrationData();
                    var registrationList = JArray.Parse(registrationListStr);

                    var existingItem = registrationList.FirstOrDefault(json => json["id"]?.Value<int>() == id);
                    if (existingItem != null)
                    {
                        Logger.Debug($"[Put] Found an existing item: {existingItem}.");
                        throw new System.Exception($"The item [{id}] is exiting");
                    }

                    var registrationData = JObject.Parse(registrationDataStr);
                    registrationData["id"] = id;
                    registrationList.Add(registrationData);

                    dataMgr.SaveRegistrationData(registrationList.ToString());
                }
                catch (System.Exception ex)
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new StringContent(ex.ToString(), Encoding.UTF8, "text/html")
                    };
                }
            }

            Logger.Debug($"[Post] Add new item: {id}. Done");
            var response = new HttpResponseMessage(HttpStatusCode.Created);
            return response;
        }

        // PUT api/Registration/5 
        public async Task<HttpResponseMessage> Put([FromUri] int id, HttpRequestMessage request)
        {
            Logger.Debug($"[Put] Update item: {id}.");

            var registrationDataStr = await request.Content.ReadAsStringAsync();
            Logger.Debug($"[Put] Update item data:\n{registrationDataStr}.");

            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                try
                {
                    var registrationListStr = dataMgr.LoadRegistrationData();
                    var registrationList = JArray.Parse(registrationListStr);

                    var existingItem = registrationList.FirstOrDefault(json => json["id"]?.Value<int>() == id);
                    if (existingItem != null)
                    {
                        Logger.Debug($"[Put] Update existing item: {existingItem}.");
                        var registrationData = JObject.Parse(registrationDataStr);
                        ((JContainer)existingItem).Merge(registrationData);

                        existingItem["id"] = id;
                        dataMgr.SaveReferenceData(registrationList.ToString());
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
                        Content = new StringContent(ex.Message, Encoding.UTF8, "text/html")
                    };
                }
            }

            Logger.Debug($"[Put] Update item: {id}. Done");
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            return response;
        }

        // DEL api/Registration/5 
        public HttpResponseMessage Delete([FromUri] int id)
        {
            Logger.Debug($"[Delete] Delete item: {id}.");

            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                try
                {
                    var registrationListStr = dataMgr.LoadRegistrationData();
                    var registrationList = JArray.Parse(registrationListStr);

                    var existingItem = registrationList.FirstOrDefault(json => json["id"]?.Value<int>() == id);
                    if (existingItem != null)
                    {
                        registrationList.Remove(existingItem);
                        dataMgr.SaveRegistrationData(registrationList.ToString());
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

        // GET api/Registration 
        public HttpResponseMessage Get()
        {
            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                var rawJsonData = dataMgr.LoadRegistrationData();

                var response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StringContent(rawJsonData, Encoding.UTF8, "application/json");
                return response;
            }
        }

        // GET api/Registration 
        public HttpResponseMessage Get([FromUri] int id)
        {
            var dataMgr = DataManagement.Instance;
            lock (dataMgr)
            {
                var rawJsonData = dataMgr.LoadRegistrationData();
                var registrationList = JArray.Parse(rawJsonData);
                var existingItem = registrationList.FirstOrDefault(json => json["id"]?.Value<int>() == id);
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
