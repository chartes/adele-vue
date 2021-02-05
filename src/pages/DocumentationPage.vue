/* eslint-disable vue/max-attributes-per-line */
<template>
  <div class="documentation-page">
    <div class="top">
      <div class="columns main-columns">
        <div class="column main-column is-2 themes">
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
                        id="projet"
                        @click="goTo('projet')"
                      >
                        Le projet
                      </li>
                      <li
                        id="contact"
                        @click="goTo('contact')"
                      >
                        Contact
                      </li>
                      <li
                        id="credits"
                        @click="goTo('credits')"
                      >
                        Crédits
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
                        id="conservation"
                        @click="goTo('conservation')"
                      >
                        Lieu de conservation : institution, cote
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
                        Types d'auteurs et de documents
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
          <!--
          <div
            v-if="$attrs.section === 'facsimile'"
          >
            <h1>Images & facsimilés</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          -->

          <div
            v-if="$attrs.section === 'about' || $attrs.section === null"
          >
            <h1>À propos</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants et de chercheurs un manuel de diplomatique progressivement construit autour du déchiffrement
              interactif, de l’annotation, si besoin de la traduction et enfin de l’analyse diplomatique d’actes et de
              documents de gestion. Appuyée sur un outil de mise au point collaborative des dossiers, en classe ou par des chercheurs
              associés, elle est dès l’origine conçue pour dilater le champ de vision de son noyau primitif (actes médiévaux français) dans
              l’espace dans le type et dans le temps.
            </p>
          </div>
          <div
            v-if="$attrs.section === 'projet' || $attrs.section === null"
          >
            <h1>Le projet</h1>
            <p>
              Depuis plus de trois siècles, la diplomatique a accumulé les ouvrages mais, assez curieusement, semble s’être détachée des planches gravées au milieu desquelles elle est née, et a plus encore négligé les albums d’actes, si l’on excepte des entreprises largement cantonnées dans le haut Moyen Âge et au moins autant tournées vers la paléographie et la recherche de haut niveau que vers la diplomatique et la pédagogie, tels les <cite>Chartae latinae antiquiores</cite> et les <cite>Monumenta palaeographica Medii Ævi</cite>. Rares sont ceux qui se sont volontairement construits autour d’un exposé raisonné de diplomatique, implicitement dans le cas des Exempla scripturarum pour les actes pontificaux (fasc. 3, 1965<sup>2</sup>), explicitement dans celui du manuel inachevé d’Alain de Boüard (1929-1948), qui a délibérément prolongé, et même enrichi, son propos dans des recueils de planches, sélectionnées avec grand bonheur.
            </p>
            <p>
              La situation, paradoxalement, ne s’est guère améliorée aux temps du numérique et surtout des hauts et très hauts débits, où le flot des images d’archives, qui s’en trouvent mieux préservées et plus facilement communiquées, reste mal domestiqué, avec des possibilités de recherche et de tri souvent réduites et un apparat quasi inexistant, même pour des réalisations aussi superbes que le site des archives de Saint-Maurice d’Agaune ou la colossale entreprise <a
                href="https://www.icar-us.eu/cooperation/online-portals/monasterium-net/"
                target="_blank"
              >Monasterium.net</a>, pour se limiter à deux exemples.
            </p>
            <p>
              Dans le même temps, la diplomatique s’est profondément renouvelée, elle a conquis de nouveaux territoires, elle est allée au-devant des historiens pour leur faire partager une sensibilité nouvelle aux contextes de la création et de la réception des écrits pragmatiques, aux courants complexes de l’innovation et de la circulation des rédacteurs, aux prises en main de la production par les autorités, aux jeux de la langue et du pouvoir… Elle exporte partout ses curiosités, sa méthode, son questionnaire : dans le temps, en quittant des horizons longtemps médiévaux, pour les époques modernes et contemporaines, comme pour les temps antiques (emblématiques de ce point de vue les études de Dominique Charpin, réunies dans <cite>Lire et écrire à Babylone</cite>, 2008) ; en sortant d’Europe ; en cessant de se cantonner aux actes <i>stricto sensu</i>, pour considérer du même œil les documents de gestion qui les prolongent dans l’exercice quotidien du pouvoir ou de la puissance (comptabilités, registres judiciaires et de délibération, enquêtes et inventaires…). Illustrée avec constance dans les pays de langue allemande comme en Belgique, elle reprend vigueur, en même temps que l’édition, en France ; elle déborde d’énergie dans la péninsule ibérique ; elle croise à nouveau les chemins de l’historien en Italie ; elle nourrit son agenda en Grande-Bretagne ; elle produit des sommes copieuses en Pologne comme en Serbie ; elle cherche à définir sa spécificité et à structurer son programme en Europe orientale comme en Éthiopie et au Japon…
            </p>
            <p>
              Il est assurément difficile, pour ne pas dire impossible, de maîtriser ce bouillonnement et l’on voit mal comment faire aboutir un manuel général, même collectif, qui dégage des lignes de force tout en respectant les nuances, en décapant nouveautés et traditions. Après avoir donné un précieux <i>Vocabulaire</i> et apporté, par une riche série de congrès, de multiples touches à l’impossible fresque (<a
                href="http://elec.enc.sorbonne.fr/cid/"
                target="_blank"
              >http://elec.enc.sorbonne.fr/cid/</a>), la Commission internationale de diplomatique s’est résignée à abandonner son projet de manuel international. Le manque n’en est pas moins ressenti avec force dans le domaine de la recherche fondamentale comme dans celui de l’enseignement.
            </p>
            <p>
              Répondre à ces attentes, donner à voir aux uns, à apprendre aux autres, aiguiser le regard tout en proposant des exercices concrets (de lecture, de traduction, d’identification, de regeste et <i>in fine</i> d’analyse diplomatique), encourager le comparatisme, donner aussi sa juste place à l’examen des caractéristiques de forme dont les études de Peter Rück sur la « rhétorique visuelle » de l’acte ont montré tout le potentiel (format, mise en page, recours à l’image et au signe…) : telles sont les promesses d’un recours au genre de l’album, à condition de ne pas le limiter à la juxtaposition de clichés, assortis d’un commentaire minimal ou d’une fiche signalétique. Telle est l’ambition du projet ADELE (Album de diplomatique en ligne).
            </p>
            <p>
              Cet album est conçu comme un manuel inversé : il part des images pour arriver au discours ; et comme un manuel en petit appareil : il part « du bas » avec de menues tesselles qui s’enchâssent progressivement dans un discours plus général, chaîné par des renvois d’un dossier à un autre, modelable et paramétrable par l’utilisateur grâce aux fonctions de tri.
            </p>
            <p>
              Chaque item correspond à un document – original, mais aussi bien copie (volante ou en livre) ; minutes, brouillons, faux, fac-similés, imprimés… ne sont pas oubliés. Une architecture à la fois riche et souple doit rendre compte des diverses phases de l’analyse comme des différentes dimensions de l’acte : selon les besoins, la transcription, la traduction et le commentaire diplomatique (lui-même ouvert au contexte et à la portée historique du document) peuvent être complétés de commentaires philologiques, paléographiques, codicologiques, sigillographiques…
            </p>
            <p>
              Cette architecture a été imaginée, testée, mise au point à l’École nationale des chartes dans le cadre de l’application THELEME (Techniques pour l’historien en ligne), qui fait maintenant figure de prototype, sans indexation et où les premiers dossiers, de paléographie, conçus par Marc Smith, ont été progressivement flanqués de dossiers diplomatiques, préparés par les étudiants des cours de diplomatique médiévale puis de diplomatique moderne (dir. Olivier Guyotjeannin et Olivier Poncet ; vue d’ensemble des dossiers consultables dans <a
                href="http://theleme.enc.sorbonne.fr/dossiers/"
                target="_blank"
              >http://theleme.enc.sorbonne.fr/dossiers/</a>). Le premier de ces dossiers de diplomatique a été publié sur le site de l’École des chartes en 2001 (<a
                href="http://theleme.enc.sorbonne.fr/dossiers/notice20.php"
                target="_blank"
              >http://theleme.enc.sorbonne.fr/dossiers/notice20.php</a>). Ils sont aujourd’hui au nombre de 89, étagés du IX<sup>e</sup>  au XVIII<sup>e</sup> siècle.
            </p>
            <p>
              L’élargissement le plus visible prévu dans le projet ADELE est celui des frontières spatiales et temporelles, et encore typologiques, avec l’introduction de documents d’archives qui n’atteignent pas le degré de formalisation des « actes » <i>stricto sensu</i>. Délibéré, l’élargissement du champ spatial et du champ chronologique, potentiellement étendu à toute l’histoire de l’écriture dès lors que l’on y a fixé la « parole de Mammon », impose le recours à de nombreux spécialistes, français ou étrangers, membres d’institutions françaises et étrangères ou internationales, sur la base de contacts personnels ou institutionnels, en tout premier lieu la Commission internationale de diplomatique.
              Il implique aussi l’introduction de langues européennes de diffusion internationale pour la rédaction des dossiers : anglais, allemand, espagnol (castillan), portugais, italien viendront se joindre au français, qu’il est pour l’heure prévu d’employer seul pour la présentation des métadonnées.
            </p>
            <p>
              Le recours aux outils numériques est indispensable sous plusieurs aspects : pour gérer la constitution progressive du « recueil » ; pour aider à rebattre les cartes à volonté ; pour appuyer avec des instruments solides d’indexation et de tri la constitution de sous-corpus à la demande ; enfin, mais les premières explorations montrent la difficulté de l’entreprise, pour explorer les possibilités de recherche automatisée ou semi-automatisée d’une documentation complémentaire (bibliographie, éditions, clichés…) disponible ailleurs sur le web.
            </p>
          </div>
          <div
            v-if="$attrs.section === 'credits' || $attrs.section === null"
          >
            <h1>Crédits</h1>
            Projet soutenu par <a
              href="https://scripta.psl.eu/"
              target="_blank"
            >Scripta</a> et par le DIM STCN, placé sous le patronage de la <a
              href="https://cidipl.org/"
              target="_blank"
            >Commission internationale de diplomatique</a>.
            <ul>
              <li>Conception scientifique : Olivier Guyotjeannin</li>
              <li>Conception informatique : École des chartes, missions projets numériques</li>
              <li>Saisies et conversions, tests : Pierre Pocart, Alexandre Gaudin, Sarah Rigaudeau</li>
              <li>Conseils : Jean-Baptiste Camps, Olivier Canteaut</li>
              <li>Collaborateurs extérieurs : Pilar Ostos (Séville), Cristina Cunha (Porto)</li>
            </ul>
          </div>
          <div
            v-if="$attrs.section === 'acte-types'"
          >
            <h1>Types d'auteurs et de documents</h1>

            <p>
              Il a été choisi de répartir la typologie des actes et des documents de gestion entre deux ensembles distincts, mais non exclusifs, puisque certains documents de gestion sont coulés dans le moule d’actes formels et munis de validation, comme par exemple les terriers ou les aveux et dénombrements.
            </p>
            <p>
              Pour les actes, on a surtout procédé en recensant et en classant les types d’auteurs d’actes écrits, selon un point de vue éminemment diplomatique. Les types diplomatique précis, élaborés surtout au sein des chancelleries souveraines, sont pour leur part explicités dans la page de titre du dossier. Les documents de gestion sont organisés selon leur fonction et/ou leur type de producteur.
            </p>
            <p>
              Après les définitions ou précisions concernant chacun des types, un lien est disposé vers la base bibliographique <a
                href="http://el.enc.sorbonne.fr/bede/"
                target="_blank"
              >Bède</a>, qui recense les éditions et études d’actes et documents de la France médiévale (essentiellement à l’heure actuelle pour les années 1965-2000), et dont la typologie a été largement reprise.
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
              Il est nécessaire de faire la distinction entre l'auteur de l'acte écrit et l'auteur de l'action juridique.
              L'auteur de l'acte écrit est <i>l'auctor</i>, celui qui garantit et protège l'acte. Son nom est présent en début d'acte, dans la suscription, et est normalement rappelé par le sceau ou dans les validations finales.
              Les termes et le découpage sont modelés au plus près possible sur ceux de la base <a href="http://elec.enc.sorbonne.fr/bede/">Bède</a>.
            </p>
            <dl>
              <dt id="ac-pape">
                Pape et entourage
              </dt>
              <dd>
                Recouvre les actes mis sous le nom du pape mais aussi les écrits produits en Curie, ou sous les noms des adjoints ou délégués du pape (cardinaux, légats, conciles…).
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
                Inclut : Archevêques, Chapitre cathédral et ses dignitaires, synodes diocésains et provinciaux, vicaire, official, archidiacres, doyens de chrétienté, curés (hors juridiction gracieuse). <br>
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
                La catégorie « Religieux » contient tout autant des actes laïcs sous le sceau ecclésiastique, que des actes émanant directement d'établissement religieux, tels que les abbayes ou les prieurés. <br>
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
                Inclut : épouse, héritier… Complété d’un deuxième niveau, esquissant une grossière répartition par entité géographique (noms des pays actuels) (à compléter pour l’Est) :
                <ul>
                  <li>Empereur d’Orient</li>
                  <li>Empereur d’Occident</li>
                  <li>Rois jusqu'au Xe siècle</li>
                  <li>Roi/France</li>
                  <li>Roi/Iles britanniques (inclut Angleterre, Ecosse, Irlande, Galles)</li>
                  <li>Roi/Espagne  (inclut Léon, Castille, Aragon)</li>
                  <li>Roi/Portugal</li>
                  <li>Roi/Allemagne</li>
                  <li>Roi/Scandinavie</li>
                  <li>Roi/Bohême</li>
                  <li>Roi/Hongrie…</li>
                </ul><br>
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
                Sous ces termes l'on retrouve l'intégralité des actes relatifs aux différents échelons de la haute noblesse : prince, duc, comte, baron, vicomte ... <br>
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
                Contient les actes relatifs aux seigneuries et aux particuliers. <br>
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
                <!-- OGJ. IL FAUT UNE DÉFINITION -->
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Actes privés nouveaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter77.php">http://elec.enc.sorbonne.fr/bede/feuilleter77.php</a></li>
                </ul>

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
                <!-- OGJ. IL FAUT UNE DÉFINITION -->
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Actes privés nouveaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter77.php">http://elec.enc.sorbonne.fr/bede/feuilleter77.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>
                <ul>
                  <li>« Acte sous les sceaux de l’officialité archidiaconale de Verdun et d’un seigneur (Lorraine). Un montage féodal complexe : reprises et cessions d'un fief épiscopal en cascade » : <a href="https://dev.chartes.psl.eu/adele/documents/39/view/notice">n° 39</a></li>
                  <li>« Acte sous le sceau du doyen de chrétienté de Verberie (diocèse de Soissons). Charité bien ordonnée : don et échange de terre d'un bourgeois de Compiègne aux cisterciens de Chaalis » : <a href="https://dev.chartes.psl.eu/adele/documents/78/view/notice">n° 78</a></li>
                </ul>
              </dd>

              <dt id="ac-jur-gra">
                Juridiction gracieuse laïque
              </dt>
              <dd>
                Exclut les juridictions municipales, échevinales…<br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Actes privés nouveaux » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter77.php">http://elec.enc.sorbonne.fr/bede/feuilleter77.php</a></li>
                </ul>
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
                Il s'agit principalement de documents décrivant la terre appartenant à un seigneur. Ainsi, on retrouvera dans cette catégorie les polyptiques, les censiers et terriers, ainsi que les aveux et dénombrements de tenures. <br>
                <div class="related-docs">
                  Bede :
                </div>
                <ul>
                  <li>« Documents de gestion domaniale » : <a href="http://elec.enc.sorbonne.fr/bede/feuilleter91.php">http://elec.enc.sorbonne.fr/bede/feuilleter91.php</a></li>
                </ul>
                <div class="related-docs">
                  Exemple de dossiers :
                </div>« Acte de justice seigneuriale (Normandie). Aux plaids de la seigneurie : aveu et dénombrement de tenure » : <a href="https://dev.chartes.psl.eu/adele/documents/85/view/notice">n° 85</a>.
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
                Regroupe tous les actes et documents relatifs à la gestion des fiefs au sens courant, et des relations qu’ils nourrissent : hommages, fidélités, aveux et dénombrements, livres de fiefs…<br>
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
                Il s'agit de documents élaborés dans le cadre des relations extérieures.<br>
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
              Depuis Mabillon au moins, le découpage et la comparaison des parties du discours, atomes de la construction textuelle des actes, sont reconnus comme des outils essentiels de la critique diplomatique, mais aussi de l’étude de l’alchimie rédactionnelle des actes, et des relations entre rédacteurs. Par la suite, les diplomatistes ont appris à les constituer en séries et à les exploiter pour elles-mêmes, ainsi pour le préambule, la suscription (<i>intitulatio</i>), les clauses comminatoires ou de renonciation…
              Pour appuyer le commentaire diplomatique, que l’on opère sur des documents isolés, sur des groupes ou sur de larges ensembles, nos dossiers visualisent souvent, sous forme d’un schéma coloré, la structure de l’acte étudié. Parce qu’ils sont moins formalisés dans leur rédaction, les documents de gestion ne se prêtent guère à ce jeu.
            </p>
            <p>
              De l’une à l’autre, les parties du discours sont très variables dans leur extension spatiale, temporelle et typologique ; certaines sont ignorées des manuels, et même, à l’occasion, du Vocabulaire international… Notre recensement en a certainement laissé échapper ; et notre propos était avant tout pédagogique. Pour toutes ces raisons, nous nous sommes arrêtés à un haut niveau de généralisation, englobant l’ensemble du discours, distribuant les fonctions essentielles (identifier l’auteur, décrire et garantir l’action juridique, valider l’acte écrit….), non sans quelque anachronisme (la date est parfois proche d’une validation), entre 14 ensembles dont le détail est précisé ci-après.
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
                    Exemple : « <i>non meis exigentibus meritis</i> »
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
                      <li><i>Laudatixo parentum</i> : <a href="https://www.cei.lmu.de/VID/#334">https://www.cei.lmu.de/VID/#334</a></li>
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
                  <li>Clause intentionnelle (absente du VID, v.g. <i>Car ainsi nous plait il estre fait</i>, <i>Hec omnia voluerunt</i>)</li>
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
                    Clause pénale (générique) : <a href="https://www.cei.lmu.de/VID/#237">https://www.cei.lmu.de/VID/#237</a><br>
                    Se décompose en :
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
                  <li>Clause de <i>stipulatio</i> (absente du VID) : <i>stipulatione subnexa</i>… Désigne à l’origine l’échange formaliste de paroles sanctionnant le négoce.</li>
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
                Peut se comprendre en :
                <ul>
                  <li>Date de lieu : <a href="https://www.cei.lmu.de/VID/#563">https://www.cei.lmu.de/VID/#563</a></li>
                  <li>Date de temps : <a href="https://www.cei.lmu.de/VID/#562">https://www.cei.lmu.de/VID/#562</a></li>
                  <li>Ménologe : <a href="https://www.cei.lmu.de/VID/#158">https://www.cei.lmu.de/VID/#158</a></li>
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
            v-if="$attrs.section === 'conservation'"
          >
            <h1>Lieu de conservation : institution, cote</h1>
            <p>
              Les fac-similés de l’École utilisés dans Theleme (et donc dans la première partie d’ADELE) n’indiquent que très irrégulièrement la provenance des documents, et quasi jamais leur cote précise. L’interrogation de cette zone est donc à réserver essentiellement à des fins de gestion. – Le nom officiel développé de l’institution est complété, entre parenthèses, du nom du pays s’il n’est pas intégré au titre et, pour les institutions locales, du nom de la ville, aux mêmes conditions. Ces indications complémentaires sont données dans la forme française usuelle.
            </p>
            <p>
              Ex. Bibliothèque nationale de France, Archives nationales (France), British Library, Archives générales du Royaume (Belgique), Archivio di Stato Arezzo (Italie), Archives départementales Cher (France), Archivo de la Corona de Aragon (Espagne), etc.
            </p>
            <p>
              Le cas échéant, est donnée la cote (dans l’une des deux séries, dites Ancien fonds, AF, ou Nouveau fonds, NF) du fac-similé de l’École des chartes qui fait l’objet du dossier. La plupart de ces fac-similés ont été réalisés par l’École, d’abord en lithographie (cotes AF 1-632), puis selon divers procédés photographiques, dont l’héliogravure (cotes NF 1-, mais aussi AF 633-). Il convient d’être prévenu contre le mauvais rendu de certaines lithographies, dessinées par des artisans ignorant tout de la paléographie, quand d’autres sont de véritables chefs-d’œuvre.
            </p>
            <p>
              Les clichés numérisés, reproduits avec la libérale autorisation des institutions chargées de leur conservation, sont tantôt le fruit de commandes spéciales, tantôt le fait de prospections sur des sites internet.
            </p>
          </div>
          <div
            v-if="$attrs.section === 'places'"
          >
            <h1>Région [Pays & lieux identifiés]</h1>
            <p>
              Pour l'identification des lieux, nous employons, quand elle existe, la forme moderne usuelle en français, y compris pour les noms de lieux étrangers (Rome, Londres, Augsbourg), laissant « telle quelle » la forme ancienne quand elle n'est pas identifiée.
            </p>
            <p>
              Pour la France, les identifications sont par convention faites d'après le système administratif des départements et cantons (en suivant le Dictionnaire des communes de 1997). <br>
              Bientôt, des liens seront créés entre le <a href="https://dicotopo.cths.fr/">Dictionnaire Topographique</a> et les différents référentiels de lieux, pour permettre l'interopérabilité des données géographiques.
            </p>
            <p>
              Pour les identifications des noms de lieux, il peut être utile de consulter les ressources suivantes :
            </p>
            <ul class="bullet-list">
              <li>Le Dictionnaire Topographique de la France : <a href="https://dicotopo.cths.fr/">DicoTopo</a></li>
              <li>La base "Nominatim" d'OpenStreetMap : <a href="https://nominatim.openstreetmap.org/ui/search.html">Nominatim</a></li>
            </ul>
            <p>
              L’ancrage spatial des documents est donné par les titulatures, mais celles-ci sont souvent larges, ou décalées : on a donc choisi de retenir la ou les zones impliquées dans l’action ou la description notifiée et sanctionnée par l’acte ou le document  – micro-région gouvernée par des coutumes (juridiques, judiciaires, agraires, familiales…), par des usages diplomatiques qui n’ont rien d’isolats, mais livrent le souvenir morcelé de pratiques entretenues ou négligées, reformées ou disqualifiées au fil d’un puissant brassage documentaire ; rapportant ensuite ces briques à un ensemble plus vaste, autorisant une identification immédiate et parlante.
            </p>
            <p>
              Recourir aux anciennes circonscriptions laïques ou ecclésiastiques anciennes, sous couvert d’authenticité, laissait subsister trop d’incertitudes, qui auraient fait manquer le projet initial. On s’est donc résolu à une solution rustique, évidente et sûre : rapporter les lieux retenus aux pays actuels et, sous ces derniers, à des circonscriptions contemporaines d’une taille qui permît de rapprocher assez aisément les localités, à une échelle relativement proche de celle des anciennes provinces et principautés – bref, des entités souvent bien représentées par les régions françaises ou italiennes (voir les listes ci-dessous).
            </p>

            <!-- structure ? div ? section ? lien ? -->
            <h2>Angleterre : v. Royaume-Uni</h2>

            <h2>Belgique</h2>
            <p>
              Le territoire belge est réparti en deux régions, Flandre et Wallonie (outre la région de Bruxelles-capitale), comprenant chacune cinq provinces – niveau auquel nous nous arrêtons :
            </p>
            <p>Vlaams Gewest (Flandre) :</p>
            <ul>
              <li>Antwerpen (Anvers)</li>
              <li>Limburg (Limbourg)</li>
              <li>Oost-Vlaanderen (Flandre-Orientale)</li>
              <li>Vlaams-Brabant (Brabant flamand)</li>
              <li>West-Vlaanderen (Flandre-Occidentale)</li>
            </ul>
            <p>Wallonie :</p>
            <ul>
              <li>Brabant wallon</li>
              <li>Hainaut</li>
              <li>Liège</li>
              <li>Luxembourg</li>
              <li>Namur</li>
            </ul>
            <img
              :src="require('@/assets/images/map_belgique.png')"
              alt="carte de la belgique"
            >

            <h2>Espagne</h2>
            <p>
              Les provinces espagnoles, suivant en partie le modèle des départements français, remontent à 1833 et respectent les limites des anciens royaumes ibériques, mais leur nombre (55) et leur taille les disqualifient pour notre entreprise (source de la carte : Imago mundi).
            </p>
            <img
              :src="require('@/assets/images/map_espagne.png')"
              alt="carte de l’espagne"
            >
            <p>
              Nous nous rabattons donc sur les « Autonomies » (ou « Communautés autonomes »), annoncées dans la constitution de 1978 et progressivement mises en place, avec un mélange de critères historiques et de considérations politiques. Le découpage en 17 communautés (correspondant à une ou plusieurs provinces) a été sanctionné en 1983, et complété en 1995 des deux villes, autonomes, de Ceuta et Melilla :
            </p>
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
            <img
              :src="require('@/assets/images/map_espagne_2.png')"
              alt="carte de l’espagne"
            >

            <h2>France</h2>
            <p>
              Les régions, préfigurées en 1960 dans les « Circonscriptions d’action régionale » entre lesquelles sont répartis les départements, s’imposent d’elles-mêmes par leur taille et leur cohérence historique (évidemment imparfaite), avec quelques exceptions où les regroupements se font plus arbitraires, ou dénoncent d’autres critères, économiques ou démographiques, comme la région Centre, étirée du Berry au Chartrain ; Rhône-Alpes menant de la Bresse au Dauphiné et de la Savoie au Vivarais ; ou encore cet hétéroclite Pays de la Loire, qui s’entend des terres riveraines du cours inférieur de la Loire, juxtaposant le Nantais arraché à la Bretagne, le Maine, le Bas-Poitou, l’Anjou…
            </p>
            <img
              :src="require('@/assets/images/map_france.png')"
              alt="carte de la france"
            >
            <p>
              À l’attention des lecteurs peu familiers avec ces découpages, nous indiquons ci-après, en italique et entre parenthèses, la concordance très grossière entre ces régions ou portions de région et les principales provinces ou « pays » historiques de France (essentiellement d’après J. Moreau, <i>Dictionnaire de géographie historique de la Gaule et de la France</i>, Paris, 1972, carte n° 3, h.-t.). – Un regroupement des régions a été introduit le 1<sup>er</sup> janvier 2016, qui aboutit à des ensembles trop larges pour nos besoins.
            </p>
            <ul>
              <li>Alsace (<i>Alsace</i>)</li>
              <li>Aquitaine (<i>Guyenne</i>, <i>Périgord</i>, <i>Agenais</i>, <i>Gascogne</i>, <i>Béarn</i>)</li>
              <li>Auvergne (<i>Auvergne</i>, <i>Velay</i>)</li>
              <li>Bourgogne (<i>Bourgogne</i>, <i>Nivernais</i>)</li>
              <li>Bretagne (<i>Bretagne</i>, sans le <i>Nantais</i>)</li>
              <li>Centre (<i>Berry</i>, <i>Touraine</i>, <i>Orléanais</i>, <i>Blésois</i>, <i>Dunois</i>, <i>Chartrain</i>)</li>
              <li>Champagne-Ardenne (<i>Champagne</i>)</li>
              <li>Corse (<i>Corse</i>)</li>
              <li>Franche-Comté (<i>Franche-Comté</i>)</li>
              <li>Ile-de-France (<i>Ile-de-France</i>)</li>
              <li>Languedoc-Roussillon (<i>Roussillon</i>, <i>Languedoc</i>, <i>Gévaudan</i>)</li>
              <li>Limousin (<i>Limousin</i>, <i>Marche</i>)</li>
              <li>Lorraine (<i>Lorraine</i>)</li>
              <li>Midi-Pyrénées (<i>Languedoc</i> [<i>Albigeois</i>, <i>Toulousain</i>], <i>Quercy</i>, <i>Rouergue</i>, <i>Gascogne</i>, <i>Foix</i>)</li>
              <li>Nord-Pas-de-Calais (<i>Flandre</i>, <i>Artois</i>, <i>Boulonnais</i>)</li>
              <li>Basse-Normandie (<i>Normandie</i>)</li>
              <li>Haute-Normandie (<i>Normandie</i>)</li>
              <li>Pays de la Loire (<i>Bretagne</i> [<i>Nantais</i>], <i>Bas-Poitou</i> [<i>future Vendée</i>], <i>Anjou</i>, <i>Maine</i>)</li>
              <li>Picardie (<i>Picardie</i>, <i>Soissonnais</i>, <i>Laonnois</i>)</li>
              <li>Poitou-Charentes (<i>Poitou</i>, <i>Aunis</i>, <i>Saintonge</i>, <i>Angoumois</i>)</li>
              <li>Provence-Alpes-Côte d’Azur [PACA] (<i>Provence</i>, <i>Comtat-Venaissin</i>, <i>Niçois</i>)</li>
              <li>Rhône-Alpes (<i>Bresse</i>, <i>Bugey</i>, <i>Dombes</i>, <i>Savoie</i>, <i>Lyonnais</i>, <i>Vivarais</i>, <i>Dauphiné</i>)</li>
            </ul>

            <h2>Italie</h2>
            <p>
              Comme en France, les vingt régions, regroupant ici des « provinces » au fort substrat historique, offrent un cadre commode :
            </p>
            <img
              :src="require('@/assets/images/map_italie.png')"
              alt="carte de l’Italie"
            >
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

            <h2>Royaume-Uni /Angleterre</h2>
            <p>
              La diversité est ici de mise, et pas seulement parce que les entités progressivement agrégées à l’Angleterre, Pays de Galles, Écosse, Irlande du nord, ont gardé leur organisation propre (qui ne sera pas retenue ici), mais encore parce que, en Angleterre même, le découpage des diverses circonscriptions est plus d’une fois discontinu et leur ancrage historique inégal. Nous nous sommes donc arrêtés aux neuf régions statistiques dans leur état antérieur à 2015 :
            </p>
            <img
              :src="require('@/assets/images/map_angleterre.png')"
              alt="carte du Royaume-Uni"
            >
            <ul>
              <li>
                North West England (<a
                  href="https://fr.wikipedia.org/wiki/Angleterre_du_Nord-Ouest"
                  target="_blank"
                >Angleterre du Nord-Ouest</a>)
              </li>
              <li>
                North East England  (<a
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
                South West England  (<a
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

            <h2>Portugal</h2>
            <p>
              Prévues dans la constitution de 1976, cinq « régions administratives » couvrent le Portugal continental (Madère et les Açores n’ont plus la qualité de régions autonomes), et regroupent, en les partageant parfois, un total de 18 districts :
            </p>
            <img
              :src="require('@/assets/images/map_portugal.png')"
              alt="carte du Portugal"
            >
            <ul>
              <li>Norte</li>
              <li>Centro</li>
              <li>Lisboa</li>
              <li>Alentejo</li>
              <li>Algarve</li>
            </ul>

            <h2>République tchèque</h2>
            <p>
              La Bohème et la Moravie sont réparties entre onze provinces administratives (<i>kraj</i>), à la filiation historique peu affirmée :
            </p>
            <img
              :src="require('@/assets/images/map_republique_tcheque.png')"
              alt="carte de la République tchèque"
            >
            <p>[en Bohême :]</p>
            <ul>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/Boh%C3%AAme-Centrale"
                  target="_blank"
                >Bohême centrale</a> (<i>Středočeský kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Karlovy_Vary"
                  target="_blank"
                >Région de Karlovy Vary</a> (<i>Karlovarský kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Hradec_Kr%C3%A1lov%C3%A9"
                  target="_blank"
                >Région de Hradec Králové</a> (<i>Královéhradecký kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Liberec"
                  target="_blank"
                >Région de Liberec</a> (<i>Liberecký kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Plze%C5%88"
                  target="_blank"
                >Région de Plzeň</a> (<i>Plzeňský kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_d'%C3%9Ast%C3%AD_nad_Labem"
                  target="_blank"
                >Région d’Ústí nad Labem</a> (<i>Ústecký kraj</i>)
              </li>
            </ul>
            <p>[À cheval entre Bohême et Moravie :]</p>
            <ul>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/Boh%C3%AAme-du-Sud"
                  target="_blank"
                >Bohême-du-Sud</a> (<i>Jihočeský kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Pardubice"
                  target="_blank"
                >Région de Pardubice</a> (<i>Pardubický kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Vyso%C4%8Dina"
                  target="_blank"
                >Région de Vysočina</a> (<i>Kraj Vysočina ou Vysočina</i>).
              </li>
            </ul>
            <p>[en Moravie :]</p>
            <ul>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/Moravie-du-Sud"
                  target="_blank"
                >Moravie-du-Sud</a> (<i>Jihomoravský kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Zl%C3%ADn"
                  target="_blank"
                >Région de Zlín</a> (<i>Zlínský kraj</i>).
              </li>
            </ul>
            <p>[à cheval entre Moravie et Silésie :]</p>
            <ul>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_de_Moravie-Sil%C3%A9sie"
                  target="_blank"
                >Moravie-Silésie</a> (<i>Moravskoslezský kraj</i>)
              </li>
              <li>
                <a
                  href="https://fr.wikipedia.org/wiki/R%C3%A9gion_d'Olomouc"
                  target="_blank"
                >Région d’Olomouc</a> (<i>Olomoucký kraj</i>).
              </li>
            </ul>
          </div>
          <div
            v-if="$attrs.section === 'persons'"
          >
            <h1>Personnes identifiées</h1>
            <p>
              Pour l'identification des noms de personnes, on suit dans les dossiers rédigés en français les usages des éditeurs français d'actes. Sauf forme consacrée par l'usage (Louis le Pieux, Saint Louis), on donne le plus possible la forme contemporaine traduite, tout en tenant compte si possible des formes régionales (Gautier, Wautier, Walter), et des formes étrangères (Stephen, Stepan, Stefano ...).
            </p>
          </div>
          <div
            v-if="$attrs.section === 'commentaries'"
          >
            <h1>Types de commentaires fournis</h1>
            <p>
              Par essence, le commentaire fourni dans chaque dossier est un commentaire diplomatique, normalement assorti de remarques portant sur l’écriture et la mise en page, la langue, le(s) sceau(x), le contexte historique, les traits juridiques. Des plus rapides pour l’heure, ces commentaires sont appelés, au coup par coup, à s’étoffer, sinon à s’autonomiser. Les différents modules correspondants seront dans ce cas signalés à ce niveau.
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
                <p>
                  Le commentaire historique explique le contexte de rédaction de l'acte. Il peut permettre ou non de faire une critique de l'exposé indiqué en début d'acte, et motivant la décision qui a été prise. <br>
                  Il peut faire le rappel des précédents actes relatifs au même sujet.<br>
                  Egalement, il peut faire un rappel de l'historique de document de la même typologie, si cela est pertinent. <br>
                  Par exemple, un document tel qu'un censier peut faire l'objet d'un commentaire historique, en l'étudiant par rapport aux autres censiers plus anciens de la même province.
                </p>
              </dd>
              <dt id="co-juridique">
                Commentaire juridique
              </dt>
              <dd>
                <p>
                  Le commentaire juridique s'appuie sur les caractères externes qui se trouvent en le document. Par exemple, l'étude peut porter sur les éléments de validation de l'acte, qui donnent la force juridique au document.
                  Aussi, le commentaire juridique peut s'appuyer sur le contenu textuel du document en question.
                </p>
              </dd>
              <dt id="co-philolo">
                Commentaire philologique
              </dt>
              <dd>
                <p>
                  Le commentaire philologique étudie la langue et les expressions utilisées. Celui-ci peut reprendre et étudier de façon plus précise certains passages du contenu textuel du document, en faisant par exemple le repérage d'éléments d'accentuation, parmi les termes utilisés, le rythme du texte (en repérant par exemple le <i>cursus velox</i>).
                </p>
              </dd>
              <dt id="co-paleo">
                Commentaire paléographique
              </dt>
              <dd>
                <p>
                  Ce commentaire s'appuie essentiellement sur l'écriture du document. On peut y décrire les longueur des hastes et des hampes, des caractères se distinguant plus nettement du corps du texte.
                  Aussi on pourra également y commenter les abréviations et les signes de ponctuation utilisés ou non dans le texte. Les formes et les lettres qui sont abrégés pourront être décrites, pour montrer une certaine singularité ou au contraire, une homogénéité des caractères.
                </p>
              </dd>
              <dt id="co-sigillo">
                Commentaire sigillographique
              </dt>
              <dd>
                <p>
                  Le commentaire sigillographique porte sur l'étude du sceau.
                  Il est autant intéressant d'étudier l'iconographie, les éléments représentés dans le sceau (le vêtement, l'armement, la symbolique), la couleur et la matière du sceau.
                  Aussi, le sceau peut contenir des éléments textuels, pouvant reprendre la suscription en début d'acte.
                </p>
                <p>
                  Autre élément pouvant être décrit dans ce commentaire : la façon dont est scellé l'acte. Il peut parfois être fait sur simple queue, sur double queue, et peuvent être représentatifs ou non d'un type d'acte.
                  La base de données <a href="www.sigilla.org">Sigilla</a> peut être riche en informations sur les sceaux, et donne des éléments utiles à leur description.
                </p>
              </dd>
            </dl>
          </div>
          <div
            v-if="$attrs.section === 'tradition'"
          >
            <h1>Tradition</h1>
            <p>
              La tradition d’un acte a pu être définie comme la chaîne des états successifs de l’acte, depuis le moment de sa création jusqu’à l’état que nous avons sous les yeux. Ces états sont, sans exhaustivité, la copie intégrale ou partielle, l’extrait, la simple mention, ou encore la falsification, la reproduction dessinée ou photographiée, la traduction. D’abord conçue sous l’empire de la philologie comme méthode permettant de débusquer les faiblesses des copies et d’appuyer la reconstitution du « bon » texte, l’étude de la tradition a inscrit à son programme l’analyse de l’attention portée à l’acte au fil des siècles, de ses lectures et, en un mot, de sa réception.
            </p>
            <p>
              Pour chaque terme ici retenu, une définition est donnée, ainsi qu'un lien vers le Vocabulaire International de la diplomatique.
            </p>

            <div class="toc">
              <h2>
                Liste des modes de tradition
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
                Acte établi en deux ou plusieurs exemplaires, sur une même feuille de parchemin, coupée par le milieu, pour que chacun des contractants ait un original de la pièce.<br>
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
                Copie d’un acte ne comportant pas de marque d’authenticité juridique apposé par une autorité.
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
                Copie qui, établie dans une certaine forme, comporte des éléments de validation destinés à lui donner pleine foi. <br>
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
                Description plus ou moins détaillée du contenu des séries, fonds ou documents destinée à retrouver les documents et/ou à en prendre rapidement connaissance.
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
                VID n° 82 : <a href="https://www.cei.lmu.de/VID/#82">https://www.cei.lmu.de/VID/#82</a>
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
              Dans la page de titre des dossiers, la « date de l’original » est la date de rédaction ou compilation originelle de l’acte/document présenté dans le dossier, même si l’état retenu et reproduit remonte à une autre date – par exemple la copie d’un diplôme de 849 dans un cartulaire du <span class="sc">xii</span><sup>e</sup> siècle sera classée et indexée à 849, quand bien même une partie du commentaire serait consacrée au cartulaire.
            </p>
            <p>
              Les listes de dossiers (liste générale, listes particulières obtenues après tri) sont classées par date, plus exactement par année, autant que possible ramenée au style du 1<sup>er</sup> janvier.
              Les actes/documents de datation incertaine sont classés à la date la plus récente possible.
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
