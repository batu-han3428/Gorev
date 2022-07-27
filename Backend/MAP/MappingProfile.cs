using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MAP
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Common.DTO.TaskDTO, DOMAIN.Models.Task>();
            CreateMap<Common.DTO.DocumentDTO, DOMAIN.Models.Document>();
            CreateMap<Common.DTO.UserDTO, DOMAIN.Models.User>();
            CreateMap<Common.DTO.UserRoleDTO, DOMAIN.Models.UserRole>();
            CreateMap<Common.DTO.RoleDTO, DOMAIN.Models.Role>();
            CreateMap<DOMAIN.Models.User, Common.ViewModels.EmployeesViewModel>()
            .ForMember(
            dest => dest.EmployeeName,
            opt => opt.MapFrom(src => src.Name)
            );
        }
    }
}
