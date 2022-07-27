using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DOMAIN.Migrations
{
    public partial class initDb1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_CompaniesId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "CompaniesId",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_CompaniesId",
                table: "Users",
                column: "CompaniesId",
                principalTable: "Companies",
                principalColumn: "Companies_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_CompaniesId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "CompaniesId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_CompaniesId",
                table: "Users",
                column: "CompaniesId",
                principalTable: "Companies",
                principalColumn: "Companies_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
