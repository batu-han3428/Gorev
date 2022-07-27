using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using BL.Models;

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
        //[Authorize(Roles = "Yonetici")]
        public IActionResult CreateTask(Common.DTO.TaskDTO task)
        {
            if (task == null) return BadRequest();

            DOMAIN.Models.Task taskDomain = _mapper.Map<DOMAIN.Models.Task>(task);
            List<DOMAIN.Models.Document> document = new List<DOMAIN.Models.Document>();
            foreach (var item in task.documentDTOs)
            {
                document.Add(_mapper.Map<DOMAIN.Models.Document>(item));
            }

            taskDomain.Documents = document;


            _taskServices.CreateTask(taskDomain);

            return Ok();
        }
    }
}
