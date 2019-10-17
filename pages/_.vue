<template>
  <div class="container">
    <h1 class="title">Document {{ documentName }}</h1>
    <div class="editor"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '# Oi'
    }
  },
  computed: {
    documentName() {
      const path = this.$route.fullPath
      const lastChar = path[path.length - 1]
      if (lastChar === '/') {
        return path.substring(1, path.length - 1)
      }
      return this.$route.fullPath.substring(1)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.1fr 1fr;
  justify-items: center;
  align-items: center;
}
.title {
  grid-column: 1 / 3;
}
.editor {
  grid-column: 1 / 3;
}
</style>
