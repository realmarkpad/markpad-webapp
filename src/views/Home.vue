<template>
  <div class="container">
    <div class="search">
      <h1 class="title">Markpad</h1>
      <input
        v-model="document"
        type="text"
        placeholder="Access your document"
        @keydown.enter="goToDocument"
      />
      <button @click="goToDocument">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      document: ""
    };
  },
  methods: {
    goToDocument() {
      const path = this.document;
      const lastChar = path[path.length - 1];
      const firstChar = path[0];
      if (lastChar === "/") {
        this.document = path.substring(0, path.length - 1);
      }
      if (firstChar === "/") {
        this.document = path.substring(1);
      }
      this.$router.push(`/${this.document}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  .search {
    grid-row: 2/2;
    grid-column: 2/2;

    .title {
      text-align: center;
      margin: 30px 10px;
    }
  }
}
</style>
