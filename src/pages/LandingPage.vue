<template>
  <div class="container landing-page">
    <div class="top">
      <div class="columns">
        <div class="column themes">
          <div class="content">
            <p class="column-title">Dossiers thématiques</p>
            <ul>
              <li>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Notices</p>
                  </div>
                  <div class="card-content">
                    <p>Risus turpis, at commodo neque dictum eget. Nullam pretium suscipit sagittis. Proin ac consectetur metus, quis ultrices nisl.</p>
                  </div>
                </div>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Documents féodaux</p>
                  </div>
                  <div class="card-content">
                    <p>Pellentesque interdum libero diam, facilisis pulvinar mi aliquam at.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-half">

          <nav class="navbar inner-navbar">
            <a class="navbar-item" href="#projet">le projet</a>
            <hr class="navbar-divider">
            <a class="navbar-item" href="/documents">les dossiers</a>
            <hr class="navbar-divider">
            <a class="navbar-item" href="#">métadonnées et tris croisés</a>
          </nav>

          <h1>Bienvenue</h1>
          <p class="intro">
            Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
            proposer à un public d’étudiants et de chercheurs un manuel de diplomatique progressivement construit autour du déchiffrement
            interactif, de l’annotation, si besoin de la traduction et enfin de l’analyse diplomatique d’actes et de
            documents de gestion. Appuyée sur un outil de mise au point collaborative des dossiers, en classe ou par des chercheurs
            associés, elle est dès l’origine conçue pour dilater le champ de vision de son noyau primitif (actes médiévaux français) dans
            l’espace, le temps, le type.
          </p>
        </div>
        <div class="column documents">
          <div class="content">
            <p class="column-title">Derniers documents</p>
            <ul>
              <li>
                <a href="#">
                  <div class="document-card card">
                    <div class="card-header"></div>
                    <div class="card-image">
                      <figure class="image is-3by1">
                        <img src="https://iiif.chartes.psl.eu/images/adele/dossiers/20.jpg/full/800,/0/default.jpg" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="content">
                        <p class="title">Acte sous le sceau de l’officialité épiscopale de Beauvais</p>
                        <p class="subtitle">Une opération de remembrement&nbsp;: la vente à l’abbaye Saint-Germer-de-Fly d’une terre tenue à champart test</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <div class="document-card card">
                    <div class="card-header"></div>
                    <div class="card-image">
                      <figure class="image is-3by1">
                        <img src="https://iiif.chartes.psl.eu/images/adele/dossiers/39.jpg/full/800,/0/default.jpg" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="content">
                        <p class="title">Acte sous les sceaux de l’officialité archidiaconale de Verdun et d’un seigneur (Lorraine)</p>
                        <p class="subtitle">Un montage féodal complexe : reprises et cessions d’un fief épiscopal en cascade</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="columns">
        <div class="column"></div>
        <div class="column is-half">
          <h2><a id="projet">Le projet</a></h2>
          <p>
            Depuis plus de trois siècles, la diplomatique a accumulé les ouvrages mais, assez curieusement, semble s’être détachée des planches gravées au milieu desquelles elle est née, et a plus encore négligé les albums d’actes, si l’on excepte des entreprises largement cantonnées dans le haut Moyen Âge et au moins autant tournées vers la paléographie et la recherche de haut niveau que vers la diplomatique et la pédagogie, tels les Chartae latinae antiquiores et les Monumenta palaeographica Medii Ævi. Rares sont ceux qui se sont volontairement construits autour d’un exposé raisonné de diplomatique, implicitement dans le cas des Exempla scripturarum pour les actes pontificaux (fasc. 3, 19652), explicitement dans celui du manuel inachevé d’Alain de Boüard (1929-1948), qui a délibérément prolongé, et même enrichi, son propos dans des recueils de planches, sélectionnées avec grand bonheur. La situation, paradoxalement, ne s’est guère améliorée aux temps du numérique et surtout des hauts et très hauts débits, où le flot des images d’archives, qui s’en trouvent mieux préservées et plus facilement communiquées, reste mal domestiqué, avec des possibilités de recherche et de tri souvent réduites et un apparat quasi inexistant, même pour des réalisations aussi superbes que le site des archives de Saint-Maurice d’Agaune ou la colossale entreprise Monasterium.net, pour se limiter à deux exemples.
          </p>
          <p>
            Dans le même temps, la diplomatique s’est profondément renouvelée, elle a conquis de nouveaux territoires, elle est allée au-devant des historiens pour leur faire partager une sensibilité nouvelle aux contextes de la création et de la réception des écrits pragmatiques, aux courants complexes de l’innovation et de la circulation des rédacteurs, aux prises en main de la production par les autorités, aux jeux de la langue et du pouvoir… Elle exporte partout ses curiosités, sa méthode, son questionnaire : dans le temps, en quittant des horizons longtemps médiévaux, pour les époques modernes et contemporaines, comme pour les temps antiques (emblématiques de ce point de vue les études de Dominique Charpin, réunies dans Lire et écrire à Babylone, 2008) ; en sortant d’Europe ; en cessant de se cantonner aux actes stricto sensu, pour considérer du même œil les documents de gestion qui les prolongent dans l’exercice quotidien du pouvoir ou de la puissance (comptabilités, registres judiciaires et de délibération, enquêtes et inventaires…). Illustrée avec constance dans les pays de langue allemande comme en Belgique, elle reprend vigueur, en même temps que l’édition, en France ; elle déborde d’énergie dans la péninsule ibérique ; elle croise à nouveau les chemins de l’historien en Italie ; elle nourrit son agenda en Grande-Bretagne ; elle produit des sommes copieuses en Pologne comme en Serbie ; elle cherche à définir sa spécificité et à structurer son programme en Europe orientale comme en Éthiopie et au Japon…
            Il est assurément difficile, pour ne pas dire impossible, de maîtriser ce bouillonnement et l’on voit mal comment faire aboutir un manuel général, même collectif, qui dégage des lignes de force tout en respectant les nuances, en décapant nouveautés et traditions. Après avoir donné un précieux Vocabulaire et apporté, par une riche série de congrès, de multiples touches à l’impossible fresque (http://elec.enc.sorbonne.fr/cid/), la Commission internationale de diplomatique s’est résignée à abandonner son projet de manuel international. Le manque n’en est pas moins ressenti avec force dans le domaine de la recherche fondamentale comme dans celui de l’enseignement.
            Répondre à ces attentes, donner à voir aux uns, à apprendre aux autres, aiguiser le regard tout en proposant des exercices concrets (de lecture, de traduction, d’identification, de regeste et in fine d’analyse diplomatique), encourager le comparatisme, donner aussi sa juste place à l’examen des caractéristiques de forme dont les études de Peter Rück sur la « rhétorique visuelle » de l’acte ont montré tout le potentiel (format, mise en page, recours à l’image et au signe…) : telles sont les promesses d’un recours au genre de l’album, à condition de ne pas le limiter à la juxtaposition de clichés, assortis d’un commentaire minimal ou d’une fiche signalétique. Telle est l’ambition du projet ADELE (Album de diplomatique en ligne).
          </p>
          <p>
            Cet album est conçu comme un manuel inversé : il part des images pour arriver au discours ; et comme un manuel en petit appareil : il part « du bas » avec de menues tesselles qui s’enchâssent progressivement dans un discours plus général, chaîné par des renvois d’un dossier à un autre, modelable et paramétrable par l’utilisateur grâce aux fonctions de tri.
            Chaque item correspond à un document – original, mais aussi bien copie (volante ou en livre) ; minutes, brouillons, faux, fac-similés, imprimés… ne sont pas oubliés. Une architecture à la fois riche et souple doit rendre compte des diverses phases de l’analyse comme des différentes dimensions de l’acte : selon les besoins, les transcriptions (en deux états successifs), la traduction et le commentaire diplomatique (lui-même ouvert au contexte et à la portée historique du document) peuvent être complétés de commentaires philologiques, paléographiques, codicologiques, sigillographiques…
          </p>
          <p>
            Cette architecture a été imaginée, testée, mise au point à l’École nationale des chartes dans le cadre de l’application THELEME (Techniques pour l’historien en ligne), qui fait maintenant figure de prototype, sans indexation et où les premiers dossiers, de paléographie, conçus par Marc Smith, ont été progressivement flanqués de dossiers diplomatiques, préparés par les étudiants des cours de diplomatique médiévale puis de diplomatique moderne (dir. Olivier Guyotjeannin et Olivier Poncet ; vue d’ensemble des dossiers consultables dans http://theleme.enc.sorbonne.fr/dossiers/). Le premier de ces dossiers de diplomatique a été publié sur le site de l’École des chartes en 2001 (http://theleme.enc.sorbonne.fr/dossiers/notice20.php). Ils sont aujourd’hui au nombre de 89, étagés du IXe  au XVIIIe siècle.
            L’élargissement le plus visible prévu dans le projet ADELE est celui des frontières spatiales et temporelles, et encore typologiques, avec l’introduction de documents d’archives qui n’atteignent pas le degré de formalisation des « actes » stricto sensu. Délibéré, l’élargissement du champ spatial et du champ chronologique, potentiellement étendu à toute l’histoire de l’écriture dès lors que l’on y a fixé la « parole de Mammon », impose le recours à de nombreux spécialistes, français ou étrangers, membres d’institutions françaises et étrangères ou internationales, sur la base de contacts personnels ou institutionnels, en tout premier lieu la Commission internationale de diplomatique.
            Il implique aussi l’introduction de langues européennes de diffusion internationale pour la rédaction des dossiers : anglais, allemand, espagnol (castillan), portugais, italien viendront se joindre au français, qu’il est pour l’heure prévu d’employer seul pour la présentation des métadonnées.
            Le recours aux outils numériques est indispensable sous plusieurs aspects : pour gérer la constitution progressive du « recueil » ; pour aider à rebattre les cartes à volonté ; pour appuyer avec des instruments solides d’indexation et de tri la constitution de sous-corpus à la demande ; enfin, mais les premières explorations montrent la difficulté de l’entreprise, pour explorer les possibilités de recherche automatisée ou semi-automatisée d’une documentation complémentaire (bibliographie, éditions, clichés…) disponible ailleurs sur le web…
          </p>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: "LandingPage",
    components: {
    },
    computed: {
    },
    created() {
     
    },
    methods: {
     
    }
}
</script>

<style>

</style>