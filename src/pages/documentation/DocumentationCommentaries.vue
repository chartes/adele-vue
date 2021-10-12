<template>
  <article>
    <header><h1>Types de commentaires fournis</h1></header>
    <p>
      Par essence, le commentaire fourni dans chaque dossier est un
      commentaire diplomatique, normalement assorti de remarques portant
      sur l’écriture et la mise en page, la langue, le(s) sceau(x), le
      contexte historique, les traits juridiques. Des plus rapides pour
      l’heure, ces commentaires sont appelés, au coup par coup, à
      s’étoffer, sinon à s’autonomiser. Les différents modules
      correspondants seront dans ce cas signalés à ce niveau.
    </p>

    <div class="toc">
      <h2>Liste des types de commentaire</h2>
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
          Le commentaire diplomatique est le principal commentaire à
          fournir. Il contient notamment des éléments relatifs aux
          caractères externes, aux dimensions du manuscrit, à son
          écriture. Ce commentaire permet de replacer le document parmi
          les autres documents de la même typologie. Ainsi, s'il s'agit
          un mandement royal, on pourra le comparer aux autres
          mandements de la même époque, dans les formules utilisés, dans
          ses dimensions et son écriture. Ce commentaire peut également
          servir de commentaire général sur le manuscrit, en l'absence
          d'éléments suffisant pour créer un autre commentaire.
        </p>
        <p>
          Pour les dossiers présentés et provenant de l'ancienne base «
          Theleme », il est souvent indiqué un unique commentaire
          diplomatique. Celui-ci peut être composé d'une étude des
          caractères externes, d'une étude de la langue et du style, et
          parfois d'une interprétation, faisant la synthèse de ces
          éléments pour en tirer une conclusion générale.
        </p>
      </dd>
      <dt id="co-historique">
        Commentaire historique
      </dt>
      <dd>
        <p>
          Le commentaire historique explique le contexte de rédaction de
          l'acte. Il peut permettre ou non de faire une critique de
          l'exposé indiqué en début d'acte, et motivant la décision qui
          a été prise. <br>
          Il peut faire le rappel des précédents actes relatifs au même
          sujet.<br>
          Egalement, il peut faire un rappel de l'historique de document
          de la même typologie, si cela est pertinent. <br>
          Par exemple, un document tel qu'un censier peut faire l'objet
          d'un commentaire historique, en l'étudiant par rapport aux
          autres censiers plus anciens de la même province.
        </p>
      </dd>
      <dt id="co-juridique">
        Commentaire juridique
      </dt>
      <dd>
        <p>
          Le commentaire juridique s'appuie sur les caractères externes
          qui se trouvent en le document. Par exemple, l'étude peut
          porter sur les éléments de validation de l'acte, qui donnent
          la force juridique au document. Aussi, le commentaire
          juridique peut s'appuyer sur le contenu textuel du document en
          question.
        </p>
      </dd>
      <dt id="co-philolo">
        Commentaire philologique
      </dt>
      <dd>
        <p>
          Le commentaire philologique étudie la langue et les
          expressions utilisées. Celui-ci peut reprendre et étudier de
          façon plus précise certains passages du contenu textuel du
          document, en faisant par exemple le repérage d'éléments
          d'accentuation, parmi les termes utilisés, le rythme du texte
          (en repérant par exemple le <i>cursus velox</i>).
        </p>
      </dd>
      <dt id="co-paleo">
        Commentaire paléographique
      </dt>
      <dd>
        <p>
          Ce commentaire s'appuie essentiellement sur l'écriture du
          document. On peut y décrire les longueur des hastes et des
          hampes, des caractères se distinguant plus nettement du corps
          du texte. Aussi on pourra également y commenter les
          abréviations et les signes de ponctuation utilisés ou non dans
          le texte. Les formes et les lettres qui sont abrégés pourront
          être décrites, pour montrer une certaine singularité ou au
          contraire, une homogénéité des caractères.
        </p>
      </dd>
      <dt id="co-sigillo">
        Commentaire sigillographique
      </dt>
      <dd>
        <p>
          Le commentaire sigillographique porte sur l'étude du sceau. Il
          est autant intéressant d'étudier l'iconographie, les éléments
          représentés dans le sceau (le vêtement, l'armement, la
          symbolique), la couleur et la matière du sceau. Aussi, le
          sceau peut contenir des éléments textuels, pouvant reprendre
          la suscription en début d'acte.
        </p>
        <p>
          Autre élément pouvant être décrit dans ce commentaire : la
          façon dont est scellé l'acte. Il peut parfois être fait sur
          simple queue, sur double queue, et peuvent être représentatifs
          ou non d'un type d'acte. La base de données
          <a href="www.sigilla.org">Sigilla</a> peut être riche en
          informations sur les sceaux, et donne des éléments utiles à
          leur description.
        </p>
      </dd>
    </dl>
  </article>
</template>

<script>
export default {
    name: 'DocumentationCommentaries'
}
</script>