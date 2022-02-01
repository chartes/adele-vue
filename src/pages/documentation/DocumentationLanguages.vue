<template>
  <article>
    <header>
      <h1>Langues</h1>
      <p>
        La liste ne distingue pas les états successifs d’un même ensemble de langues (ex. anglo-saxon, moyen-anglais) ; des
        réponses plus précises peuvent être obtenues en combinant date et langue. Par simplification,
        les différentes langues germaniques sont appelées « allemand », dénomination qui regroupe bas-allemand
        et haut-allemand. Le corse est rangé avec l’italien, le gascon et le franco-provençal avec l’occitan
        (« occitan et marges » – mais le catalan est rangé à part). Le « celtique » rassemble tous les celtiques
        insulaires (irlandais, écossais, gallois etc., et breton).
      </p>

      <section>
        <table class="table is-striped is-narrow">
          <thead>
            <tr>
              <th>Langue</th>
              <th>
                <a
                  target="_blank"
                  href="https://iso639-3.sil.org/about"
                >Code ISO-639</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr> <td>Allemand</td><td>deu</td></tr>
            <tr> <td>Anglais</td><td>eng</td></tr>
            <tr> <td>Arabe</td><td>ara</td></tr>
            <tr> <td>Basque</td><td>eus</td></tr>
            <tr> <td>Castillan</td><td>spa</td></tr>
            <tr> <td>Catalan</td><td>cat</td></tr>
            <tr> <td>Celtique</td><td>cel</td></tr>
            <tr> <td>Français</td><td>fre</td></tr>
            <tr> <td>Grec</td><td>gre</td></tr>
            <tr> <td>Hébreu</td><td>heb</td></tr>
            <tr> <td>Italien</td><td>ita</td></tr>
            <tr> <td>Latin</td><td>lat</td></tr>
            <tr> <td>Néerlandais</td><td>nld</td></tr>
            <tr> <td>Occitan et marges</td><td>oci</td></tr>
            <tr> <td>Polonais</td><td>pol</td></tr>
            <tr> <td>Portugais</td><td>por</td></tr>
            <tr> <td>Roumain</td><td>rum</td></tr>
            <tr> <td>Ruthène</td><td>rue</td></tr>
            <tr> <td>Sarde</td><td>srd</td></tr>
            <tr> <td>Scandinave</td><td> -</td></tr>
            <tr> <td>Serbe</td><td>srp</td></tr>
            <tr> <td>Tchèque</td><td>ces</td></tr>
            <tr> <td>Turc</td><td>tur</td></tr>
          </tbody>
        </table>
      </section>
    </header>
  </article>
</template>

<script>
export default {
    name: 'DocumentationLanguages'
}
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 50px;
}
</style>