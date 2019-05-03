# Stella Polaris Dashboard
Denne webapplikasjonen er en del av en bachelor i automasjon ved [Universitetet i Tromsø - Norges Arktiske universitet](https://uit.no/startsida)<br>

Oppgaven er gitt av [Haneseth Automasjon](automasjon.haneseth.no) og levert 15. mai 2019<br>

Se [rapporten i sin helhet](https://#).<br>
Se [video av brukergrensesnittet](https://#).<br>

## Lokalt utviklingsområde

Åpne terminal/ledetekst og utfør følgende steg:
```
cd stella-polaris-dashboard
npm install
npm start
```

Kjør siden lokalt under utvikling.<br>
Åpne [http://localhost:3000](http://localhost:3000) for å se siden i nettleseren.<br>
Innhenting av API-er fra MindSphere vil ikke fungere lokalt.<br>


## MindSphere API

Løsningen benytter primært [IoT Time Series Service ](https://developer.mindsphere.io/apis/index.html). Det finnes flere typer API-er som kan implementeres.<br>

Les om de ulike API-ene på [MindSphere Services](https://developer.mindsphere.io/apis/index.html).<br>

## Cloud Foundry

Distribusjon av løsningen til Cloud Foundry.<br>

manifest.yml - Cloud Foundry konfigurasjoner.<br>
package.json - dependencies og pakker som Cloud Foundry installerer.

### Oppskrift

1. Åpne terminal/ledetekst
2. Gå til applikasjonsmappen `cd mappesti/stella-polaris-dashboard`
2. Skriv inn `cf login -a https://api.cf.{region}.{mindsphere-domain} --sso`
3. Klikk på lenken i terminalen, logg inn med MindSphere konto for å få en <i>One Time Code</i>.
4. Skriv inn <i>One Time Code</i> fra steget ovenfor i terminalen.
5. Velg org og område: `cf target -o {org_name} -s {space_name}`
7. Push applikasjonen til området: `cf push`


Les mer om prosessen på [Running a Cloud Foundry-Hosted Application](https://developer.mindsphere.io/howto/howto-cf-running-app.html).<br>

## Mulige forberedninger

- [] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request

