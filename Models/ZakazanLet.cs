using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System;
namespace Aviokompanija.Models
{
    public class ZakazanLet{
        public int ID{get;set;}
        [JsonIgnore]
        public Avion Avion{get;set;}
        public int AvionID{get;set;}
        [JsonIgnore]
        public Destinacija Destinacija{get;set;}
        public int DestinacijaID{get;set;}
        [Column("Vreme")]
        public DateTime Vreme{get;set;}
        [Column("OdlazniLet")]
        public int OdlazniLet{get;set;}
        [Column("duzinaLeta")]
        public int duzinaLeta{get;set;}
        }
}
