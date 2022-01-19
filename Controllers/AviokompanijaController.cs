using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Aviokompanija.Models;
using Microsoft.EntityFrameworkCore;

namespace Aviokompanija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AviokompanijaController:ControllerBase
    {
        public AviokompanijaContext Context{get;set;}
        public AviokompanijaController(AviokompanijaContext context)
        {
            Context=context;
        }

        [Route("DodavanjeAviokompanije")]
        [HttpPost]
        public async Task<ActionResult> AddAviokompanija([FromBody]Aviocompany aviokompanija)
        {
            if(aviokompanija.Naziv != " "){
                Context.Aviocompany.Add(aviokompanija);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata aviokompanija!");}
            else 
                return BadRequest("Nije ispravan naziv Aviokompanije");
        }


        [Route("PreuzimanjeAviokompanije")]
        [HttpGet]
         public async Task<JsonResult> GetAviokompanija()
        {
           var aviokompanija=await Context.Aviocompany.Include(x=>x.Airplane).ToListAsync();
           return new JsonResult(aviokompanija);
        }

        [Route("BrisanjeAviokompanije/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAviokompanija(int id)
        {
            var aviokompanija=await Context.Aviocompany.FindAsync(id);
            if (aviokompanija!=null) {
                var avioni=await Context.Airplane.Where(x=>x.Aviokompanija==aviokompanija).ToListAsync();
                if (avioni!=null){
                    avioni.ForEach(avion=>{
                    Context.Airplane.Remove(avion);
                });  
                Context.Aviocompany.Remove(aviokompanija);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana aviokompanija i avioni te aviokompanije!"); 
                }
                else return Ok("Uspesno obrisana aviokompanija ali nema aviona te aviokompanije!"); 
            }
            else
                {
                return BadRequest("Nije uspesno obrisana Aviokompanija");
                }
        }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        [Route("DodavanjeAviona/{idAviokompanija}")]
        [HttpPost]
        public async Task<ActionResult> AddAvion(int idAviokompanija,[FromBody] Avion avion)
        {
            var aviokompanija=await Context.Aviocompany.FindAsync(idAviokompanija);
            if (aviokompanija!=null){
                avion.Aviokompanija=aviokompanija;
                if ((avion.kodniNaziv!=" ")&&(avion.brojSedista<800)&&(avion.brojSedista>20))
                {
                    Context.Airplane.Add(avion);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno dodat avion u aviokompaniju!");
                }
                else return BadRequest("Nije uspesno dodat avion jer nije dobar kodni naziv ili je broj sedista van opsega 20 do 800");
            }
            else return BadRequest("Nije uspesno dodat avion");
        }
        
        [Route("BrisanjeAviona/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAvion(int id)
        {
            var avion1=await Context.Airplane.FindAsync(id);///await saceka unutar funkcije da se vrati promise, await mora sa async
            if (avion1!= null) {
                Context.Airplane.Remove(avion1);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisan avion!");
            }
            else return BadRequest("Brisanje aviona koji ne postoji u bazi");
        }
    
        [Route("PreuzimanjeAvionaIzAviokompanije/{idAviokompanija}")]
        [HttpGet]
        public async Task<JsonResult> PreuzimanjeAvionaIzAviokompanije(int idAviokompanija)
        {
                  
            var avioni=await Context.Airplane.Where(x=>x.Aviokompanija.ID == idAviokompanija).ToListAsync();
            return new JsonResult(avioni);
                // Console.WriteLine("Greska prilikom preuzimanja aviona iz aviokompanije");
                // return new JsonResult("");
        }

        [Route("PreuzimanjePoslednjegAvionaIzAviokompanije/{idAviokompanija}")]
        [HttpGet]
        public async Task<JsonResult> PreuzimanjePoslednjegAvionaIzAviokompanije(int idAviokompanija)
        {
            var avioni=await Context.Airplane.Where(x=>x.Aviokompanija.ID == idAviokompanija).ToListAsync();

            return new JsonResult(avioni[avioni.Count-1]);
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("DodavanjeDestinacija")]
        [HttpPost]
        public async Task<ActionResult> AddDestinacija([FromBody] Destinacija destinacija)
        {
            if (destinacija.Naziv=="") {
                return BadRequest("Dodavanje destinacije neuspesno");
            }
            else {
                Context.Destination.Add(destinacija);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata destinacija!");
            }
        }
        
        [Route("PreuzimanjeDestinacija")]
        [HttpGet]
         public async Task<JsonResult> GetDestinacija()
        {
           var destinacija=await Context.Destination.ToListAsync();
           if (destinacija!=null)
            {
               return new JsonResult(destinacija);
            } 
            else 
            return new JsonResult("");
        }
        

        [Route("PreuzimanjePoslednjeDodateDestinacije")]
        [HttpGet]
         public async Task<JsonResult> GetDestinaciju()
        {
           var destinacija=await Context.Destination.ToListAsync();
           ///if (destinacija!=null)
          // {
               return new JsonResult(destinacija[destinacija.Count-1]);
          // }
          // else 
          // return new JsonResult("");

        }


        
        [Route("PreuzimanjeDestinacije/{idDestinacija}")]
        [HttpGet]
         public async Task<JsonResult> GetDestinacijaWithID(int idDestinacija)
        {
           var destinacija=await Context.Destination.FindAsync(idDestinacija);
           return new JsonResult(destinacija);
        }
       ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
        [Route("PreuzmiZakazanLetZaAvionZaVremenskiInterval/{idAvion}/{vreme1}/{vreme2}")]
        [HttpGet]
        public async Task<JsonResult> PreuzmiZakazanLetZaAvionZaVremenskiInterval(int idAvion,DateTime vreme1,DateTime vreme2)
        {
            var zakazanLet=await Context.DestinationAirplane.Where(x=>x.Avion.ID==idAvion && (x.Vreme>=vreme1 && x.Vreme<=vreme2)).ToListAsync();///////////////////////////////////////////////////////////////////////
            
            return new JsonResult(zakazanLet);
        }


        [Route("PreuzmiZakazanLetZaAvion/{idAvion}")]
        [HttpGet]
        public async Task<JsonResult> PreuzmiZakazanLetZaAvion(int idAvion)
        {
            var zakazanLet=await Context.DestinationAirplane.Where(x=>x.Avion.ID==idAvion).ToListAsync();
            
            return new JsonResult(zakazanLet);
        }
     
        [Route("DodelaDestinacijeIZakazivanjeLetaAviona/{idDestinacijaa}/{idAvion}/{Vreme}")] 
        [HttpPost] 
        public async Task<ActionResult> DodelaDestinacijeIZakazivanjeLetaAviona(int idDestinacijaa,int idAvion,DateTime Vreme,[FromBody] ZakazanLet zakLet)
        {
            var destinacijaPronadjena=await Context.Destination.Where(x=>x.ID==idDestinacijaa).FirstAsync();
            var avionPronadjen= await Context.Airplane.Where(x=>x.ID==idAvion).FirstAsync();

            if (destinacijaPronadjena == null) 
               return BadRequest("Nije pronadjena destinacija!");
            else{
                if (avionPronadjen==null)  
                    return BadRequest("Nije pronadjen avion!");
                else 
                {
                    DateTime DT = new DateTime(2020,01,01,8,0,0);
                    if ((Vreme>DT) && (zakLet.duzinaLeta>30) && (zakLet.duzinaLeta<1000) && ((zakLet.OdlazniLet==1) || (zakLet.OdlazniLet==0)))
                    {
                    ZakazanLet zakazanLet=new ZakazanLet();
                    zakazanLet.Destinacija=destinacijaPronadjena;
                    zakazanLet.Avion=avionPronadjen;
                    zakazanLet.Vreme=Vreme;
                    zakazanLet.OdlazniLet=zakLet.OdlazniLet;
                    zakazanLet.duzinaLeta=zakLet.duzinaLeta;
                    Context.DestinationAirplane.Add(zakazanLet);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno zakazan let!");
                    }
                    else 
                    return BadRequest("Datum leta nije u opsegu koji se prati!");
                }
            }
        }//PROSLEDJIVANJE KROZ BODY.podaci se prosledjuju kao json, preuzimaju preko objekta da.onako kako su nazvani u body delu 
        //fecha, a onda se dodele objektu najcesce iste klase u okviru cs dela
        //ID DESTINACIJE PRETPOSTAVLJAM DA SAM AUTOMATSKI DODAJE
        
        [Route("izmenaZakazanogLeta/{idDestinacijaAvion}/{vreme}/{destinacijaID}/{duzinaLeta}")]
        [HttpPut]
        public async Task<ActionResult> izmenaZakazanogLeta(int idDestinacijaAvion,DateTime vreme,int destinacijaID,int duzinaLeta)
        {
            var da=await Context.DestinationAirplane.FindAsync(idDestinacijaAvion);
            if (da!=null)
            {
                da.Vreme=vreme;
                da.DestinacijaID=destinacijaID;
                da.duzinaLeta=duzinaLeta;
                Context.DestinationAirplane.Update(da);
                await Context.SaveChangesAsync();
                return Ok("Uspesno unete izmene za zakazan let!");
            }
            else
               return BadRequest("Nije pronadjen zakazan let u bazi!");

        }   
        
        [Route("brisanjeZakazanogLeta/{idDestinacijaAvion}")]
        [HttpDelete]
            public async Task<ActionResult> DeleteZakazanogLeta(int idDestinacijaAvion)
        {
            var zakazanLet =await Context.DestinationAirplane.FindAsync(idDestinacijaAvion);
            if (zakazanLet!=null){
                Context.DestinationAirplane.Remove(zakazanLet);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisan zakazan let!");
            } 
            else 
            {
                Console.WriteLine("Greska prilikom brisanja zakazanog leta");
                return BadRequest("Nije pronadjen zakazan let u bazi!"); //ovaj error se javljao cesto ako se brzo klikne na dugme za brisanje leta
            }
        }
     }
}