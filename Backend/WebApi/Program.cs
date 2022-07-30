using BL.Concrete;
using BL.Models;
using DAL.Concrete;
using DAL.Models;
using MAP;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager Configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddControllers();


var key = Encoding.ASCII.GetBytes(Configuration["Token:SecurityKey"]);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option =>
{
    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Configuration["Token:Issuer"],
        ValidAudience = Configuration["Token:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:SecurityKey"])),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddCors(options => options.AddDefaultPolicy(policy => {
    policy.WithOrigins(new[] { "http://localhost:3000", "https://localhost:3000", "https://172.34.1.78:3000", "https://localhost:3001", "http://127.0.0.1:5500" })
            .AllowAnyHeader()
            .AllowAnyMethod()
                .AllowCredentials();
}));

builder.Services.AddScoped<ITaskServices, TaskServices>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICompanyServices, CompanyServices>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
