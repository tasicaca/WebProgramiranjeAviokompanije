using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Aviokompanija.Models{
    [Table("Destinacija")]
    public class Destinacija
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti naziv destinacije!")]
        [Column("Naziv")]
        public string Naziv{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti zemlju destinacija!")]
        [Column("zemlja")]
        public string zemlja{get;set;}

        [StringLength(30)] 
        [Column("nazivAerodroma")]
        public string nazivAerodroma{get;set;}
        
        public List<ZakazanLet> ZakazanLet {get;set;}
        public Destinacija()
        {
            ZakazanLet=new List<ZakazanLet>();
        }
    }
}