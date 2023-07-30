using AccessData.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessData.Data
{
    public class DataContext : DbContext
    {
        public DataContext() { }
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {

        }

        public DbSet<SousDirection> SousDirection { get; set; }
        public DbSet<Division> Division { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<Fonctionnaire> Fonctionnaire { get; set; }
        public DbSet<Requete> Requete { get; set; }
        public DbSet<Bureau> Bureau { get; set; }
        public DbSet<Equipement> Equipement { get; set; }
        public DbSet<Equipement_Fonctionnaire> Equipement_Fonctionnaire { get; set; }
        public DbSet<Equipement_Bureau> Equipement_Bureau { get; set; }
        public DbSet<TypeEquipement> TypeEquipement { get; set; }
        public DbSet<Marché> Marché { get; set; }
        public DbSet<Caractéristique> Caractéristique { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Caractéristique>().HasKey(c => c.ID_Caracteristique);
            modelBuilder.Entity<Division>().HasKey(d => d.Division_ID);
            modelBuilder.Entity<Equipement>().HasKey(e => e.Equipement_ID);
            modelBuilder.Entity<Fonctionnaire>().HasKey(f => f.Fonctionnaire_ID);
            modelBuilder.Entity<Marché>().HasKey(m => m.Num_Marche);
            modelBuilder.Entity<Requete>().HasKey(r => r.Num_Identification);
            modelBuilder.Entity<Service>().HasKey(s => s.Service_ID);
            modelBuilder.Entity<SousDirection>().HasKey(sd => sd.SousDirection_ID);
            modelBuilder.Entity<TypeEquipement>().HasKey(te => te.ID_Type);



            modelBuilder.Entity<Equipement_Fonctionnaire>()
                .HasKey(ef => new { ef.Equipement_ID, ef.Fonctionnaire_ID });
            modelBuilder.Entity<Equipement_Fonctionnaire>()
                .HasOne(e => e.Equipements)
                .WithMany(ef => ef.EquipementFonctionnaire)
                .HasForeignKey(e => e.Equipement_ID);
            modelBuilder.Entity<Equipement_Fonctionnaire>()
                .HasOne(f => f.Fonctionnaires)
                .WithMany(ef => ef.Equipement_Fonctionnaire)
                .HasForeignKey(f => f.Fonctionnaire_ID);

            modelBuilder.Entity<Equipement_Bureau>()
                .HasKey(eb => new { eb.Equipement_ID, eb.Bureau_ID });
            modelBuilder.Entity<Equipement_Bureau>()
                .HasOne(e => e.Equipements)
                .WithMany(eb => eb.EquipementBureau)
                .HasForeignKey(e => e.Equipement_ID);
            modelBuilder.Entity<Equipement_Bureau>()
                .HasOne(b => b.Bureaux)
                .WithMany(eq => eq.EquipementBureau)
                .HasForeignKey(b => b.Bureau_ID);



            modelBuilder.Entity<Requete>()
                .HasOne(r => r.Fonctionnaire_admin)
                .WithMany()
                .HasForeignKey(r => r.Administrateur_ID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Requete>()
                .HasOne(r => r.Fonctionnaire_tech)
                .WithMany()
                .HasForeignKey(r => r.Technicien_ID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Requete>()
                .HasOne(r => r.Fonctionnaire_fonc)
                .WithMany()
                .HasForeignKey(r => r.Fonctionnaire_ID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
