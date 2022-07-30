using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using BL.Models;
using System.Net;
using Common.Helpers;
using Common.Models;
using Common.ViewModels;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITaskServices _taskServices;
        public TaskController(IMapper mapper, ITaskServices TaskServices)
        {
            _mapper = mapper;
            _taskServices = TaskServices;
        }


        [HttpPost("[action]")]
        [Authorize(Roles = "Yönetici")]
        public HttpStatusCode CreateTask(Common.DTO.TaskDTO task)
        {
            if (task == null) return HttpStatusCode.BadRequest;

            DOMAIN.Models.Task taskDomain = _mapper.Map<DOMAIN.Models.Task>(task);

            if (task.documentDTOs != null && task.documentDTOs.Count > 0)
            {
                List<DOMAIN.Models.Document> document = new List<DOMAIN.Models.Document>();
                foreach (var item in task.documentDTOs)
                {
                    document.Add(_mapper.Map<DOMAIN.Models.Document>(item));
                }

                taskDomain.Documents = document;
            }

            var result = _taskServices.CreateTask(taskDomain);

            if (result.Item1 == 1)
            {
                string urgency = "";
                string priority = "";
                if (task.Urgency) urgency = "Acil";
                else urgency = "Acil Değil";
                if (task.Priority) priority = "Öncelikli";
                else priority = "Öncelikli Değil";


                StringBuilder mailbuilder = new StringBuilder();
                mailbuilder.Append("<html>");
                mailbuilder.Append("<head>");
                mailbuilder.Append("<meta charset= utf-8 />");
                mailbuilder.Append("<title>Yeni Görev</title>");
                mailbuilder.Append("</head>");
                mailbuilder.Append("<body>");
                mailbuilder.Append($"<p>Merhaba. Size {result.Item2} tarafından atanan yeni bir görev var. </p><br/>");
                mailbuilder.Append($"Görevin Bitiş Süresi: {task.CompletionTime}.<br/>");
                mailbuilder.Append($"Görevin Başlığı: {task.Title}.<br/>");
                mailbuilder.Append($"Görevin Açıklaması: {task.Description}.<br/>");
                mailbuilder.Append($"Görevin Aciliyet Durumu:{urgency} <br/>");
                mailbuilder.Append($"Görevin Öncelik Durumu:{priority} <br/>");
                mailbuilder.Append("</body>");
                mailbuilder.Append("</html>");

                EmailHelper emailHelper = new EmailHelper();
                bool isSend = emailHelper.SendEmail(result.Item3, mailbuilder.ToString(), Emails.bticaret01Email, Emails.bticaret01Password, "Görev Ataması", task.documentDTOs[0].Name, task.documentDTOs[0].Data);
                
                if (isSend)
                    return HttpStatusCode.OK;
                else
                    return HttpStatusCode.BadRequest;
            }
                
            else
                return HttpStatusCode.BadRequest;
        }

        [HttpGet("[action]")]
        [Authorize]
        public IActionResult ListTask(int UserId)
        {
            if (UserId == 0) return BadRequest();
                  

            return Ok(_taskServices.ListTask(UserId));
        }
    }
}
