using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Aviokompanija.Models{
    [Table("Aviokompanija")]
    public class Aviocompany
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti naziv aviokompanije!")]
        [Column("Naziv")]
        public string Naziv{get;set;}

        [StringLength(40)] 
        [Required(ErrorMessage="Neophodno je uneti lokaciju aviokompanije!")]
        [Column("lokacija")]
        public string lokacija {get;set;}
        public List<Avion> Airplane{get;set;}

    public Aviocompany()
    {
        Airplane=new List<Avion>();
    }
    }
}