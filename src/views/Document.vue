<template>
  <div class="container">
    <div class="editor">
      <vue-simplemde
        v-model="content"
        ref="markdownEditor"
        :highlight="true"
        preview-class="markdown-body"
        :previewRender="false"
      />
    </div>
  </div>
</template>

<script>
import VueSimplemde from "vue-simplemde";

export default {
  nome: "document",
  data() {
    return {
      content: "# OI"
    };
  },
  computed: {
    documentName() {
      const path = this.$route.fullPath;
      const lastChar = path[path.length - 1];
      if (lastChar === "/") {
        return path.substring(1, path.length - 1);
      }
      return this.$route.fullPath.substring(1);
    }
  },
  components: { VueSimplemde }
};
</script>

<style scoped lang="scss">
@import "~simplemde/dist/simplemde.min.css";
@import "~highlight.js/styles/atom-one-dark.css";
@import "~github-markdown-css";

.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.1fr 1fr;
  justify-items: center;
  align-items: center;

  .title {
    grid-column: 1 / 3;
  }
  .editor {
    grid-column: 1 / 3;
  }
}
.markdown-editor .CodeMirror {
  height: 100vh;
}
</style>
