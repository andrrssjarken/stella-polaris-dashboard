# Stella Polaris Dashboard
Denne webapplikasjonen er en del av en bachelor i automasjon ved Universitetet i Tromsø.<br>
Oppgaven er gitt av Haneseth Automasjon [https://automasjon.haneseth.no](automasjon.haneseth.no) og utført av Anders Nystad Bendiksen, Erlend Willassen og Jonas Nordal.<br>

Se [rapporten i sin helhet](https://#).<br>
Se [video av brukergrensesnittet](https://#).<br>

# Start utviklingsområde

```
cd stella-polaris-dashboard
npm install
npm start
```

Kjør siden lokalt under utvikling.<br>
Åpne [http://localhost:3000](http://localhost:3000) for å se siden i nettleseren.


# MindSphere

### MindSphere API

Les om de ulike API-ene på [MindSphere API](https://developer.mindsphere.io/apis/index.html).<br>

# Cloud Foundry

Etter at løsningen er i produksjonsmodus må det distribueres til Cloud Foundry.

manifest.yml inneholder Cloud Foundry konfigurasjon.
package.json inneholder dependencies og pakker som Cloud Foundry installerer ved distribusjon.

### Oppskrift

1. Åpne terminal/command prompt
2. Gå til mappen der applikasjonen ligger: `cd mappesti`
2. Skriv inn: `cf login -a https://api.cf.{region}.{mindsphere-domain} --sso`
3. Klikk på lenken i terminalen, logg inn med din MindSphere konto for å få en <i>One Time Code</i>.
4. Skriv inn <i>One Time Code</i> fra steget ovenfor i terminalen.
5. Velg org og område: `cf target -o {org_name} -s {space_name}`
7. Push applikasjonen til området: `cf push`


Les om på [Running a Cloud Foundry-Hosted Application](https://developer.mindsphere.io/howto/howto-cf-running-app.html).<br>




