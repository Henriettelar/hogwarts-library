# Hogwarts Bibliotek
Lille API der holder styr på bøger i biblioteket på Hogwarts og udlåning af bøger

Al data gemmes lokalt i ens egen database, ingen ekstern api.

## Opstart
For at køre systemet, skal der først oprettes en MongoDB med database navnet 'hogwarts-library' og en collection med navnet 'books'. Derefter kan app.js køres på localhost:3000, dog kun i Postman da der ikke er nogen frontend.

## Brug af AI-agent
Denne API er udviklet med brug af AI-agenter. Der er oprettet 3 issues til dette projekt som agenten har taget udgangspunkt i. Agenten har arbejdet med et issue ad gangen for at opdele opgaven i mindre dele så det var nemmere at kunne overskue hvad der var blevet tilføjet.

For hver implementering er der blevet gennemlæst hvad der er tilføjet samt er der blevet lavet review, både af mig selv, men også af Co-pilot på github, dvs. uden viden til hvad der er snakket med agenten der har skrevet koden, for at se igennem hvad der er ændret.

### Issues
#### Issue 1
Første issue gik ud på at opsætte projektet, modellen og den første route, hent en lister over bøger.

I issuet blev der opsat en mappestruktur som agenten skulle følge, derefter blev der opsat nogle krav til det enkelte issue. 
Efter det var implementeret, blev der tjekket at strukturen var sat op rigtigt samt testet på om funktionen fungere som det skulle. 

Til at starte med havde agenten ikke helt fulgt mappestrukturen, men efter at have sagt til den direkte at den skulle bruge strukturen, blev det implementeret. Det var blandt andet middlewares der ikke blev implementeret samt en enkelt fil jeg ikke havde specificeret der var med, som blev brugt af agenten i stedet for at fjerne den så det passede med strukturen. 

Efter det var tjekket igennem blev der foretaget et pull request og review request af Copilot på GitHub. 

#### Issue 2
Andet issue var at implementere oprettelse og lån af bog.

Dette issue gik ud på at arbejde videre med det eksisterende projekt og tilføje to funktioner, at oprette en bog og at en person kunne låne en bog.
Samme som i issue 1 blev der også sat nogle krav op som agenten skulle følge, her med statuskoder, både hvis det blev gennemført og når det fejlede.

Her var der nogle småfejl der skulle rettes, her nogle fra app.js, dog var det ikke alle jeg fik noteret derfor udelades de. Derfor snakkes der her kun om de ændringer som copilot foreslog. 

Der blev implementeret lidt bedre håndtering af oprettelse af bøger i forhold til at tjekke efter titlen af bogen, samt til at tjekke studentName var en streng når der skulle foretages et lån af en bog.

Ændringerne blev commitet og der blev foretaget endnu et review, hvor der derefter blev merget branchen til master.

#### Issue 3
Tredje issue var simpel test og tilføjelse af hent af enkelt bog.

Der skulle tilføjes en sidst route med hent af en enkelt bog ud fra id og test til funktionerne i systemet. 

Testene blev gennemført korrekt, og som ekstra tjek for at sikre at de fungere, blev der også testet i Postman, både får funktioner der skulle lykkedes og dem der fejlede med de tilsvarende statuskoder og fejlbesdker til hver. 

## Arbejdsprocessen
Selve arbejdsprocessen var ret simpel, start med at oprette alle issues, vælg derefter den først at arbejde med og fokuser på den sammen med agenten, og til sidst tjek igennem og ret til det der er blevet implementeret.

Det går hurtigere at bruge en agent til at lave koden for en, dog er derefter meget der skal tjekkes igennem for at sikre sig at der er blevet implementeret de tilhørende krav og ikke andet unødvendig kode.

## Test
Inde i projektet findes der test under tests-mappen. Der kan der køres books.test.js for 9 forskellige test:
1. Oprettelse af 3 bøger til at starte med så man har bøger når man kører programmet
2. Hent alle bøger
3. Hent bestemt bog
4. Hent bestemt bog der ikke findes (skal give fejl)
5. Oprettelse af bog
6. Oprettelse af bog uden titel (skal give fejl)
7. Lån ledig bog
8. Lån optaget bog (skal give fejl)
9. lån ledig bog uden elevnavn (skal give fejl)
