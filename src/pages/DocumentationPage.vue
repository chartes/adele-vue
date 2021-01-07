<template>
  <div class="container documentation-page">
    <div class="top">
      <div class="columns main-columns">
        <div class="column main-column is-3 themes">
          <div class="content">
            <p class="column-title">
              Documentation
            </p>
            <ul>
              <li>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Accueil</p>
                  </div>
                  <div class="card-content">
                    <ul class="doc-tabs">
                      <li
                        id="about"
                        @click="goTo('about')"
                      >
                        À propos
                      </li>
                      <li
                        id="contact"
                        @click="goTo('contact')"
                      >
                        Contact
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Référentiels de données</p>
                  </div>
                  <div class="card-content">
                    <ul class="doc-tabs">
                      <li
                        id="dates"
                        @click="goTo('dates')"
                      >
                        Dates
                      </li>
                      <li
                        id="facsimile"
                        @click="goTo('facsimile')"
                      >
                        Images & facsimilés
                      </li>

                      <li
                        id="institutions"
                        @click="goTo('institutions')"
                      >
                        Institutions
                      </li>

                      <li
                        id="langs"
                        @click="goTo('langs')"
                      >
                        Langues des documents
                      </li>
                      <li
                        id="speech-parts"
                        @click="goTo('speech-parts')"
                      >
                        Parties du discours
                      </li>
                      <li
                        id="places"
                        @click="goTo('places')"
                      >
                        Pays & lieux identifiés
                      </li>
                      <li
                        id="persons"
                        @click="goTo('persons')"
                      >
                        Personnes identifiées
                      </li>
                      <li
                        id="tradition"
                        @click="goTo('tradition')"
                      >
                        Tradition
                      </li>
                      <li
                        id="acte-types"
                        @click="goTo('acte-types')"
                      >
                        Types d'acte
                      </li>
                      <li
                        id="commentaries"
                        @click="goTo('commentaries')"
                      >
                        Types de commentaires
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="column content-column">
          <div
            v-if="$attrs.section === 'about' || $attrs.section === null"
          >
            <h1>À propos</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'acte-types'"
          >
            <h1>Types d'auteurs et de documents</h1>
          
            <p>
              Il a été choisi de distinguer la typologie des actes et des documents en deux parties distinctes, mais non excluantes. 
              Ainsi, un même dossier peut être caractérisé par un élément « auteur » et un « document de gestion ». Tel est le cas du dossier n° 48, traitant d'un acte scellé par un notaire à titre personnel à Tarbes. <br>
              Pour plus de clarté, la différenciation entre « auteur » et « type de documents » a été effectuée.
            </p>

            <div class="columns toc">
              <div class="column">
                <a href="#ac-A"><h2>A – Actes, auteurs</h2></a>
                <ul>
                  <li><a href="#ac-pape">Pape et entourage</a></li>
                  <li><a href="#ac-eveque">Évêque et entourage</a></li>
                  <li><a href="#ac-religieux">Religieux</a></li>
                  <li><a href="#ac-souverain">Souverain</a></li>
                  <li><a href="#ac-prince">Du prince au baron</a></li>
                  <li><a href="#ac-administration">Administration séculière centrale et locale</a></li>
                  <li><a href="#ac-seigneurs">Seigneurs et particuliers</a></li>
                  <li><a href="#ac-municipalite">Municipalité, communauté</a></li>
                  <li><a href="#ac-actes">Actes privés, Système traditionnels</a></li>
                  <li><a href="#ac-notaire">Notaire public</a></li>
                  <li><a href="#ac-jur-ecc">Juridiction gracieuse ecclésiastique</a></li>
                  <li><a href="#ac-jur-gra">Juridiction gracieuse laïque</a></li>
                </ul>
              </div>
              <div class="column">
                <a href="#ac-B"><h2>B – Documents de gestion, type</h2></a>
                <ul>
                  <li><a href="#ac-domaniale">Documents de gestion domaniale</a></li>
                  <li><a href="#ac-inventaire">Inventaires de biens</a></li>
                  <li><a href="#ac-feodaux">Documents féodaux</a></li>
                  <li><a href="#ac-comptables">Documents comptables, financiers et fiscaux</a></li>
                  <li><a href="#ac-production">Documents propres à la production, aux échanges et au travail</a></li>
                  <li><a href="#ac-militaires">Documents militaires</a></li>
                  <li><a href="#ac-diplomatie">Documents propres à la diplomatie</a></li>
                  <li><a href="#ac-justice">Documents propres à la justice</a></li>
                  <li><a href="#ac-enseignement">Documents propres à l’enseignement</a></li>
                  <li><a href="#ac-assistance">Documents propres à l’assistance</a></li>
                  <li><a href="#ac-ecc">Documents propres aux archives ecclésiastiques</a></li>
                  <li><a href="#ac-princ">Documents propres aux archives royales et princières</a></li>
                  <li><a href="#ac-arch-muni">Documents propres aux archives municipales</a></li>
                  <li><a href="#ac-arch-seign">Documents propres aux archives seigneuriales et de particuliers</a></li>
                </ul>
              </div>
            </div>

            <h2 id="ac-A">
              A – Actes, auteurs
            </h2>
            <p>
              Il est nécessaire de faire la distinction entre l'auteur de l'acte écrit et l'auteur de l'action juridique. <br>
              L'auteur de l'acte écrit est <i>l'auctor</i>, celui qui garantit et protège l'acte. Son nom est présent en début d'acte, dans la suscription, et est parfois rappelé par le sceau ou dans les validations finales.
            </p>
            <p>Les types précis (lettre patente sur double queue, terrier…) sont précisés en titre. Les termes et le découpage sont modelés au plus près possible sur ceux de la base <a href="http://elec.enc.sorbonne.fr/bede/">Bède</a>.</p>
            <dl>
              <dt id="ac-pape">
                Pape et entourage
              </dt>
              <dd>
                Il s'agit de documents réalisé par la chancellerie apostolique, ou par des représantants du Pape dans les royaumes européens.
                <br>
                Inclut : Cardinaux, Légats, Conciles<br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Actes pontificaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter66.php">http://elec.enc.sorbonne.fr/bede/feuilleter66.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div><ul>
                  <li>« Lettres pontificales sur fil de chanvre. Aux origines de la Sorbonne : le pape demande à l'évêque de Paris d'autoriser l'installation d'un oratoire dans le collège » : <a href="https://dev.chartes.psl.eu/adele/documents/41/view/notice">n° 41</a></li>
                  <li>« Lettres pontificales (copie contemporaine au registre de chancellerie). Le pape, le roi, les moniales : confirmation de dons d'églises de Brno à des cisterciennes de Moravie » : <a href="https://dev.chartes.psl.eu/adele/documents/95/view/notice">n° 95</a></li>
                </ul>
              </dd>

              <dt id="ac-eveque">
                Évêque et entourage
              </dt>
              <dd>
                Il peut s'agit de documents relatifs à la spiritualité, et à la gestion des églises et paroisses de son évêché. On retrouvera dans cette typologie des actes concernant les impôts ecclésiastiques, des possessions de l'évêque ou de l'entourage de l'évêque (ainsi le chancelier de la cathédrale, pour le dossier n° 82). <br>
                L'évêque peut également être un seigneur (l'évêque de Beauvais était également comte de Beauvais). Ainsi, la mention « Évêque et entourage » peut être associée à un document de gestion, ou à un autre auteur. C'est le cas pour le dossier n° 63, où il est question d'un acte notarié dans lequel l'évêque est partie prenante. L'acte est ainsi caractérisé par les éléments « Évêque et entourage » et « Notaire public ». <br>
                Inclut : Archevêques, Chapitre cathédral et ses dignitaires, synodes diocésains et provinciaux, vicaire, official, archidiacres, doyens de chrétienté, curés (hors juridiction gracieuse) <br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Actes pontificaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter67.php">http://elec.enc.sorbonne.fr/bede/feuilleter67.php</a></li>
                  <li>« Actes d'autres ecclésiastiques » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter69.php">http://elec.enc.sorbonne.fr/bede/feuilleter69.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div><ul>
                  <li>« Acte notarié scellé d’un sceau épiscopal (Dauphiné). Un hôte encombrant : l'évêque de Gap reconnaît avoir demandé gîte à la chartreuse de Durbon avant que son droit à l'exercer ait été reconnu » : <a href="https://dev.chartes.psl.eu/adele/documents/63/view/notice">n° 63</a></li>
                  <li>« Acte de l’archevêque de Sens. L'archevêque, les moniales, la paroisse : concession d'autel à Saint-Germain-des-Prés » : <a href="https://dev.chartes.psl.eu/adele/documents/88/view/notice">n° 88</a></li>
                </ul>
              </dd>

              <dt id="ac-religieux">
                Religieux
              </dt>
              <dd>
                La catégorie « Religieux » contient tout autant des actes laïcs sous le sceau ecclésiastique, des actes émanent directement d'établissement religieux, tels que les abbayes ou les prieurés. <br>
                Inclut : Dignitaires et membres de maisons religieuses et d’ordres <br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Actes abbatiaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter68.php">http://elec.enc.sorbonne.fr/bede/feuilleter68.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Chirographe co-scellé par l’abbé de Moissac et le comte de Toulouse (Quercy). L'hommage du comte : convention entre l'abbé de Moissac et Amaury de Montfort, comte de Toulouse » : <a href="https://dev.chartes.psl.eu/adele/documents/33/view/notice">n° 33</a></li>
                  <li>« Acte laïc sous sceaux ecclésiastiques (Besançon, Dole et Rougemont). Le testament d'un seigneur comtois, acte laïc sous sceaux ecclésiastiques » : <a href="https://dev.chartes.psl.eu/adele/documents/60/view/notice">n° 60</a></li>
                </ul>
              </dd>

              <dt id="ac-souverain">
                Souverain
              </dt>
              <dd>
                La définition de souverain (roi, empereur) se complète de la localisation de l'acte (France, Iles britanniques ...). La localisation doit être renseignée dans la partie « Pays » et parfois « Région » de l'onglet « Notice ». <br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Actes de souverains » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter70.php">http://elec.enc.sorbonne.fr/bede/feuilleter70.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Précepte du roi de France Charles le Chauve (copie de cartulaire, XIIe siècle). Alimenter les fidélités : don de terres par Charles le Chauve à un fidèle bourguignon » : <a href="https://dev.chartes.psl.eu/adele/documents/69/view/notice">n° 69</a></li>
                  <li>« Acte d’Urraka, fille du roi de León et de Castille Alphonse VI. Un don royal à l'abbaye de Cluny : l'infante Urraka, dame de Galice, offre le monastère de Pombeiro » : <a href="https://dev.chartes.psl.eu/adele/documents/74/view/notice">n° 74</a></li>
                </ul>
              </dd>

              <dt id="ac-prince">
                Du prince au baron
              </dt>
              <dd>
                Sous ces termes l'on retrouve l'intégralité des actes relatifs aux différents échelons de la noblesse : prince, duc, comte, baron, vicomte ... <br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Actes princiers » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter71.php">http://elec.enc.sorbonne.fr/bede/feuilleter71.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Chirographe co-scellé par les deux auteurs et par un cardinal-légat pontifical (Narbonnais). Payer les fidélités au prix fort : Amaury de Montfort, comte de Toulouse, promet un château au vicomte de Narbonne » : <a href="https://dev.chartes.psl.eu/adele/documents/27/view/notice">n° 27</a></li>
                  <li>« Acte de la comtesse de Boulogne. L'hommage du comte : convention entre l'abbé de Moissac et Amaury de Montfort, comte de Toulouse » : <a href="https://dev.chartes.psl.eu/adele/documents/32/view/notice">n° 32</a></li>
                </ul>
              </dd>

              <dt id="ac-administration">
                Administration séculière centrale et locale
              </dt>
              <dd>
                Il s'agit principalement d'actes édictés par des représentants du roi ou des princes et barons dans ses terres. Les auteurs peuvent donc être des prévôts, baillis, mais aussi des instances aidant le souverain dans sa gestion du territoire, tels que les chambres des comptes ou les cours des Aides.
                <br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Actes de l'administration locale (royale et princière) » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter148.php">http://elec.enc.sorbonne.fr/bede/feuilleter148.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Acte du trésorier royal de la sénéchaussée de Toulouse. Solder l'armée d'occupation : certificat des versements faits à un capitaine de l'armée royale en Gascogne » : <a href="https://dev.chartes.psl.eu/adele/documents/38/view/notice">n° 38</a></li>
                  <li>« Acte du sénéchal royal de Saintonge-Angoumois. Des travaux qui traînent : mandement de faire procéder de toute urgence aux réparations de château de La Rochelle ordonnées par le roi » : <a href="https://dev.chartes.psl.eu/adele/documents/43/view/notice">n° 43</a></li>
                </ul>
              </dd>
              
              <dt id="ac-seigneurs">
                Seigneurs et particuliers
              </dt>
              <dd>
                Contient les actes relatifs aux seigneuries et aux particuliers. Ainsi, on pourra y inscrire les documents généraux concernant les familles (généalogie, droits, titres), les papiers particuliers, des pièces concernant la seigneurie (terriers, cartulaires, droits seigneuriaux), de fiefs et d'arrières-fiefs. Il peut également s'agir d'acte scellé sous le sceau seigneurial.<br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Actes seigneuriaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter72.php">http://elec.enc.sorbonne.fr/bede/feuilleter72.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Acte scellé par un particulier (Normandie). Masure, courtil, prox. route royale : un acte de vente normand » : <a href="https://dev.chartes.psl.eu/adele/documents/46/view/notice">n° 46</a></li>
                  <li>« Acte scellé par un seigneur (Dauphiné). Une concession à la chartreuse de Berthaud » : <a href="https://dev.chartes.psl.eu/adele/documents/55/view/notice">n° 55</a></li>
                </ul>
              </dd>

              <dt id="ac-municipalite">
                Municipalité, communauté
              </dt>
              <dd>
                Il s'agit d'actes concernant la gestion des communes, d'établissements tels que les léproseries, aux marchandises, à la tenue d'octroi. <br>
                Inclut : juridiction gracieuse (écrits d’arche, etc.)<br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Actes communaux, consulaires et échevinaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter73.php">http://elec.enc.sorbonne.fr/bede/feuilleter73.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Notice sous un sceau consulaire (Limousin). Au marché de Limoges : accord sur le cens à verser pour un étal de boucher » : <a href="https://dev.chartes.psl.eu/adele/documents/36/view/notice">n° 36</a></li>
                  <li>« Chirographe d’échevinage (Valenciennes). Entre gens de biens et devant les hommes d'honneur : la dotation des jeunes époux » : <a href="https://dev.chartes.psl.eu/adele/documents/75/view/notice">n° 75</a></li>
                </ul> 
              </dd>

              <dt id="ac-actes">
                Actes privés, Système traditionnels
              </dt>
              <dd>
                Vise les actes du haut Moyen Âge, toutes solutions confondues : notariat vieux style, chartes et notices du notaire villageois comme du notaire-juge, notice monastique… <br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Actes privés » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter74.php">http://elec.enc.sorbonne.fr/bede/feuilleter74.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Notice monastique (Poitou). Être le voisin de saint Maixent : dons à Saint-Maixent pour une entrée en religion » : <a href="https://dev.chartes.psl.eu/adele/documents/54/view/notice">n° 54</a></li> 
                  <li>« Acte dressé par un prêtre (Roussillon). Un accensement de vignes » : <a href="https://dev.chartes.psl.eu/adele/documents/68/view/notice">n° 68</a></li>
                </ul>
              </dd>

              <dt id="ac-notaire">
                Notaire public
              </dt>
              <dd>
                Le notaire public donne une valeur légale à un texte, le plus souvent à des transactions économiques (achat, location, prêt). Il rédige plusieurs versions successives d'un même acte sur des supports différents, sur des feuillets parfois reliés. Ainsi, celui-ci donne une force à une action réalisée entre deux personnes.
                <div class="related-docs">
                  Bede :
                </div> Absent de Bede <br>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Acte notarié (Gévaudan). Six ans de retard : certificat relatif au paiement d'arrérages d'une rente assignée sur un péage en Gévaudan » : <a href="https://dev.chartes.psl.eu/adele/documents/34/view/notice">n° 34</a></li>
                  <li>« Acte scellé par un notaire à titre personnel (Tarbes). De notaire à notaire : procuration pour percevoir une somme due sur les caisses du roi en Bigorre » : <a href="https://dev.chartes.psl.eu/adele/documents/48/view/notice">n° 48</a></li>
                </ul>                
              </dd>

              <dt id="ac-jur-ecc">
                Juridiction gracieuse ecclésiastique
              </dt>
              <dd>
                Contrairement à la procédure contencieuse, la procédure gracieuse est une demande portée devant une juridiction, ici ecclésiastique, en absence de litige. Il peut s'agir de documents sous le sceau de l'officialité épiscopale ou archidiaonale par exemple. 
                <div class="related-docs">
                  Bede :
                </div> Absent de Bede <br>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Acte sous les sceaux de l’officialité archidiaconale de Verdun et d’un seigneur (Lorraine). Un montage féodal complexe : reprises et cessions d'un fief épiscopal en cascade » : <a href="https://dev.chartes.psl.eu/adele/documents/39/view/notice">n° 39</a></li>
                  <li>« Acte sous le sceau du doyen de chrétienté de Verberie (diocèse de Soissons). Charité bien ordonnée : don et échange de terre d'un bourgeois de Compiègne aux cisterciens de Chaalis »<a href="https://dev.chartes.psl.eu/adele/documents/78/view/notice">n° 78</a></li>
                </ul>                 
              </dd>

              <dt id="ac-jur-gra">
                Juridiction gracieuse laïque
              </dt>
              <dd>
                Contrairement aux actes de l'administration séculière centrale et locale, les documents entrant dans cette typologie portent le sceau d'une juridiction laïque (comme une cour royale, un bailli), mais celle-ci n'est pas l'auteur de l'action juridique évoquée.<br>
                Exclut municipalité <br>
                <div class="related-docs">
                  Bede :
                </div> se référer aux actes privés, qui forment une unique catégorie, sans autre subdivision.<br>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Acte sous le sceau de la cour royale de Salins. Constitution de rente sur une vigne proche de Salins » : <a href="https://dev.chartes.psl.eu/adele/documents/62/view/notice">n° 62</a></li>
                  <li>« Acte co-scellé par le bailli royal du Cotentin et par un chevalier. Une rente sur un moulin : petits arrangements et grandes garanties en faveur des cisterciennes de Mortain » : <a href="https://dev.chartes.psl.eu/adele/documents/79/view/notice">n° 79</a></li>
                </ul> 
              </dd>
            </dl>

            <h2 id="ac-B">
              B – Documents de gestion, type
            </h2>
            <dl>
              <dt id="ac-domaniale">
                Documents de gestion domaniale
              </dt>
              <dd>
                Il s'agit principalement de documents décrivant la terre appartenant à un seigneur. Ainsi, on y retrouvera dans cette catégorie les polyptiques, les censiers et terriers, ainsi que les aveux et dénombrements. <br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Documents de gestion domaniale » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter91.php">http://elec.enc.sorbonne.fr/bede/feuilleter91.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>« Acte de justice seigneuriale (Normandie). Aux plaids de la seigneurie : aveu et dénombrement de tenure » :<a href="https://dev.chartes.psl.eu/adele/documents/85/view/notice">n° 85</a>.
              </dd>

              <dt id="ac-inventaire">
                Inventaires de biens
              </dt>
              <dd>
                Les inventaires de biens constituent un ensemble de documents très large. Il s'agit de listes, qu'elles soient autonomes ou enchâssées dans un acte ou dans un compte.<br>
                Inclut : Biens fonciers et mobiliers, trésors, archives, bibliothèques<br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Inventaires de biens et trésors » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter95.php">http://elec.enc.sorbonne.fr/bede/feuilleter95.php</a></li>
                </ul>
              </dd>

              <dt id="ac-feodaux">
                Documents féodaux
              </dt>
              <dd>
                Dans les documents féodaux l'on retrouve tous les actes relatifs à la gestion de la seigneurie. Par exemple, cette catégorie peut contenir des livres de fiefs et d'hommages ou les chartes octroyées par le seigneur.<br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Documents féodaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter96.php">http://elec.enc.sorbonne.fr/bede/feuilleter96.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Tenir le château : serment de fidélité prêté pour le château de Bernis à la vicomtesse de Nîmes » : <a href="https://dev.chartes.psl.eu/adele/documents/66/view/notice">n° 66</a></li>
                  <li>« Attache de la Chambre des comptes et des trésoriers du roi de France. Ordres en cascade et médiations administratives : l’exécution d’une souffrance d’hommage pour un fief normand » : <a href="https://dev.chartes.psl.eu/adele/documents/92/view/notice">n° 92</a></li>
                </ul>
              </dd>

              <dt id="ac-comptables">
                Documents comptables, financiers et fiscaux
              </dt>
              <dd>
                Il s'agit des documents économiques, utile pour la levée d'impôt ou pour gérer financièrement une seigneurie. Cette catégorie peut également contenir tout acte relatif aux transactions financières, ecclésiastique et laïque. Ainsi, on y retrouvera les documents d'assiette, de levée et documents comptables.<br>
                Exemple de documents : comptes, documents relatifs à la perception de la taille, quittances
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Documents comptables, financiers, fiscaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter99.php">http://elec.enc.sorbonne.fr/bede/feuilleter99.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Acte notarié (Gévaudan). Six ans de retard : certificat relatif au paiement d’arrérages d’une rente assignée sur un péage en Gévaudan » : <a href="https://dev.chartes.psl.eu/adele/documents/34/view/notice">n° 34</a></li>
                  <li>« Acte sous le sceau de l’officialité épiscopale de Thérouanne. Quittance pour paiement de gages dus au titre de la guerre de Flandre » : <a href="https://dev.chartes.psl.eu/adele/documents/35/view/notice">n° 35</a></li>
                </ul>
              </dd>

              <dt id="ac-production">
                Documents propres à la production, aux échanges et au travail
              </dt>
              <dd>
                Ces documents sont dits « propres » pour bien marquer qu’ils ne sont pas « relatifs » à un domaine d’activité, mais que leur production est intrinsèquement liée à celui-ci. On en donne quelques exemples entre crochets droits. Inclut : Banque, monnaie, agriculture, pêche…<br>
                Exemple : journal de péage, statut de métier.<br>
                <br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Documents propres à la production, aux échanges et au travail » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter101.php">http://elec.enc.sorbonne.fr/bede/feuilleter101.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                « Acte scellé par un bourgeois (Guyenne). Parole de Gascons : une dette contractée à Londres et remboursable à Bordeaux » : <a href="https://dev.chartes.psl.eu/adele/documents/84/view/notice">n° 84</a>.
              </dd>

              <dt id="ac-militaires">
                Documents militaires
              </dt>
              <dd>
                Ces documents concernent l'organisation des forces militaires, autant sur leur plan administratif, technique, qu'en terme de personnel. <br>
                Exemple : montre<br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Documents propres à la guerre et aux armées » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter112.php">http://elec.enc.sorbonne.fr/bede/feuilleter112.php</a></li>
                </ul>
              </dd>

              <dt id="ac-diplomatie">
                Documents propres à la diplomatie
              </dt>
              <dd>
                Il s'agit de documents utile aux relations extérieures.<br>
                Exemples : lettres de créance, passeport, instructions<br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Documents propres à la diplomatie » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter114.php">http://elec.enc.sorbonne.fr/bede/feuilleter114.php</a></li>
                </ul>
              </dd>

              <dt id="ac-justice">
                Documents propres à la justice
              </dt>
              <dd>
                Il s'agit de documents ici des enquêtes judiciaires, liée, par exemple à l'<i>inquisitio</i>, mais aussi aux dépositions de témoins, aux registres des procès, des peines, ou aux affaires ecclésiastiques comme les canonisation.<br>
                Exemples : registre d’inquisition, registre d’amendes<br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Documents propres à la justice (hors juridiction gracieuse) » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter115.php">http://elec.enc.sorbonne.fr/bede/feuilleter115.php</a></li>
                </ul>
              </dd>

              <dt id="ac-enseignement">
                Documents propres à l’enseignement
              </dt>
              <dd>
                Cette catégorie peut contenir des documents relatifs à l'organisation et au statuts d'une université, aux bibliothèques, aux écoles capitulaires et collèges.<br>
                Exemple : livre de recteur<br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Documents propres à l'enseignement » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter120.php">http://elec.enc.sorbonne.fr/bede/feuilleter120.php</a></li>
                </ul>
              </dd>

              <dt id="ac-assistance">
                Documents propres à l’assistance
              </dt>
              <dd>
                Il s'agit de document propre à l'aide des plus pauvres, ainsi qu'aux institutions hospitalières médiévales, comme les Hôtel-Dieu, léproseries et maladreries.<br>
                Exemple : matricule des pauvres.<br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Documents propres à l'assistance » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter121.php">http://elec.enc.sorbonne.fr/bede/feuilleter121.php</a></li>
                </ul>
              </dd>

              <dt id="ac-ecc">
                Documents propres aux archives ecclésiastiques
              </dt>
              <dd>
                Il s'agit tout autant de documents provenant du clergé régulier que séculier. Ainsi, on y retrouve des documents servant à la gestion du temporel (comme les registres épiscopaux) qu'à la gestion du spirituel (documents nécrologiques par exemple).<br>
                Exemples : visite pastorale, obituaire, registre BMS…<br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Autres documents propres aux archives ecclésiastiques » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter122.php">http://elec.enc.sorbonne.fr/bede/feuilleter122.php</a></li>
                </ul>
              </dd>

              <dt id="ac-princ">
                Documents propres aux archives royales et princières
              </dt>
              <dd>
                Documents servant à l'administration centrale ou locale, relatifs à l'organisation des pouvoirs ou des dépenses.<br>
                Exemple : enquête administrative<br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Autres documents propres aux archives royales et princières » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter129.php">http://elec.enc.sorbonne.fr/bede/feuilleter129.php</a></li>
                </ul>
              </dd>

              <dt id="ac-arch-muni">
                Documents propres aux archives municipales
              </dt>
              <dd>
                Il s'agit de document propre à l'administration communale par les échevins ou consuls.<br>
                Exemples de documents : livre de bourgeoisie, délibérations et statuts<br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Autres documents propres aux archives municipales » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter130.php">http://elec.enc.sorbonne.fr/bede/feuilleter130.php</a></li>
                </ul>
              </dd>

              <dt id="ac-arch-seign">
                Documents propres aux archives seigneuriales et de particuliers
              </dt>
              <dd>
                Il s'agit de documents permettant au seigneur de contrôler sa seigneurie, ses comptes, ou au particulier de gérer ses propriétés.<br>
                Exemple : livre de raison<br>
                <div class="related-docs">
                  Bede :
                </div> 
                <ul>
                  <li>« Autres documents propres aux archives seigneuriales et de particuliers » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter133.php">http://elec.enc.sorbonne.fr/bede/feuilleter133.php</a></li>
                </ul>
              </dd>
            </dl>
          </div>
          <div
            v-if="$attrs.section === 'speech-parts'"
          >
            <h1>Parties du discours</h1>
            <p>
              Lors de la définition des parties du discours, 14 termes ont été retenus. Chaque entrée peut ensuite être affinée par un commentaire définissant de façon plus précise le mot-clef retenu. <br>
              Par exemple, une <i>sanctio</i> peut être caractérisé par une clause ensuite définie dans le commentaire de la partie du discours. 
              <br>
              Il est important de signaler que le vocabulaire ici défini ne pourra servir que ponctuellement pour les documents de gestion. En effet, ceux-ci ne sont pas autant structurés que les actes. Aussi, il est nécessaire de rappeler que, contrairement aux actes, les documents de gestion peuvent contenir plusieurs feuillets, et qu'ils en sont pas tous décrits. Ainsi, toutes les parties du discours ne sont pas nécessairement présentes dans l'intégralité des dossiers. 
            </p>

            <div class="toc">
              <h2>
                Liste des parties
              </h2>
              <div class="columns">
                <div class="column">
                  <ul>
                    <li><a href="#sp-invocation">Invocation</a></li>
                    <li><a href="#sp-suscription">Suscription</a></li>
                    <li><a href="#sp-adresse">Adresse</a></li>
                    <li><a href="#sp-salut">Salut</a></li>
                    <li><a href="#sp-perpet">Formule de perpétuité</a></li>
                    <li><a href="#sp-preambule">Préambule</a></li>
                    <li><a href="#sp-notification">Notification</a></li>
                    <li><a href="#sp-expose">Exposé</a></li>
                  </ul>
                </div>
                <div class="column">
                  <ul>
                    <li><a href="#sp-dispositif">Dispositif</a></li>
                    <li><a href="#sp-sanctio">Sanctio</a></li>
                    <li><a href="#sp-form">Mentions de formalités</a></li>
                    <li><a href="#sp-valid">Validations finales</a></li>
                    <li><a href="#sp-date">Date</a></li>
                    <li><a href="#sp-hors">Mentions hors teneurs</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <dl>
              <dt id="sp-invocation">
                Invocation
              </dt>
              <dd>
                L’invocation est une formule plaçant l’acte sous le patronage d’une personne divine.<br>
                VID n° 185 : <a href="https://www.cei.lmu.de/VID/#185">https://www.cei.lmu.de/VID/#185</a><br>
                L’invocation peut être :
                <ul>
                  <li>Figurée</li>
                  <li>Verbale</li>
                  <li>En forme de chrisme : <a href="https://www.cei.lmu.de/VID/#147">https://www.cei.lmu.de/VID/#147</a></li>
                </ul>
                Exemples : «<i>In nomine sanctae et individuae Trinitatis</i>» ; « <i>In nomine Patris et Filii et Spiritus sancti</i> ».
              </dd>

              <dt id="sp-suscription">
                Suscription
              </dt>
              <dd>
                La suscription (lat : <i>persona salutans</i>, <i>intitulatio</i>, <i>superscriptio</i>) décline l’identité de l’auteur de l’acte. Elle contient le nom personnel de l’auteur, souvent ses titres et/ou qualités, parfois son pronom personnel.<br>
                VID, n° 187 : <a href="https://www.cei.lmu.de/VID/#187">https://www.cei.lmu.de/VID/#187</a><br>
                La suscription peut être complétée :
                <ul>
                  <li>d’une formule de dévotion : <a href="https://www.cei.lmu.de/VID/#190">https://www.cei.lmu.de/VID/#190</a></li><br>
                  Exemple : « <i>Par la grâce de Dieu</i> »
                  <li>
                    d’une formule d’humilité : <a href="https://www.cei.lmu.de/VID/#191">https://www.cei.lmu.de/VID/#191</a><br>
                    Exemple : « <i>Servus servorum Dei</i> »
                  </li>
                </ul>
              </dd>

              <dt id="sp-adresse">
                Adresse
              </dt>
              <dd>
                L’adresse (lat. : <i>inscriptio</i>, <i>superscriptio</i>, <i>inscription</i>) décline l’identité du destinataire (et non forcément le bénéficiaire) de l’acte ou de la lettre.<br>
                VID, n° 192: <a href="https://www.cei.lmu.de/VID/#192">https://www.cei.lmu.de/VID/#192</a><br>
                L’adresse peut être :
                <ul>
                  <li>
                    Universelle : <a href="https://www.cei.lmu.de/VID/#193a">https://www.cei.lmu.de/VID/#193a</a><br>
                    Exemple :  « <i>Universis presentes litteras inspecturis</i> »
                  </li>
                  <li>
                    Collective : <a href="https://www.cei.lmu.de/VID/#193b">https://www.cei.lmu.de/VID/#193b</a><br>
                    Exemple : « <i>Omnibus ballivis ac praepositis nostris</i> »
                  </li>
                  <li>
                    Personnelle : <a href="https://www.cei.lmu.de/VID/#193c">https://www.cei.lmu.de/VID/#193c</a><br>
                    Exemple : « <i>dilecto ac fideli cancellario nostro ...</i> »
                  </li>
                </ul>
              </dd>

              <dt id="sp-salut">
                Salut
              </dt>
              <dd>
                L’auteur de l’acte y exprime au destinataire son salut (lat. : <i>salutatio</i>, <i>modus salutandi</i>). Celui-ci est de règle quand il y a une adresse.<br>
                VID, n° 194: <a href="https://www.cei.lmu.de/VID/#194">https://www.cei.lmu.de/VID/#194</a><br>
                Le salut peut être complété :
                <ul>
                  <li>d’une formule de souhait</li>
                </ul>
              </dd>

              <dt id="sp-perpet">
                Formule de perpétuité
              </dt>
              <dd>
                La formule de perpétuité peut venir remplacer le salut. Elle déclare que les droits créés par le document ne sont pas circonscrits dans le temps.<br>
                VID n° 195: <a href="https://www.cei.lmu.de/VID/#195">https://www.cei.lmu.de/VID/#195</a><br>
                Exemple : « <i>In perpetuum</i> »
              </dd>

              <dt id="sp-preambule">
                Préambule
              </dt>
              <dd>
                Le préambule (lat. : <i>exordium</i>, <i>arenga</i>, <i>proemium</i>) est l’ensemble de considérations générales, à valeur universelle, détachées du contexte particulier, qui motivent et légitiment l’acte.<br>
                VID n° 196bis : <a href="https://www.cei.lmu.de/VID/#196bis">https://www.cei.lmu.de/VID/#196bis</a><br>
                Il peut s’agir :
                <ul>
                  <li>d’un préambule court</li>
                </ul>
              </dd>

              <dt id="sp-notification">
                Notification
              </dt>
              <dd>
                La notification (lat. : <i>notificatio</i>, <i>publicatio</i>, <i>promulgatio</i>) est une formule-outil qui déclare la volonté de porter à la connaissance des lecteurs ou auditeurs de l’acte.<br>
                VID n° 196: <a href="https://www.cei.lmu.de/VID/#196">https://www.cei.lmu.de/VID/#196</a>
                La notification peut-être :
                <ul>
                  <li>
                    Universelle<br>
                    Exemple : « <i>Savoir faisons à tous présents et à venir que</i> »
                  </li>
                  <li>
                    Collective<br>
                    Exemple : « <i>Savoir faisons aux prélats de ladite ville</i> »
                  </li>
                  <li>Personnelle</li>
                </ul>
              </dd>

              <dt id="sp-expose">
                Exposé
              </dt>
              <dd>
                Il s’agit de l’exposé (lat. : <i>narratio</i>) logico-chronologique des circonstances qui ont amené la prise de décision.<br>
                VID n° 197: <a href="https://www.cei.lmu.de/VID/#197">https://www.cei.lmu.de/VID/#197</a>
              </dd>

              <dt id="sp-dispositif">
                Dispositif
              </dt>
              <dd>
                Au sens étroit, le dispositif (lat. : <i>dispositio</i>) énonce la volonté de l’auteur de l’action et qualifie sa nature juridique (<i>donamus</i> > donation). Au sens large, il décrit l’action juridique, dans la forme d’un exposé, quand l’acte est en forme de procès-verbal (pour un acte notarié, de juridiction gracieuse…).<br>
                VID n° 198: <a href="https://www.cei.lmu.de/VID/#198">https://www.cei.lmu.de/VID/#198</a><br>
                Diverses formules viennent préciser le dispositif :
                <ul>
                  <li>
                    Clauses additionnelles : <a href="https://www.cei.lmu.de/VID/#207">https://www.cei.lmu.de/VID/#207</a>
                    <ul>
                      <li>Description de la cérémonie de tradition : <a href="https://www.cei.lmu.de/VID/#248">https://www.cei.lmu.de/VID/#248</a></li>
                      <li>
                        Formule de spontanéité : <a href="https://www.cei.lmu.de/VID/#201">https://www.cei.lmu.de/VID/#201</a><br>
                        Exemples : « <i>motu proprio, spontanea voluntate ...</i> »
                      </li>
                      <li>
                        Formule de motivation : <a href="https://www.cei.lmu.de/VID/#202">https://www.cei.lmu.de/VID/#202</a><br>
                        Exemples : « <i>pro remedio anime ...</i> »
                      </li>
                      <li>Clause de demande de prières : <a href="https://www.cei.lmu.de/VID/#212">https://www.cei.lmu.de/VID/#212</a></li>
                      <li>
                        Formule explicative : <a href="https://www.cei.lmu.de/VID/#203">https://www.cei.lmu.de/VID/#203</a><br>
                        Exemple : « <i>ut nunc habeatis, teneatis ...</i> »
                      </li>
                      <li>Formule de pertinence : <a href="https://www.cei.lmu.de/VID/#204">https://www.cei.lmu.de/VID/#204</a></li>
                      <li>Formule d'amortissement</li>
                    </ul>
                  </li>
                  <li>
                    Clause(s) de consentement, en précisant si possible, par exemple :
                    <ul>
                      <li><i>Laudatio parentum</i> : <a href="https://www.cei.lmu.de/VID/#334">https://www.cei.lmu.de/VID/#334</a></li>
                      <li>Consentement du seigneur censuel : <a href="https://www.cei.lmu.de/VID/#333">https://www.cei.lmu.de/VID/#333</a></li>
                      <li>Consentement du seigneur féodal : <a href="https://www.cei.lmu.de/VID/#333">https://www.cei.lmu.de/VID/#333</a></li>
                    </ul>
                  </li>
                </ul>
              </dd>

              <dt id="sp-sanctio">
                Sanctio
              </dt>
              <dd>
                Groupe de clauses souvent très développées, destinées à garantir et protéger l’action juridique rapportée dans l’acte.<br>
                VID : Absent du VID sous cette dénomination<br>
                Elle peut se présenter sous différentes formes :
                <ul>
                  <li>Clause intentionnelle (absente du VID, v.g. Car ainsi nous plait il estre fait, <i>Hec omnia voluerunt</i>)</li>
                  <li>Clause injonctive (ordre donné aux agents d’obtempérer à la mesure) : <a href="https://www.cei.lmu.de/VID/#209">https://www.cei.lmu.de/VID/#209</a></li>
                  <li>Clause prohibitive : <a href="https://www.cei.lmu.de/VID/#210">https://www.cei.lmu.de/VID/#210</a></li>
                  <li>Clause d’appel aux successeurs : <a href="https://www.cei.lmu.de/VID/#211">https://www.cei.lmu.de/VID/#211</a></li>
                  <li>Clause dérogatoire (<i>non obstantibus</i>…) : <a href="https://www.cei.lmu.de/VID/#215">https://www.cei.lmu.de/VID/#215</a></li>
                  <li>Clause de réserve (<i>salvo</i>…) : <a href="https://www.cei.lmu.de/VID/#213">https://www.cei.lmu.de/VID/#213</a></li>
                  <li>Clause de non préjudice : <a href="https://www.cei.lmu.de/VID/#214">https://www.cei.lmu.de/VID/#214</a></li>
                  <li>Clause de non-usage (prescrit la déchéance des droits s’ils ne sont pas exercés): <a href="https://www.cei.lmu.de/VID/#216">https://www.cei.lmu.de/VID/#216</a></li>
                  <li>Clause de promesse : <a href="https://www.cei.lmu.de/VID/#217">https://www.cei.lmu.de/VID/#217</a></li>
                  <li>
                    Clause d’obligation : <a href="https://www.cei.lmu.de/VID/#219">https://www.cei.lmu.de/VID/#219</a>
                    <ul>
                      <li>Clause de garantie : <a href="https://www.cei.lmu.de/VID/#220">https://www.cei.lmu.de/VID/#220</a></li>
                      <li>Clause de fidéjussion : <a href="https://www.cei.lmu.de/VID/#221">https://www.cei.lmu.de/VID/#221</a></li>
                      <li>Clause de soumission à juridiction : <a href="https://www.cei.lmu.de/VID/#235">https://www.cei.lmu.de/VID/#235</a></li>
                      <li>Clause d’emprisonnement volontaire (<i>obligeant... son corps à tenir prison</i>)</li>
                    </ul>
                  </li>
                  <li>
                    Clause de renonciation <a href="https://www.cei.lmu.de/VID/#222">https://www.cei.lmu.de/VID/#222</a><br>
                    Plusieurs exceptions visées, dont le détail est donné dans le Vocabulaire International de Diplomatique,
                    de <a href="https://www.cei.lmu.de/VID/#223">https://www.cei.lmu.de/VID/#223</a>
                    à <a href="https://www.cei.lmu.de/VID/#234">https://www.cei.lmu.de/VID/#234</a>
                    et <a href="https://www.cei.lmu.de/VID/#236">https://www.cei.lmu.de/VID/#236</a>
                  </li>
                  <li>
                    Clause pénale (générique) : <a href="https://www.cei.lmu.de/VID/#237">https://www.cei.lmu.de/VID/#237</a>
                    <ul>
                      <li>Clause de menaces spirituelles = <a href="https://www.cei.lmu.de/VID/#244">https://www.cei.lmu.de/VID/#244</a></li>
                      <li>
                        Clause de restitution :
                        <ul>
                          <li><i>in integrum</i> : <a href="https://www.cei.lmu.de/VID/#238">https://www.cei.lmu.de/VID/#238</a></li>
                          <li><i>cum melioratione</i> : <a href="https://www.cei.lmu.de/VID/#239">https://www.cei.lmu.de/VID/#239</a></li>
                          <li><i>in duplum</i> : <a href="https://www.cei.lmu.de/VID/#240">https://www.cei.lmu.de/VID/#240</a></li>
                        </ul>
                      </li>
                      <li>Clause de dommages et intérêts : <a href="https://www.cei.lmu.de/VID/#241">https://www.cei.lmu.de/VID/#241</a></li>
                      <li>Clause d’amende : <a href="https://www.cei.lmu.de/VID/#242">https://www.cei.lmu.de/VID/#242</a></li>
                      <li>Clause de <i>rato</i> (absente du VID) : sous sa forme développée « <i>rato manente pacto</i> », prescrit que l’amende doit être incorporée dans le total de ce qui est dû.</li>
                    </ul>
                  </li>
                  <li>Clause de bénédiction : <a href="https://www.cei.lmu.de/VID/#245">https://www.cei.lmu.de/VID/#245</a></li>
                  <li>Clause de mandat d’exécution : <a href="https://www.cei.lmu.de/VID/#247">https://www.cei.lmu.de/VID/#247</a> [à ne pas confondre avec la clause injonctive, qui est générique]</li>
                  <li>Clause de décharge (absente du VID) : ordre donné aux contrôleurs des comptes de ratifier la dépense alléguée par le comptable, sous réserve de production des pièces justificatives requises.</li>
                </ul>
              </dd>

              <dt id="sp-form">
                Mentions de formalités
              </dt>
              <dd>
                Parallèlement aux précédentes, les mentions de formalités visent la protection de l’acte écrit, en déclarant que les formalités requises ont été effectuées.<br>
                VID : Absent du VID
                <ul>
                  <li>Clause de <i>jussio</i> (ordre d’écrire, actes royaux et assimilés) : <a href="https://www.cei.lmu.de/VID/#336">https://www.cei.lmu.de/VID/#336</a></li>
                  <li>Clause de <i>rogatio</i> (ordre d’écrire, actes privés) : <a href="https://www.cei.lmu.de/VID/#326">https://www.cei.lmu.de/VID/#326</a></li>
                  <li>Clause d’homologation des copies : <a href="https://www.cei.lmu.de/VID/#249">https://www.cei.lmu.de/VID/#249</a></li>
                  <li>Clause des formalités de publication : <a href="https://www.cei.lmu.de/VID/#250">https://www.cei.lmu.de/VID/#250</a></li>
                  <li>Clause de <i>stipulatio</i> (absente du VID) : stipulatione subnexa… Désigne à l’origine l’échange formaliste de paroles sanctionnant le négoce.</li>
                  <li>
                    Corroboration = <a href="https://www.cei.lmu.de/VID/#246">https://www.cei.lmu.de/VID/#246</a> (annonce des signes de validation)
                    <ul>
                      <li>Corroboration probatoire</li>
                      <li>Corroboration perpétuelle</li>
                    </ul>
                  </li>
                </ul>
              </dd>

              <dt id="sp-valid">
                Validations finales
              </dt>
              <dd>
                VID : Absent du VID
                <ul>
                  <li>Apprécation: <a href="https://www.cei.lmu.de/VID/#251">https://www.cei.lmu.de/VID/#251</a></li>
                  <li>Souhait final : <a href="https://www.cei.lmu.de/VID/#252 ;">https://www.cei.lmu.de/VID/#252 ;</a> bene valete monogrammatique</li>
                  <li>Salutation finale : <a href="https://www.cei.lmu.de/VID/#253">https://www.cei.lmu.de/VID/#253</a></li>
                  <li>Souscription/souscriptions : <a href="https://www.cei.lmu.de/VID/#254">https://www.cei.lmu.de/VID/#254</a></li>
                  <li>Liste de témoins : <a href="https://www.cei.lmu.de/VID/#263">https://www.cei.lmu.de/VID/#263</a></li>
                  <li>Recognition (de chancellerie) : <a href="https://www.cei.lmu.de/VID/#256">https://www.cei.lmu.de/VID/#256</a></li>
                  <li>Souscription notariale (acte privé) : <a href="https://www.cei.lmu.de/VID/#255">https://www.cei.lmu.de/VID/#255</a></li>
                </ul>
              </dd>

              <dt id="sp-date">
                Date
              </dt>
              <dd>
                VID n° 561: <a href="https://www.cei.lmu.de/VID/#561">https://www.cei.lmu.de/VID/#561</a><br>
                Peut se distinguer en :
                <ul>
                  <li>Date de lieu : <a href="https://www.cei.lmu.de/VID/#563">https://www.cei.lmu.de/VID/#563</a></li>
                  <li>Date de temps : <a href="https://www.cei.lmu.de/VID/#562">https://www.cei.lmu.de/VID/#562</a></li>
                  <li>Ménologe</li>
                </ul>
              </dd>

              <dt id="sp-hors">
                Mentions hors teneurs
              </dt>
              <dd>
                Elles sont internes à la chancellerie ou au bureau d’écriture. Elles indiquent qui a écrit et / ou composé l’acte, qui l’a commandé, les étapes qu’il a suivies.<br>
                VID n° 180 : <a href="https://www.cei.lmu.de/VID/#180">https://www.cei.lmu.de/VID/#180</a><br>
                Plusieurs exemples de mentions hors teneurs :
                <ul>
                  <li>Signature du notaire / rédacteur à l’exclusion du seing de notaire public</li>
                  <li>Mention de commandement</li>
                  <li>Mention de taxation</li>
                  <li>Mention d’enregistrement</li>
                  <li>Mention de collation</li>
                </ul>
              </dd>
            </dl>
          </div>
          <div
            v-if="$attrs.section === 'contact'"
          >
            <h1>Contact</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'institutions'"
          >
            <h1>Institution de conservation et cote</h1>
            <p>
              On indique ici les cotes des documents originaux ou le numéro du fac-similé dans la collection de l’Ecole
              des chartes (si possible complété de la cote d’origine) – on notera que les nos 1-… de la série dite
              Ancien fonds (A.F.) sont des lithographies parfois dénaturées par les interventions du lithographe,
              ensuite remplacées par des procédés photographiques ou assimilés (héliogravure en particulier : Nouveau
              fonds, N.F. 1-…, puis poursuite de l’ancien fonds à compter de A.F…
            </p>
          </div>
          <div
            v-if="$attrs.section === 'langs'"
          >
            <h1>Langues des documents</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'places'"
          >
            <h1>Région [Pays & lieux identifiés]</h1>
            <p>
              Pour l'identification des lieux, nous employons, quand elle existe, la forme moderne usuelle en français, y compris pour les noms de lieux étrangers (Rome, Londres, Augsbourg), laissant la forme ancienne quand elle n'est par identifiée. 
            </p>
            <p>
              Les identifications sont par convention faites d'après le système administratif des départements et cantons (avec le Dictionnaire des communes de 1997). <br>
              Bientôt, des liens seront créés entre le <a href="https://dicotopo.cths.fr/">Dictionnaire Topographique</a> et les différents référentiels de lieux, pour permettre l'interopérabilité des données géographiques. 
            </p>
            <p>
              Il s’agit du pays contemporain, voire de la région contemporaine qui abrite le(s) lieu(x) concerné(s) par
              le document, plutôt que par l’origine de l’auteur. Pour la France, on a gardé les régions…, les « grandes
              régions » donnant des localisations par trop grossières (p.ex. Auvergne-Rhône) et des appellations parfois
              opaques pour le lecteur étranger (p.ex. Hauts-de-France).
            </p>
            <br>
            <p>
              Pour les identifications des noms de lieux, il peut être utile de consulter les ressources suivantes : 
              <ul class="bullet-list">
                <li>Le Dictionnaire Topographique de la France : <a href="https://dicotopo.cths.fr/">DicoTopo</a></li>
                <li>La base "Nominatim" d'OpenStreetMap : <a href="https://nominatim.openstreetmap.org/ui/search.html">Nominatim</a></li>
              </ul>
            </p>
          </div>
          <div
            v-if="$attrs.section === 'persons'"
          >
            <h1>Personnes identifiées</h1>
            <p>
              Pour l'identification des noms de personnes, on suit dans les dossiers rédigés en français les usages des éditeurs français d'actes. Sauf forme consacrée par l'usage (Louis le Pieux, Saint Louis), on donne le plus possible la forme contemporaine traduite, tout en tenant compte des formes régionales si possible (Gautier, Wautier, Walter), et des formes étrangères pour l'étranger (Stephen, Stepan, Stefano ...).
            </p>
          </div>
          <div
            v-if="$attrs.section === 'commentaries'"
          >
            <h1>Types de commentaires fournis</h1>
            <p>
              Signale la présence et l’objet de commentaires détaillés dans un champ débordant le domaine diplomatique
              attendu pour tous les dossiers : commentaires historique, juridique, philologique, paléographique,
              sigillographique.
            </p>

            <p>
              Pour les dossiers présentés et complets sur la plateforme, il est souvent indiqué un unique commentaire diplomatique. Celui-ci peut se composé d'une étude des caractères externes, d'une interprétation, d'une étude sur la langue et le style. 
            </p>

            <div class="toc">
              <h2>
                Liste des types de commentaire
              </h2>
              <div class="columns">
                <div class="column">
                  <ul>
                    <li><a href="#co-diplomatique">Diplomatique</a></li>
                    <li><a href="#co-historique">Historique</a></li>
                    <li><a href="#co-juridique">Juridique</a></li>
                  </ul>
                </div>
                <div class="column">
                  <ul>
                    <li><a href="#co-philolo">Philologique</a></li>
                    <li><a href="#co-paleo">Paléographique</a></li>
                    <li><a href="#co-sigillo">Sigillographique</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <dl>
              <dt id="co-diplomatique">
                Commentaire diplomatique
              </dt>
              <dd>
                <p>
                  Le commentaire diplomatique est le principal commentaire à fournir. Il contient notamment des éléments relatifs aux caractères externes, aux dimensions du manuscrit, à son écriture. Ce commentaire permet de replacer le document parmi les autres documents de la même typologie. Ainsi, s'il s'agit un mandement royal, on pourra le comparer aux autres mandements de la même époque, dans les formules utilisés, dans ses dimensions et son écriture. 
                </p>
                <p>
                  Ce commentaire peut également servir de commentaire général sur le manuscrit, en l'absence d'éléments suffisant pour créer un autre commentaire. 
                </p>
                <p>
                  Pour les dossiers présentés et provenant de l'ancienne base « Theleme », il est souvent indiqué un unique commentaire diplomatique. Celui-ci peut être composé d'une étude des caractères externes, d'une étude de la langue et du style, et parfois d'une interprétation, faisant la synthèse de ces éléments pour en tirer une conclusion générale.
                </p>
              </dd>
              <dt id="co-historique">
                Commentaire historique
              </dt>
              <dd>
                Le commentaire historique explique le contexte de rédaction de l'acte. Il peut permettre ou non de faire une critique de l'exposé indiqué en début d'acte, et motivant la décision qui a été prise. <br>
                Il peut faire le rappel des précédents actes relatifs au même sujet.<br>
                Egalement, il peut faire un rappel de l'historique de document de la même typologie, si cela est pertinent. <br>
                Par exemple, un document tel qu'un censier peut faire l'objet d'un commentaire historique, en l'étudiant par rapport aux autres censiers plus anciens de la même province.
              </dd>
              <dt id="co-juridique">
                Commentaire juridique
              </dt>
              <dd>
                Le commentaire juridique s'appuie sur les caractères externes qui se trouvent en le document. Par exemple, l'étude peut porter sur les éléments de validation de l'acte, qui donnent la force juridique au document. <br>
                Aussi, le commentaire juridique peut s'appuyer sur le contenu textuel du document en question. 
              </dd>
              <dt id="co-philolo">
                Commentaire philologique
              </dt>
              <dd>
                Le commentaire philologique étudie la langue et les expressions utilisées. Celui-ci peut reprendre et étudier de façon plus précise certains passages du contenu textuel du document, en faisant par exemple le repérage d'éléments d'accentuation, parmi les termes utilisés, le rythme du texte (en repérant par exemple le <i>cursus velox</i>). 
              </dd>
              <dt id="co-paleo">
                Commentaire paléographique
              </dt>
              <dd>
                Ce commentaire s'appuie essentiellement sur l'écriture du document. On peut y décrire les longueur des hastes et des hampes, des caractères se distinguant plus nettement du corps du texte. <br>
                Aussi on pourra également y commenter les abréviations et les signes de ponctuation utilisés ou non dans le texte. Les formes et les lettres qui sont abrégés pourront être décrites, pour montrer une certaine singularité ou au contraire, une homongénéité des caractères. 
              </dd>
              <dt id="co-sigillo">
                Commentaire sigillographique
              </dt>
              <dd>
                Le commentaire sigillographique porte sur l'étude du sceau. 
                Il est autant intéressant d'étudier l'iconographie, les éléments représentés dans le sceau (le vêtement, l'armement, la symbolique), la couleur et la matière du sceau. <br>
                Aussi, le sceau peut contenir des éléments textuels, pouvant reprendre la suscription en début d'acte. <br>
                Autre élément pouvant être décrit dans ce commentaire : la façon dont est scellé l'acte. Il peut parfois être fait sur simple queue, sur double queue, et peuvent être représentatifs ou non d'un type d'acte. <br>
                La base de données <a href="www.sigilla.org">Sigilla</a> peut être riche en informations sur les sceaux, et donne des éléments utiles à leur description. 
              </dd>
            </dl>
          </div>
          <div
            v-if="$attrs.section === 'tradition'"
          >
            <h1>Tradition</h1>
            <p>
              La tradition d'un acte est l'état de rédaction dans lequel cet acte nous a été transmis, en déterminant s'il s'agit d'un original ou d'une copie, de qualifier le document de faux. L'étude de la tradition permet ainsi de porter un jugement sur la sincérité ou la fausseté du document. <br>
              Pour chaque terme ici retenu, une définition est donnée, ainsi qu'un lien vers le Vocabulaire International de la diplomatique.
            </p>
            
            <div class="toc">
              <h2>
                Liste des traditions
              </h2>
              <div class="columns">
                <div class="column">
                  <ul>
                    <li><a href="#tra-orig">Original</a></li>
                    <li><a href="#tra-orig-mul">Original multiple</a></li>
                    <li><a href="#tra-chirographe">Chirographe</a></li>
                    <li><a href="#tra-pancarte">Pancarte</a></li>
                    <li><a href="#tra-copie-inf">Copie informe</a></li>
                    <li><a href="#tra-copie-fig">Copie figurée</a></li>
                    <li><a href="#tra-copie-auth">Copie authentique</a></li>
                    <li><a href="#tra-trans">Transfixe</a></li>
                  </ul>
                </div>
                <div class="column">
                  <ul>
                    <li><a href="#tra-trad">Traduction</a></li>
                    <li><a href="#tra-cart">Cartulaire</a></li>
                    <li><a href="#tra-inv">Inventaire d’archives</a></li>
                    <li><a href="#tra-supp">Supplique et pétition</a></li>
                    <li><a href="#tra-form">Formulaire</a></li>
                    <li><a href="#tra-min">Minute et brouillon</a></li>
                    <li><a href="#tra-reg-not">Registre de notaire et de tabellion</a></li>
                    <li><a href="#tra-faux">Faux</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <dl>
              <dt id="tra-orig">
                Original
              </dt>
              <dd> 
                Document primitif, où est consignée pour la première fois sous sa forme définitive la volonté de l’auteur de l’acte et qui est destiné à faire foi. <br>
                VID n° 42 : <a href="https://www.cei.lmu.de/VID/#42">https://www.cei.lmu.de/VID/#42</a>
              </dd>

              <dt id="tra-orig-mul">
                Original multiple
              </dt>
              <dd>
                Exemplaires d’un même acte dressés simultanément, pour être remis aux diverses parties intéressées ou pour en assurer la conservation. <br>
                VID n° 43 [à l’exception des chirographes] : <a href="https://www.cei.lmu.de/VID/#43">https://www.cei.lmu.de/VID/#43</a>
              </dd>


              <dt id="tra-chiro">
                Chirographe
              </dt>
              <dd>
                Acte établi en deux exemplaires, sur une même feuille de parchemin, coupée par le milieu, pour que chacun des contractants ait un original de la pièce.<br>
                VID n° 44 : <a href="https://www.cei.lmu.de/VID/#44">https://www.cei.lmu.de/VID/#44</a> 
              </dd>

              <dt id="tra-pancarte">
                Pancarte
              </dt>
              <dd>
                Acte destiné à confirmer des droits et des biens dont les titres ont été perdus. Se dit par extension d’un cartulaire contenant les titres d’un établissement ecclésiastique.<br>
                VID n° 50 : <a href="https://www.cei.lmu.de/VID/#50">https://www.cei.lmu.de/VID/#50 </a>
              </dd>

              <dt id="tra-copie-inf">
                Copie informe
              </dt>
              <dd>
                Copie d’un acte ne comprtant pas de marque d’authenticité juridique apposé par une autorité. 
                VID n° 55 : <a href="https://www.cei.lmu.de/VID/#55">https://www.cei.lmu.de/VID/#55</a><br>
                <b>NB</b> : La « copie » peut être aussi bien manuscrite qu’imprimée.
              </dd>

              <dt id="tra-copie-fig">
                Copie figurée
              </dt>
              <dd>
                Copie dont l’auteur s’efforce de reproduire matériellement l’écriture, ou/et, en tout ou en partie, la disposition de l’original antérieur. <br>
                VID n° 56 : <a href="https://www.cei.lmu.de/VID/#56">https://www.cei.lmu.de/VID/#56</a><br>
                Indication complémentaire du mode de tradition principal (informe, authentique, cartulaire…) et signalant que le copiste reproduit non seulement le texte, mais encore tels éléments figurés, par exemple un chrismon ou un monogramme. <br>
                <b>NB</b> : La « copie » peut être aussi bien manuscrite qu’imprimée.
              </dd>

              <dt id="tra-copie-auth">
                Copie authentique
              </dt>
              <dd>
                VID n° 54 : <a href="https://www.cei.lmu.de/VID/#54">https://www.cei.lmu.de/VID/#54</a><br>
                Cette notion recouvre : 
                <ul>
                  <li>Vidimus. VID n° 67 : <a href="https://www.cei.lmu.de/VID/#67">https://www.cei.lmu.de/VID/#67</a></li>
                  <li>Copie sous le sceau. VID n° 61 : <a href="https://www.cei.lmu.de/VID/#61">https://www.cei.lmu.de/VID/#61</a></li>
                  <li>Copie notariée. VID n° 59 : <a href="https://www.cei.lmu.de/VID/#59">https://www.cei.lmu.de/VID/#59</a></li>
                  <li>Copie certifiée. VID n° 62 : <a href="https://www.cei.lmu.de/VID/#62">https://www.cei.lmu.de/VID/#62</a></li>
                </ul>
                <b>NB</b> : La « copie » peut être aussi bien manuscrite qu’imprimée.
              </dd>

              <dt id="tra-trans">
                Transfixe
              </dt>
              <dd>
                Groupe de document formé par la superposition de deux ou plusieurs actes, dont l’un est la justification de l’autre.<br>
                VID n° 71 : <a href="https://www.cei.lmu.de/VID/#71">https://www.cei.lmu.de/VID/#71</a>
              </dd>

              <dt id="tra-trad">
                Traduction
              </dt>
              <dd>Absent du VID</dd>

              <dt id="tra-cart">
                Cartulaire
              </dt> 
              <dd>
                Un cartulaire (lat.: c(h)artularium) est un recueil de copies de ses propres documents, établi par une personne physique ou morale, qui, dans un volume ou plus rarement dans un rouleau, transcrit ou fait transcrire intégralement ou parfois en extraits, des titres relatifs à ses biens et à ses droits et des documents concernant son histoire ou son administration, pour en assurer la conservation et en faciliter la consultation.<br>
                VID n° 74 : <a href="https://www.cei.lmu.de/VID/#74">https://www.cei.lmu.de/VID/#74</a><br>
                Contient : 
                <ul>
                  <li>Liber traditionum. VID n° 80 : <a href="https://www.cei.lmu.de/VID/#80">https://www.cei.lmu.de/VID/#80</a></li>
                </ul>
              </dd>

              <dt id="tra-inv">
                Inventaire d’archives
              </dt>
              <dd>
                Description plus ou moins détaillée du contenu des séries, fonds ou documents destinée à retrouver les documents.
                VID n° 84 : <a href="https://www.cei.lmu.de/VID/#84">https://www.cei.lmu.de/VID/#84</a>
              </dd>

              <dt id="tra-supp">
                Supplique et pétition
              </dt>
              <dd>
                La supplique est une requête en matière de grâce ou de justice. La pétition (lat. : petitio) est une requête, une demande motivée, écrite ou orale, résentée à une autorité par le futur bénéficiaire d’un acte.<br>
                VID n° 319 [requête] : <a href="https://www.cei.lmu.de/VID/#319">https://www.cei.lmu.de/VID/#319</a><br>
                VID n° 320 [pétitions] : <a href="https://www.cei.lmu.de/VID/#320">https://www.cei.lmu.de/VID/#320</a><br>
                VID n° 322 [supplique, s.v. « requête »] : <a href="https://www.cei.lmu.de/VID/#322">https://www.cei.lmu.de/VID/#322</a>
              </dd>

              <dt id="tra-form">
                Formulaire
              </dt> 
              <dd>
                Recueil de formules destinées à servir de modèles aux rédacteurs des actes. <br>
                VID n° 82 : <a href="https://www.cei.lmu.de/VID/#82" />
              </dd>

              <dt id="tra-min">
                Minute et brouillon
              </dt>
              <dd>
                La minute est la première rédaction d’un acte, pouvant servir de matrice à l’expédition de l’acte ou à d’éventuelles réexpéditions. Le brouillon est un projet informel de rédaction d’un texte, pouvant ensuite subir des corrections. <br>
                VID n° 353 [minute] : <a href="https://www.cei.lmu.de/VID/#353">https://www.cei.lmu.de/VID/#353</a>
                VID n° 349 [brouillon] : <a href="https://www.cei.lmu.de/VID/#349">https://www.cei.lmu.de/VID/#349</a>
              </dd>

              <dt id="tra-reg-not">
                Registre de notaire et de tabellion
              </dt>
              <dd> 
                Un registre est un volume dans lequel on procède à un enregistrement successif d’actes, de lettres ou de comptes. <br>
                <b>NB</b> : un registre est pris dans son acception diplomatique et non codicologique. Il peut ainsi inclure des rouleaux.<br>
                VID n°91 : <a href="https://www.cei.lmu.de/VID/#91">https://www.cei.lmu.de/VID/#91</a><br>
                Peut se présenter sous la forme de :
                <ul>
                  <li>Registre de chancellerie. VID n° 94 : <a href="https://www.cei.lmu.de/VID/#94">https://www.cei.lmu.de/VID/#94</a></li>
                </ul>
              </dd>

              <dt id="tra-faux">
                Faux
              </dt>
              <dd>
                Un faux est un acte qui n’est pas sincère, ne présentant pas le caractères de l’authenticité diplomatique.<br> 
                VID n° 111 [acte faux] : <a href="https://www.cei.lmu.de/VID/#111">https://www.cei.lmu.de/VID/#111</a>
              </dd>
            </dl>
          </div>
          <div
            v-if="$attrs.section === 'dates'"
          >
            <h1>Dates</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'facsimile'"
          >
            <h1>Images & facsimilés</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "DocumentationPage",
    components: {
    },
    computed: {
    },
    mounted() {
        document.querySelectorAll('.active').forEach(element => {
          element.classList.remove('active')
        });
        const activeSection = document.querySelector('#' + this.$route.params.section)
        if (activeSection) {
          activeSection.classList.add('active');
        }    },
    methods: {
     goTo(section) {
       if (section !=  this.$route.params.section) {
        document.querySelectorAll('.active').forEach(element => {
          element.classList.remove('active')
        });
        const activeSection = document.querySelector('#' + section)
        if (activeSection) {
          activeSection.classList.add('active');
        }
        this.$router.push({name: 'documentation', params: {section: section}})
        }
     }
    }
}
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
  }
</style>