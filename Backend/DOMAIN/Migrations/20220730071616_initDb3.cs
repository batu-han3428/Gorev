using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DOMAIN.Migrations
{
    public partial class initDb3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {          
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompaniesId", "ConfirmEmailToken", "Email", "IsConfirmEmail", "Name", "Password", "RefreshToken", "RefrestTokenEndDate", "Surname" },
                values: new object[] { 1, null, null, "admin", true, "", "0DPiKuNIrrVmD8IUCuw1hQxNqZc=", null, null, "" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { 1, 1 });    
        }
    }
}
