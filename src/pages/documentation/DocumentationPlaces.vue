<template>
  <article>
    <header>
      <h1>Pays & lieux identifiés</h1>
      <p>
        Pour l'identification des lieux, nous employons, quand elle
        existe, la forme moderne usuelle en français, y compris pour les
        noms de lieux étrangers (Rome, Londres, Augsbourg), laissant «
        telle quelle » la forme ancienne quand elle n'est pas identifiée.
      </p>
      <p>
        Pour la France, les identifications sont par convention faites
        d'après le système administratif des départements et cantons (en
        suivant le Dictionnaire des communes de 1997). <br>
        Bientôt, des liens seront créés entre le
        <a href="https://dicotopo.cths.fr/">Dictionnaire Topographique</a>
        et les différents référentiels de lieux, pour permettre
        l'interopérabilité des données géographiques.
      </p>
      <p>
        Pour les identifications des noms de lieux, il peut être utile de
        consulter les ressources suivantes :
      </p>
      <ul class="bullet-list">
        <li>
          Le Dictionnaire Topographique de la France :
          <a href="https://dicotopo.cths.fr/">DicoTopo</a>
        </li>
        <li>
          La base "Nominatim" d'OpenStreetMap :
          <a
            href="https://nominatim.openstreetmap.org/ui/search.html"
          >Nominatim</a>
        </li>
      </ul>
      <p>
        L’ancrage spatial des documents est donné par les titulatures,
        mais celles-ci sont souvent larges, ou décalées : on a donc choisi
        de retenir la ou les zones impliquées dans l’action ou la
        description notifiée et sanctionnée par l’acte ou le document –
        micro-région gouvernée par des coutumes (juridiques, judiciaires,
        agraires, familiales…), par des usages diplomatiques qui n’ont
        rien d’isolats, mais livrent le souvenir morcelé de pratiques
        entretenues ou négligées, reformées ou disqualifiées au fil d’un
        puissant brassage documentaire ; rapportant ensuite ces briques à
        un ensemble plus vaste, autorisant une identification immédiate et
        parlante.
      </p>
      <p>
        Recourir aux anciennes circonscriptions laïques ou ecclésiastiques
        anciennes, sous couvert d’authenticité, laissait subsister trop
        d’incertitudes, qui auraient fait manquer le projet initial. On
        s’est donc résolu à une solution rustique, évidente et sûre :
        rapporter les lieux retenus aux pays actuels et, sous ces
        derniers, à des circonscriptions contemporaines d’une taille qui
        permît de rapprocher assez aisément les localités, à une échelle
        relativement proche de celle des anciennes provinces et
        principautés – bref, des entités souvent bien représentées par les
        régions françaises ou italiennes (voir les listes ci-dessous).
      </p>
    </header>


    <section>
      <div class="toc">
        <ul>
          <li><a href="#allemagne">Allemagne</a></li>
          <li><a href="#angleterre">Angleterre</a></li>
          <li><a href="#belgique">Belgique</a></li>
          <li><a href="#ecosse">Écosse</a></li>
          <li><a href="#espagne">Espagne</a></li>
          <li><a href="#france">France</a></li>
          <li><a href="#galles">Galles</a></li>
          <li><a href="#irlande">Irlande</a></li>
          <li><a href="#italie">Italie</a></li>
          <li><a href="#paysbas">Pays-Bas</a></li>
          <li><a href="#portugal">Portugal</a></li>
          <li><a href="#republiquetcheque">République tchèque</a></li>
          <li><a href="#suisse">Suisse</a></li>
        </ul>
      </div>
    </section>

    <section>
      <header>
        <h2 id="allemagne">
          Allemagne
        </h2>
      </header>
      <p>
        Les régions répondent bien à notre propos, même si des créations incessantes et des glissements peuvent fausser la compréhension. Les quelques villes se gérant directement hors de ce cadre sont ici rattachées à la région dans laquelle elles sont insérées : Brandenburg pour Berlin, Schleswig-Holstein pour Hamburg, Niedersachsen pour Bremen.
      </p>
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_allemagne.png')"
            alt="carte de l'allemagne"
          >
        </div>
        <div class="column">
          <ul>
            <li>Baden-Württemberg</li>
            <li>Bayern</li>
            <li>Brandenburg et Berlin</li>
            <li>Hessen</li>
            <li>Mecklemburg-Vorpommern</li>
            <li>Nordrhein-Westfalen</li>
            <li>Rheinland-Pfalz</li>
            <li>Saarland</li>
            <li>Sachsen</li>
            <li>Niedersachsen et Bremen</li>
            <li>Sachsen-Anhalt</li>
            <li>Schleswig-Holstein et Hamburg</li>
            <li>Thüringen</li>
          </ul>
        </div>      
      </div>
    </section>

    <section>
      <header>
        <h2 id="angleterre">
          Angleterre
        </h2>
      </header>
      <p>
        La diversité est ici de mise, et pas seulement parce que les entités princières ou royales périphériques,
        Pays de Galles, Écosse, Irlande, progressivement agrégées à l’Angleterre,
        ont gardé leur organisation propre (qui ne sera pas retenue ici), mais encore parce que,
        en Angleterre même, le découpage des diverses circonscriptions est plus d’une fois discontinu et leur
        ancrage historique inégal, alors que le maillage le plus régulier, celui des comtés/<i>shires</i>, 
        est trop fin pour notre propos. Nous nous sommes donc arrêtés aux neuf régions statistiques dans leur état 
        antérieur à 2015 :
      </p>
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_angleterre.png')"
            alt="carte du Royaume-Uni"
          >
        </div>
        <div class="column">
          <ul>
            <li>
              North West England (<a
                href="https://fr.wikipedia.org/wiki/Angleterre_du_Nord-Ouest"
                target="_blank"
              >Angleterre du Nord-Ouest</a>)
            </li>
            <li>
              North East England (<a
                href="https://fr.wikipedia.org/wiki/Angleterre_du_Nord-Est"
                target="_blank"
              >Angleterre du Nord-Est </a>)
            </li>
            <li>
              South East England (<a
                href="https://fr.wikipedia.org/wiki/Angleterre_du_Sud-Est"
                target="_blank"
              >Angleterre du Sud-Est</a>)
            </li>
            <li>
              South West England (<a
                href="https://fr.wikipedia.org/wiki/Angleterre_du_Sud-Ouest"
                target="_blank"
              >Angleterre du Sud-Ouest</a>)
            </li>
            <li>
              East of England (<a
                href="https://fr.wikipedia.org/wiki/Angleterre_de_l%27Est"
                target="_blank"
              >Angleterre de l'Est</a>)
            </li>
            <li>
              Greater London (<a
                href="https://fr.wikipedia.org/wiki/Grand_Londres"
                target="_blank"
              >Grand Londres</a>)
            </li>
            <li>
              East Midlands (<a
                href="https://fr.wikipedia.org/wiki/Midlands_de_l%27Est"
                target="_blank"
              >Midlands de l'Est</a>)
            </li>
            <li>
              West Midlands (<a
                href="https://fr.wikipedia.org/wiki/Midlands_de_l%27Ouest"
                target="_blank"
              >Midlands de l'Ouest</a>)
            </li>
            <li>
              Yorkshire and the Humbe (<a
                href="https://fr.wikipedia.org/wiki/Yorkshire-et-Humber"
                target="_blank"
              >Yorkshire et Humber</a>)
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <header>
        <h2 id="belgique">
          Belgique
        </h2>
      </header>
      <p>
        Le territoire belge est réparti en deux régions, Flandre et
        Wallonie (outre la région de Bruxelles-capitale), comprenant
        chacune cinq provinces – niveau auquel nous nous arrêtons :
      </p>
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_belgique.png')"
            alt="carte de la Belgique"
          >
        </div>
        <div class="column">      
          <h3 class="is-size-4 mt-2">
            Vlaams Gewest (Flandre)
          </h3>
          <ul class="mb-3">
            <li>Antwerpen (Anvers)</li>
            <li>Limburg (Limbourg)</li>
            <li>Oost-Vlaanderen (Flandre-Orientale)</li>
            <li>Vlaams-Brabant (Brabant flamand)</li>
            <li>West-Vlaanderen (Flandre-Occidentale)</li>
          </ul>
          <h3 class="is-size-4 mt-2">
            Wallonie
          </h3>
          <ul>
            <li>Brabant wallon</li>
            <li>Hainaut</li>
            <li>Liège</li>
            <li>Luxembourg</li>
            <li>Namur</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <header>
        <h2 id="ecosse">
          Écosse
        </h2>
      </header>
      <p />
    </section>

    <section>
      <header>
        <h2 id="espagne">
          Espagne
        </h2>
      </header>
      <p>
        Les provinces espagnoles, suivant en partie le modèle des
        départements français, remontent à 1833 et respectent les limites
        des anciens royaumes ibériques, mais leur nombre (55) et leur
        taille les disqualifient pour notre entreprise (source de la carte
        : Imago mundi).
      </p>
     
      <img
        :src="require('@/assets/images/map_espagne.png')"
        alt="carte de l’espagne"
      >
      
      <p>
        Nous nous rabattons donc sur les « Autonomies » (ou « Communautés
        autonomes »), annoncées dans la constitution de 1978 et
        progressivement mises en place, avec un mélange de critères
        historiques et de considérations politiques. Le découpage en 17
        communautés (correspondant à une ou plusieurs provinces) a été
        sanctionné en 1983, et complété en 1995 des deux villes,
        autonomes, de Ceuta et Melilla :
      </p>
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_espagne_2.png')"
            alt="carte de l’espagne"
          >
        </div>
        <div class="column">
          <ul>
            <li>Galicia</li>
            <li>Asturias</li>
            <li>Cantabria</li>
            <li>Pais Vasco</li>
            <li>Navarra</li>
            <li>La Rioja</li>
            <li>Castilla y León</li>
            <li>Madrid</li>
            <li>Aragón</li>
            <li>Cataluña</li>
            <li>Extremadura</li>
            <li>Castilla-La Mancha</li>
            <li>Comunidad valenciana</li>
            <li>Islas Baleares</li>
            <li>Murcia</li>
            <li>Andalucia</li>
            <li>Islas Canarias</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <header>
        <h2 id="france">
          France
        </h2>
      </header>
      <p>
        Les régions, préfigurées en 1960 dans les « Circonscriptions
        d’action régionale » entre lesquelles sont répartis les
        départements, s’imposent d’elles-mêmes par leur taille et leur
        cohérence historique (évidemment imparfaite), avec quelques
        exceptions où les regroupements se font plus arbitraires, ou
        dénoncent d’autres critères, économiques ou démographiques, comme
        la région Centre, étirée du Berry au Chartrain ; Rhône-Alpes
        menant de la Bresse au Dauphiné et de la Savoie au Vivarais ; ou
        encore cet hétéroclite Pays de la Loire, qui s’entend des terres
        riveraines du cours inférieur de la Loire, juxtaposant le Nantais
        arraché à la Bretagne, le Maine, le Bas-Poitou, l’Anjou…
      </p>
      <img
        :src="require('@/assets/images/map_france.png')"
        alt="carte de la france"
      >
      <p>
        À l’attention des lecteurs peu familiers avec ces découpages, nous
        indiquons ci-après, en italique et entre parenthèses, la
        concordance très grossière entre ces régions ou portions de région
        et les principales provinces ou « pays » historiques de France
        (essentiellement d’après J. Moreau,
        <i>Dictionnaire de géographie historique de la Gaule et de la
          France</i>, Paris, 1972, carte n° 3, h.-t.). – Un regroupement des régions
        a été introduit le 1<sup>er</sup> janvier 2016, qui aboutit à des
        ensembles trop larges pour nos besoins.
      </p>
      <ul>
        <li>Alsace (<i>Alsace</i>)</li>
        <li>
          Aquitaine (<i>Guyenne</i>, <i>Périgord</i>, <i>Agenais</i>,
          <i>Gascogne</i>, <i>Béarn</i>)
        </li>
        <li>Auvergne (<i>Auvergne</i>, <i>Velay</i>)</li>
        <li>Bourgogne (<i>Bourgogne</i>, <i>Nivernais</i>)</li>
        <li>Bretagne (<i>Bretagne</i>, sans le <i>Nantais</i>)</li>
        <li>
          Centre (<i>Berry</i>, <i>Touraine</i>, <i>Orléanais</i>,
          <i>Blésois</i>, <i>Dunois</i>, <i>Chartrain</i>)
        </li>
        <li>Champagne-Ardenne (<i>Champagne</i>)</li>
        <li>Corse (<i>Corse</i>)</li>
        <li>Franche-Comté (<i>Franche-Comté</i>)</li>
        <li>Ile-de-France (<i>Ile-de-France</i>)</li>
        <li>
          Languedoc-Roussillon (<i>Roussillon</i>, <i>Languedoc</i>,
          <i>Gévaudan</i>)
        </li>
        <li>Limousin (<i>Limousin</i>, <i>Marche</i>)</li>
        <li>Lorraine (<i>Lorraine</i>)</li>
        <li>
          Midi-Pyrénées (<i>Languedoc</i> [<i>Albigeois</i>,
          <i>Toulousain</i>], <i>Quercy</i>, <i>Rouergue</i>,
          <i>Gascogne</i>, <i>Foix</i>)
        </li>
        <li>
          Nord-Pas-de-Calais (<i>Flandre</i>, <i>Artois</i>,
          <i>Boulonnais</i>)
        </li>
        <li>Basse-Normandie (<i>Normandie</i>)</li>
        <li>Haute-Normandie (<i>Normandie</i>)</li>
        <li>
          Pays de la Loire (<i>Bretagne</i> [<i>Nantais</i>],
          <i>Bas-Poitou</i> [<i>future Vendée</i>], <i>Anjou</i>,
          <i>Maine</i>)
        </li>
        <li>
          Picardie (<i>Picardie</i>, <i>Soissonnais</i>, <i>Laonnois</i>)
        </li>
        <li>
          Poitou-Charentes (<i>Poitou</i>, <i>Aunis</i>, <i>Saintonge</i>,
          <i>Angoumois</i>)
        </li>
        <li>
          Provence-Alpes-Côte d’Azur [PACA] (<i>Provence</i>,
          <i>Comtat-Venaissin</i>, <i>Niçois</i>)
        </li>
        <li>
          Rhône-Alpes (<i>Bresse</i>, <i>Bugey</i>, <i>Dombes</i>,
          <i>Savoie</i>, <i>Lyonnais</i>, <i>Vivarais</i>,
          <i>Dauphiné</i>)
        </li>
      </ul>
    </section>

    <section>
      <header>
        <h2 id="galles">
          Galles
        </h2>
      </header>
      <p />
    </section>

    <section>
      <header>
        <h2 id="irlande">
          Irlande
        </h2>
      </header>
      <p />
    </section>

    <section>
      <header>
        <h2 id="italie">
          Italie
        </h2>
      </header>
      <p>
        Comme en France, les vingt régions, regroupant ici des « provinces
        » au fort substrat historique, offrent un cadre commode :
      </p>
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_italie.png')"
            alt="carte de l’Italie"
          >
        </div><div class="column">
          <ul>
            <li>Piemonte</li>
            <li>Valle d’Aosta</li>
            <li>Liguria</li>
            <li>Lombardia</li>
            <li>Trentino-Alto Adige</li>
            <li>Veneto</li>
            <li>Friuli, Venezia Giulia</li>
            <li>Emilia-Romagna</li>
            <li>Toscana</li>
            <li>Umbria</li>
            <li>Marche</li>
            <li>Lazio</li>
            <li>Abbruzzo</li>
            <li>Molise</li>
            <li>Campania</li>
            <li>Puglia</li>
            <li>Basilicata</li>
            <li>Calabria</li>
            <li>Sicilia</li>
            <li>Sardegna</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <header>
        <h2 id="paysbas">
          Pays-Bas
        </h2>
      </header>
      <p />
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_paysbas.gif')"
            alt="carte des Pays-Bas"
          >
        </div>
        <div class="column">
          <ul>
            <li>Noord-Brabant</li>
            <li>Drenthe</li>
            <li>Flevoland</li>
            <li>Friesland</li>
            <li>Groningen</li>
            <li>Gelderland</li>
            <li>Zuid-Holland</li>
            <li>Noord-Holland</li>
            <li>Limburg</li>
            <li>Overijssel</li>
            <li>Utrecht</li>
            <li>Zeeland</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <header>
        <h2 id="portugal">
          Portugal
        </h2>
      </header>
      <p>
        Prévues dans la constitution de 1976, cinq « régions
        administratives » couvrent le Portugal continental (Madère et les
        Açores n’ont plus la qualité de régions autonomes), et regroupent,
        en les partageant parfois, un total de 18 districts :
      </p>
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_portugal.png')"
            alt="carte du Portugal"
          >
        </div><div class="column">
          <ul>
            <li>Norte</li>
            <li>Centro</li>
            <li>Lisboa</li>
            <li>Alentejo</li>
            <li>Algarve</li>
          </ul>
        </div>
      </div>
    </section>
 
    <section>
      <header>
        <h2 id="republiquetcheque">
          République tchèque
        </h2>
      </header>
      <p>
        La Bohème et la Moravie sont réparties entre onze provinces
        administratives (<i>kraj</i>), à la filiation historique peu
        affirmée :
      </p>
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_republique_tcheque.png')"
            alt="carte de la République tchèque"
          >
        </div><div class="column">
          <h3 class="is-size-4 mt-2">
            En Bohême
          </h3>
          <ul>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/Boh%C3%AAme-Centrale"
                target="_blank"
              >Bohême centrale</a>
              (<i>Středočeský kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Karlovy_Vary"
                target="_blank"
              >Région de Karlovy Vary</a>
              (<i>Karlovarský kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Hradec_Kr%C3%A1lov%C3%A9"
                target="_blank"
              >Région de Hradec Králové</a>
              (<i>Královéhradecký kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Liberec"
                target="_blank"
              >Région de Liberec</a>
              (<i>Liberecký kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Plze%C5%88"
                target="_blank"
              >Région de Plzeň</a>
              (<i>Plzeňský kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_d'%C3%9Ast%C3%AD_nad_Labem"
                target="_blank"
              >Région d’Ústí nad Labem</a>
              (<i>Ústecký kraj</i>)
            </li>
          </ul>
          <h3 class="is-size-4 mt-2">
            À cheval entre Bohême et Moravie
          </h3>
          <ul>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/Boh%C3%AAme-du-Sud"
                target="_blank"
              >Bohême-du-Sud</a>
              (<i>Jihočeský kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Pardubice"
                target="_blank"
              >Région de Pardubice</a>
              (<i>Pardubický kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Vyso%C4%8Dina"
                target="_blank"
              >Région de Vysočina</a>
              (<i>Kraj Vysočina ou Vysočina</i>).
            </li>
          </ul>
          <h3 class="is-size-4 mt-2 ">
            En Moravie
          </h3>
          <ul>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/Moravie-du-Sud"
                target="_blank"
              >Moravie-du-Sud</a>
              (<i>Jihomoravský kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Zl%C3%ADn"
                target="_blank"
              >Région de Zlín</a>
              (<i>Zlínský kraj</i>).
            </li>
          </ul>
          <h3 class="is-size-4 mt-2">
            À cheval entre Moravie et Silésie
          </h3>
          <ul>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Moravie-Sil%C3%A9sie"
                target="_blank"
              >Moravie-Silésie</a>
              (<i>Moravskoslezský kraj</i>)
            </li>
            <li>
              <a
                href="https://fr.wikipedia.org/wiki/R%C3%A9gion_d'Olomouc"
                target="_blank"
              >Région d’Olomouc</a>
              (<i>Olomoucký kraj</i>).
            </li>
          </ul>
        </div>
      </div>
    </section>
      
    <section>
      <header>
        <h2 id="suisse">
          Suisse
        </h2>
      </header>

      <p>
        Le cadre cantonal s’impose, de par son poids historique, malgré la finesse relative de son maillage. On a réuni sous une seule entrée deux groupes de cantons : Appenzell-Rhodes Extérieurs et Appenzell-Rhodes-Intérieurs ; Bâle-Ville et Bâle-Campagne.
      </p>
      <div class="columns">
        <div class="column">
          <img
            :src="require('@/assets/images/map_suisse.jpg')"
            alt="carte de la Suisse"
          >
        </div>
        <div class="column">
          <ul>
            <li>Appenzell</li>
            <li>Argovie</li>
            <li>Bâle</li>
            <li>Berne</li>
            <li>Fribourg</li>
            <li>Genève</li>
            <li>Glaris</li>
            <li>Grisons</li>
            <li>Jura</li>
            <li>Lucerne</li>
            <li>Neuchâtel</li>
            <li>Nidwald</li>
            <li>Obwald</li>
            <li>Saint-Gall</li>
            <li>Schaffouse</li>
            <li>Schwytz</li>
            <li>Soleure</li>
            <li>Zurich</li>
          </ul>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
    name: 'DocumentationPlaces'
}
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 50px;
}
</style>