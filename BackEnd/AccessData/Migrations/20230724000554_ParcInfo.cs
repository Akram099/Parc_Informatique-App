using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessData.Migrations
{
    /// <inheritdoc />
    public partial class ParcInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Caractéristique",
                columns: table => new
                {
                    ID_Caracteristique = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CPU = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Memoire_RAM = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Disque_dur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Vitesse = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Caractéristique", x => x.ID_Caracteristique);
                });

            migrationBuilder.CreateTable(
                name: "Marché",
                columns: table => new
                {
                    Num_Marche = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date_marche = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_reception = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Fournisseur = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Marché", x => x.Num_Marche);
                });

            migrationBuilder.CreateTable(
                name: "SousDirection",
                columns: table => new
                {
                    SousDirection_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom_SousDirection = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SousDirection", x => x.SousDirection_ID);
                });

            migrationBuilder.CreateTable(
                name: "TypeEquipement",
                columns: table => new
                {
                    ID_Type = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nom_Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeEquipement", x => x.ID_Type);
                });

            migrationBuilder.CreateTable(
                name: "Division",
                columns: table => new
                {
                    Division_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom_Division = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SousDirection_ID = table.Column<int>(type: "int", nullable: false),
                    SousDirectionsSousDirection_ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Division", x => x.Division_ID);
                    table.ForeignKey(
                        name: "FK_Division_SousDirection_SousDirection_ID",
                        column: x => x.SousDirection_ID,
                        principalTable: "SousDirection",
                        principalColumn: "SousDirection_ID");
                });

            migrationBuilder.CreateTable(
                name: "Equipement",
                columns: table => new
                {
                    Equipement_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Archivee = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Num_Serie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ID_Type = table.Column<int>(type: "int", nullable: false),
                    TypeEquipementsID_Type = table.Column<int>(type: "int", nullable: true),
                    Num_Marche = table.Column<int>(type: "int", nullable: false),
                    MarchésNum_Marche = table.Column<int>(type: "int", nullable: true),
                    ID_Caracteristique = table.Column<int>(type: "int", nullable: false),
                    CaractéristiquesID_Caracteristique = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipement", x => x.Equipement_ID);
                    table.ForeignKey(
                        name: "FK_Equipement_Caractéristique_ID_Caracteristique",
                        column: x => x.ID_Caracteristique,
                        principalTable: "Caractéristique",
                        principalColumn: "ID_Caracteristique");
                    table.ForeignKey(
                        name: "FK_Equipement_Marché_Num_Marche",
                        column: x => x.Num_Marche,
                        principalTable: "Marché",
                        principalColumn: "Num_Marche");
                    table.ForeignKey(
                        name: "FK_Equipement_TypeEquipement_ID_Type",
                        column: x => x.ID_Type,
                        principalTable: "TypeEquipement",
                        principalColumn: "ID_Type");
                });

            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    Service_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom_Service = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Division_ID = table.Column<int>(type: "int", nullable: false),
                    DivisionsDivision_ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.Service_ID);
                    table.ForeignKey(
                        name: "FK_Service_Division_Division_ID",
                        column: x => x.Division_ID,
                        principalTable: "Division",
                        principalColumn: "Division_ID");
                });

            migrationBuilder.CreateTable(
                name: "Fonctionnaire",
                columns: table => new
                {
                    Fonctionnaire_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Service_ID = table.Column<int>(type: "int", nullable: false),
                    ServicesService_ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fonctionnaire", x => x.Fonctionnaire_ID);
                    table.ForeignKey(
                        name: "FK_Fonctionnaire_Service_Service_ID",
                        column: x => x.Service_ID,
                        principalTable: "Service",
                        principalColumn: "Service_ID");
                });

            migrationBuilder.CreateTable(
                name: "Bureau",
                columns: table => new
                {
                    Bureau_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numéro_Bureau = table.Column<int>(type: "int", nullable: false),
                    Batiment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fonctionnaire_ID = table.Column<int>(type: "int", nullable: false),
                    FonctionnairesFonctionnaire_ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bureau", x => x.Bureau_ID);
                    table.ForeignKey(
                        name: "FK_Bureau_Fonctionnaire_Fonctionnaire_ID",
                        column: x => x.Fonctionnaire_ID,
                        principalTable: "Fonctionnaire",
                        principalColumn: "Fonctionnaire_ID");
                });

            migrationBuilder.CreateTable(
                name: "Equipement_Fonctionnaire",
                columns: table => new
                {
                    Equipement_ID = table.Column<int>(type: "int", nullable: false),
                    Fonctionnaire_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipement_Fonctionnaire", x => new { x.Equipement_ID, x.Fonctionnaire_ID });
                    table.ForeignKey(
                        name: "FK_Equipement_Fonctionnaire_Equipement_Equipement_ID",
                        column: x => x.Equipement_ID,
                        principalTable: "Equipement",
                        principalColumn: "Equipement_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Equipement_Fonctionnaire_Fonctionnaire_Fonctionnaire_ID",
                        column: x => x.Fonctionnaire_ID,
                        principalTable: "Fonctionnaire",
                        principalColumn: "Fonctionnaire_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Requete",
                columns: table => new
                {
                    Num_Identification = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    date_prise_en_charge = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_cloture = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Etat_Requete = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Administrateur_ID = table.Column<int>(type: "int", nullable: false),
                    Technicien_ID = table.Column<int>(type: "int", nullable: false),
                    Fonctionnaire_ID = table.Column<int>(type: "int", nullable: false),
                    Fonctionnaire_ID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requete", x => x.Num_Identification);
                    table.ForeignKey(
                        name: "FK_Requete_Fonctionnaire_Administrateur_ID",
                        column: x => x.Administrateur_ID,
                        principalTable: "Fonctionnaire",
                        principalColumn: "Fonctionnaire_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Requete_Fonctionnaire_Fonctionnaire_ID",
                        column: x => x.Fonctionnaire_ID,
                        principalTable: "Fonctionnaire",
                        principalColumn: "Fonctionnaire_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Requete_Fonctionnaire_Technicien_ID",
                        column: x => x.Technicien_ID,
                        principalTable: "Fonctionnaire",
                        principalColumn: "Fonctionnaire_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Equipement_Bureau",
                columns: table => new
                {
                    Equipement_ID = table.Column<int>(type: "int", nullable: false),
                    Bureau_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipement_Bureau", x => new { x.Equipement_ID, x.Bureau_ID });
                    table.ForeignKey(
                        name: "FK_Equipement_Bureau_Bureau_Bureau_ID",
                        column: x => x.Bureau_ID,
                        principalTable: "Bureau",
                        principalColumn: "Bureau_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Equipement_Bureau_Equipement_Equipement_ID",
                        column: x => x.Equipement_ID,
                        principalTable: "Equipement",
                        principalColumn: "Equipement_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bureau_Fonctionnaire_ID",
                table: "Bureau",
                column: "Fonctionnaire_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Division_SousDirection_ID",
                table: "Division",
                column: "SousDirection_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Equipement_ID_Caracteristique",
                table: "Equipement",
                column: "ID_Caracteristique");

            migrationBuilder.CreateIndex(
                name: "IX_Equipement_Num_Marche",
                table: "Equipement",
                column: "Num_Marche");

            migrationBuilder.CreateIndex(
                name: "IX_Equipement_ID_Type",
                table: "Equipement",
                column: "ID_Type");

            migrationBuilder.CreateIndex(
                name: "IX_Equipement_Bureau_Bureau_ID",
                table: "Equipement_Bureau",
                column: "Bureau_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Equipement_Fonctionnaire_Fonctionnaire_ID",
                table: "Equipement_Fonctionnaire",
                column: "Fonctionnaire_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Fonctionnaire_Service_ID",
                table: "Fonctionnaire",
                column: "Service_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Requete_Administrateur_ID",
                table: "Requete",
                column: "Administrateur_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Requete_Fonctionnaire_ID",
                table: "Requete",
                column: "Fonctionnaire_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Requete_Fonctionnaire_ID1",
                table: "Requete",
                column: "Fonctionnaire_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Requete_Technicien_ID",
                table: "Requete",
                column: "Technicien_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Service_Division_ID",
                table: "Service",
                column: "Division_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Equipement_Bureau");

            migrationBuilder.DropTable(
                name: "Equipement_Fonctionnaire");

            migrationBuilder.DropTable(
                name: "Requete");

            migrationBuilder.DropTable(
                name: "Bureau");

            migrationBuilder.DropTable(
                name: "Equipement");

            migrationBuilder.DropTable(
                name: "Fonctionnaire");

            migrationBuilder.DropTable(
                name: "Caractéristique");

            migrationBuilder.DropTable(
                name: "Marché");

            migrationBuilder.DropTable(
                name: "TypeEquipement");

            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropTable(
                name: "Division");

            migrationBuilder.DropTable(
                name: "SousDirection");
        }
    }
}
