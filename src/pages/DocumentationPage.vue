<template>
  <div class="container documentation-page">
    <div class="top">
      <div class="columns">
        <div class="column is-3 themes">
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
                        id="speech-parts"
                        @click="goTo('speech-parts')"
                      >
                        Parties du discours
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
                        id="commentaries"
                        @click="goTo('commentaries')"
                      >
                        Types de commentaires
                      </li>
                      <li
                        id="acte-types"
                        @click="goTo('acte-types')"
                      >
                        Types d'acte
                      </li>
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
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
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
            <p>Introduction explicative sur le distinguo type d’auteurs / type de documents</p>
            <h2>A – Actes, auteurs</h2>
            <p>TODO : Introduction</p>
            <p>Les types précis (lettre patente sur double queue, terrier…) sont précisés en titre. Les termes et le découpage sont modelés au plus près possible sur ceux de la base Bède.</p>
            <dl>
              <dt>Pape et entourage</dt>
              <dd>
                [Définition AG]<br>
                Inclut : Cardinaux, Légats, Conciles
              </dd>

              <dt>Évêque et entourage</dt>
              <dd>
                [Définition AG]<br>
                Inclut : Archevêques, Chapitre cathédral et ses dignitaires, synodes diocésains et provinciaux, vicaire, official, archidiacres, doyens de chrétienté, curés (hors juridiction gracieuse)
              </dd>

              <dt>Religieux</dt>
              <dd>
                [Définition AG]<br>
                Dignitaires et membres de maisons religieuses et d’ordres
              </dd>

              <dt>Souverain</dt>
              <dd>[Définition AG] – faut-il vraiment maintenir ici la liste des pays ?</dd>

              <dt>Du prince au baron</dt>
              <dd>[Définition AG]</dd>

              <dt>Administration séculière centrale et locale</dt>
              <dd>[Définition AG]</dd>

              <dt>Seigneurs et particuliers</dt>
              <dd>[Définition AG]</dd>

              <dt>Municipalité, communauté</dt>
              <dd>
                [Définition AG]<br>
                Inclut : juridiction gracieuse (écrits d’arche, etc.)
              </dd>

              <dt>Actes privés, Système traditionnels</dt>
              <dd>
                [Définition AG]<br>
                Vise les actes du haut Moyen Âge, toutes solutions confondues : notariat vieux style, chartes et notices du notaire villageois comme du notaire-juge, notice monastique…
              </dd>

              <dt>Notaire public</dt>
              <dd>[Définition AG]</dd>

              <dt>Juridiction gracieuse ecclésiastique</dt>
              <dd>[Définition AG]</dd>

              <dt>Juridiction gracieuse laïque</dt>
              <dd>
                [Définition AG]<br>
                Exclut municipalité
              </dd>
            </dl>

            <h2>B – Documents de gestion, type</h2>
            <p>Introduction</p>

            <dl>
              <dt>Documents de gestion domaniale</dt>
              <dd>[Définition AG]</dd>

              <dt>Inventaires de biens</dt>
              <dd>
                [Définition AG]<br>
                Biens fonciers et mobiliers, trésors, archives, bibliothèques
              </dd>

              <dt>Documents féodaux</dt>
              <dd>[Définition AG]</dd>

              <dt>Documents comptables, financiers et fiscaux</dt>
              <dd>[Définition AG]</dd>

              <dt>Documents propres à la production et aux échanges</dt>
              <dd>
                [Définition AG]<br>
                [ex. journal de péage, statut de métier]<br>
                Ces documents sont dits « propres » pour bien marquer qu’ils ne sont pas « relatifs » à un domaine d’activité, mais que leur production est intrinsèquement liée à celui-ci. On en donne quelques exemples entre crochets droits. Inclut : Banque, monnaie, agriculture, pêche…
              </dd>

              <dt>Documents militaires</dt>
              <dd>
                [Définition AG]<br>
                [ex. montre]
              </dd>

              <dt>Documents propres à la diplomatie et aux relations extérieures</dt>
              <dd>
                [Définition AG]<br>
                [ex. lettres de créance, passeport, instructions]
              </dd>

              <dt>Documents judiciaires</dt>
              <dd>
                [Définition AG]<br>
                [ex. registre d’inquisition, registre d’amendes]
              </dd>

              <dt>Documents propres à l’enseignement</dt>
              <dd>
                [Définition AG]<br>
                [ex. livre de recteur]
              </dd>

              <dt>Documents propres à l’assistance</dt>
              <dd>
                [Définition AG]<br>
                [ex. matricule des pauvres]
              </dd>

              <dt>Documents propres aux archives ecclésiastiques</dt>
              <dd>
                [Définition AG]<br>
                [ex. visite pastorale, obituaire, registre BMS…]
              </dd>

              <dt>Documents propres aux archives royales et princières</dt>
              <dd>
                [Définition AG]<br>
                [ex. enquête administrative]
              </dd>

              <dt>Documents propres aux archives municipales</dt>
              <dd>
                [Définition AG]<br>
                [ex. livre de bourgeoisie]
              </dd>

              <dt>Documents propres aux archives seigneuriales et de particuliers</dt>
              <dd>
                [Définition AG]<br>
                [ex. livre de raison]
              </dd>
            </dl>
          </div>
          <div
            v-if="$attrs.section === 'speech-parts'"
          >
            <h1>Parties du discours</h1>
            <p>
              TODO – Introduction ; NB: le vocabulaire ne servira que ponctuellement pour les documents de gestion.
            </p>
            <dl>
              <dt>Invocation</dt>
              <dd>
                L’invocation est une formule plaçant l’acte sous le patronage d’une personne divine.<br>
                VID n° 185 : <a href="https://www.cei.lmu.de/VID/#185">https://www.cei.lmu.de/VID/#185</a><br>
                L’invocation peut être :
                <ul>
                  <li>Figurée</li>
                  <li>Verbale</li>
                  <li>En forme de chrisme : <a href="https://www.cei.lmu.de/VID/#147">https://www.cei.lmu.de/VID/#147</a></li>
                </ul>
              </dd>

              <dt>Suscription</dt>
              <dd>
                La suscription (lat : <i>persona salutans</i>, <i>intitulatio</i>, <i>superscriptio</i>) décline l’identité de l’auteur de l’acte. Elle contient le nom personnel de l’auteur, souvent ses titres et/ou qualités, parfois son pronom personnel.<br>
                VID, n° 187 : <a href="https://www.cei.lmu.de/VID/#187">https://www.cei.lmu.de/VID/#187</a><br>
                La suscription peut être complétée :
                <ul>
                  <li>d’une formule de dévotion : <a href="https://www.cei.lmu.de/VID/#190">https://www.cei.lmu.de/VID/#190</a></li>
                  <li>d’une formule d’humilité : <a href="https://www.cei.lmu.de/VID/#191">https://www.cei.lmu.de/VID/#191</a></li>
                </ul>
              </dd>

              <dt>Adresse</dt>
              <dd>
                L’adresse (lat. : <i>inscriptio</i>, <i>superscriptio</i>, <i>inscription</i>) décline l’identité du destinataire (et non forcément le bénéficiaire) de l’acte ou de la lettre.<br>
                VID, n° 192: <a href="https://www.cei.lmu.de/VID/#192">https://www.cei.lmu.de/VID/#192</a><br>
                L’adresse peut être :
                <ul>
                  <li>Universelle : <a href="https://www.cei.lmu.de/VID/#193a">https://www.cei.lmu.de/VID/#193a</a></li>
                  <li>Collective : <a href="https://www.cei.lmu.de/VID/#193b">https://www.cei.lmu.de/VID/#193b</a></li>
                  <li>Personnelle : <a href="https://www.cei.lmu.de/VID/#193c">https://www.cei.lmu.de/VID/#193c</a></li>
                </ul>
              </dd>

              <dt>Salut</dt>
              <dd>
                L’auteur de l’acte y exprime au destinataire son salut (lat. : <i>salutatio</i>, <i>modus salutandi</i>). Celui-ci est de règle quand il y a une adresse.<br>
                VID, n° 194: <a href="https://www.cei.lmu.de/VID/#194">https://www.cei.lmu.de/VID/#194</a><br>
                Le salut peut être complété :
                <ul>
                  <li>d’une formule de souhait</li>
                </ul>
              </dd>

              <dt>Formule de perpétuité</dt>
              <dd>
                La formule de perpétuité peut venir remplacer le salut. Elle déclare que les droits créés par le document ne sont pas circonscrits dans le temps.<br>
                VID n° 195: <a href="https://www.cei.lmu.de/VID/#195">https://www.cei.lmu.de/VID/#195</a>
              </dd>

              <dt>Préambule</dt>
              <dd>
                Le préambule (lat. : <i>exordium</i>, <i>arenga</i>, <i>proemium</i>) est l’ensemble de considérations générales, à valeur universelle, détachées du contexte particulier, qui motivent et légitiment l’acte.<br>
                VID n° 196bis : <a href="https://www.cei.lmu.de/VID/#196bis">https://www.cei.lmu.de/VID/#196bis</a><br>
                Il peut s’agir :
                <ul>
                  <li>d’un préambule court</li>
                </ul>
              </dd>

              <dt>Notification</dt>
              <dd>
                La notification (lat. : <i>notificatio</i>, <i>publicatio</i>, <i>promulgatio</i>) est une formule-outil qui déclare la volonté de porter à la connaissance des lecteurs ou auditeurs de l’acte.<br>
                VID n° 196: <a href="https://www.cei.lmu.de/VID/#196">https://www.cei.lmu.de/VID/#196</a>
                La notification peut-être :
                <ul>
                  <li>Universelle</li>
                  <li>Collective</li>
                  <li>Personnelle</li>
                </ul>
              </dd>

              <dt>Exposé</dt>
              <dd>
                Il s’agit de l’exposé (lat. : <i>narratio</i>) logico-chronologique des circonstances qui ont amené la prise de décision.<br>
                VID n° 197: <a href="https://www.cei.lmu.de/VID/#197">https://www.cei.lmu.de/VID/#197</a>
              </dd>

              <dt>Dispositif</dt>
              <dd>
                Au sens étroit, le dispositif (lat. : <i>dispositio</i>) énonce la volonté de l’auteur de l’action et qualifie sa nature juridique (<i>donamus</i> > donation). Au sens large, il décrit l’action juridique, dans la forme d’un exposé, quand l’acte est en forme de procès-verbal (pour un acte notarié, de juridiction gracieuse…).<br>
                VID n° 198: <a href="https://www.cei.lmu.de/VID/#198">https://www.cei.lmu.de/VID/#198</a><br>
                Diverses formules viennent préciser le dispositif :
                <ul>
                  <li>
                    Clauses additionnelles : <a href="https://www.cei.lmu.de/VID/#207">https://www.cei.lmu.de/VID/#207</a>
                    <ul>
                      <li>Description de la cérémonie de tradition : <a href="https://www.cei.lmu.de/VID/#248">https://www.cei.lmu.de/VID/#248</a></li>
                      <li>Formule de spontanéité [<i>motu proprio</i>, <i>spontanea voluntate</i>…] : <a href="https://www.cei.lmu.de/VID/#201">https://www.cei.lmu.de/VID/#201</a></li>
                      <li>Formule de motivation [<i>pro remedio anime</i>…] : <a href="https://www.cei.lmu.de/VID/#202">https://www.cei.lmu.de/VID/#202</a></li>
                      <li>Clause de demande de prières : <a href="https://www.cei.lmu.de/VID/#212">https://www.cei.lmu.de/VID/#212</a></li>
                      <li>Formule explicative [<i>ut nunc habeatis</i>, <i>teneatis</i>…] : <a href="https://www.cei.lmu.de/VID/#203">https://www.cei.lmu.de/VID/#203</a></li>
                      <li>Formule de pertinence : <a href="https://www.cei.lmu.de/VID/#204">https://www.cei.lmu.de/VID/#204</a></li>
                      <li>Formule d’amortissement</li>
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

              <dt>Sanctio</dt>
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

              <dt>Mentions de formalités</dt>
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

              <dt>Validations finales</dt>
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

              <dt>Date</dt>
              <dd>
                VID n° 561: <a href="https://www.cei.lmu.de/VID/#561">https://www.cei.lmu.de/VID/#561</a><br>
                Peut se distinguer en :
                <ul>
                  <li>Date de lieu : <a href="https://www.cei.lmu.de/VID/#563">https://www.cei.lmu.de/VID/#563</a></li>
                  <li>Date de temps : <a href="https://www.cei.lmu.de/VID/#562">https://www.cei.lmu.de/VID/#562</a></li>
                  <li>Ménologe</li>
                </ul>
              </dd>

              <dt>Mentions hors teneurs</dt>
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
              Il s’agit du pays contemporain, voire de la région contemporaine qui abrite le(s) lieu(x) concerné(s) par
              le document, plutôt que par l’origine de l’auteur. Pour la France, on a gardé les régions…, les « grandes
              régions » donnant des localisations par trop grossières (p.ex. Auvergne-Rhône) et des appellations parfois
              opaques pour le lecteur étranger (p.ex. Hauts-de-France).
            </p>
          </div>
          <div
            v-if="$attrs.section === 'persons'"
          >
            <h1>Personnes identifiées</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
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
