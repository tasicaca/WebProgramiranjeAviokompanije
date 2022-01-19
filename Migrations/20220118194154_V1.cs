using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Aviokompanija.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aviokompanija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    lokacija = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aviokompanija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Destinacija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    zemlja = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    nazivAerodroma = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destinacija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Avion",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    kodniNaziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    model = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    brojSedista = table.Column<int>(type: "int", nullable: false),
                    AviokompanijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Avion", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Avion_Aviokompanija_AviokompanijaID",
                        column: x => x.AviokompanijaID,
                        principalTable: "Aviokompanija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DestinationAirplane",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvionID = table.Column<int>(type: "int", nullable: false),
                    DestinacijaID = table.Column<int>(type: "int", nullable: false),
                    Vreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OdlazniLet = table.Column<int>(type: "int", nullable: false),
                    duzinaLeta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DestinationAirplane", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DestinationAirplane_Avion_AvionID",
                        column: x => x.AvionID,
                        principalTable: "Avion",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DestinationAirplane_Destinacija_DestinacijaID",
                        column: x => x.DestinacijaID,
                        principalTable: "Destinacija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Avion_AviokompanijaID",
                table: "Avion",
                column: "AviokompanijaID");

            migrationBuilder.CreateIndex(
                name: "IX_DestinationAirplane_AvionID",
                table: "DestinationAirplane",
                column: "AvionID");

            migrationBuilder.CreateIndex(
                name: "IX_DestinationAirplane_DestinacijaID",
                table: "DestinationAirplane",
                column: "DestinacijaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DestinationAirplane");

            migrationBuilder.DropTable(
                name: "Avion");

            migrationBuilder.DropTable(
                name: "Destinacija");

            migrationBuilder.DropTable(
                name: "Aviokompanija");
        }
    }
}
