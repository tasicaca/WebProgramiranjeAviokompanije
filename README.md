# Web programiranje
Projekat Aviokompanije, korišćenjem JavaScripta, .NET-a i platforme Azure

Projekat predstavlja aplikaciju za pracenje saobraćaja razlicitih aerodroma. 
Moguce je imati vise instanci aviokompanija koje koriste aerodrom kao svoje sediste. 
Za svaku aviokompaniju prate se avioni koji lete od ili do sedišta aviokompanije. Za svaki avion predstavljeni su letovi ka destinacijama i od destinacija ka aerodromu čvoristu (odlazni i dolazni letovi predstavljeni razlicitim bojama). 
Moguce je uključiti novi avion u saobraćaj odredjene aviokompanije, kao i iskljuciti avion iz saobracaja. 
Moguce je kreirati termine dolaznih i odlaznih letova, kao i birati destinacije aviona. 
Takodje je moguce obrisati let sa određene destinacije ili ka odredjenoj destinaciji, kao i obrisati celokupnu aviokompaniju. 

Destinacije i Avioni povezani su vezom N:M, preko klase ZakazanLet, dok Aviokompanija ima svoje Avione.
 
