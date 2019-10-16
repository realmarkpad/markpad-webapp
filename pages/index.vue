<template>
  <div class="container">
    <div class="search">
      <h1 class="title">Markpad</h1>
      <input
        v-model="document"
        type="text"
        placeholder="Access your document"
      />
      <button @click="goToDocument">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      document: ''
    }
  },
  methods: {
    goToDocument() {
      console.log(`Go to document ${this.document}`)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
}
.search {
  grid-row: 2/2;
  grid-column: 2/2;
}
.title {
  text-align: center;
  margin: 30px 10px;
}
</style>
