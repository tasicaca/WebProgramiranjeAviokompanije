using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Aviokompanija.Models{
    [Table("Avion")]
    public class Avion
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}
        [Column("kodniNaziv")]

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti naziv aviona!")]
        public string kodniNaziv{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti zemlju destinacija!")]
        [Column("model")]
        public string model{get;set;}

        [Column("brojSedista")]
        public int brojSedista{get;set;}
        [JsonIgnore]     ////sluzi da spreci serijaliz.
        public virtual Aviocompany Aviokompanija{get;set;}
        
        public List<ZakazanLet> ZakazanLet{get;set;}
        public Avion()
        {
            ZakazanLet=new List<ZakazanLet>();
        }

    }
}