<template>
  <div class="logos ">
    <a href="http://www.chartes.psl.eu/"><img
      src="../assets/images/enc.png"
      alt="logo enc"
    ></a>
    <a href="https://www.unicaen.fr/scripta/"><img
      src="../assets/images/scripta.png"
      alt="logo scripta"
    ></a>
    <a href="https://www.dim-humanites-numeriques.fr/"><img
      src="../assets/images/dim-stcn.jpg"
      alt="logo DIM stcn"
    ></a>
    <a href="https://www.dim-humanites-numeriques.fr/"><img
      src="../assets/images/cid.jpg"
      alt="logo commission internationale de diplomatique"
    ><span id="cid">Commission internationale de diplomatique</span></a>
  </div>
</template>

<script>
export default {
  name: "Logos",
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
  .logos {
    display: inline-flex;
    width: 100%;
    padding-left: 50px;
    padding-right: 50px;
    align-items: center;
    justify-content: center;
  }
  #cid {
    width: 200px;
    margin-left: 20px;
    padding-top: 15px;
    color: black;
  }
  a {
    flex: auto;
    display: flex;
  }
  img {
    max-height: 75px;
  }
</style>