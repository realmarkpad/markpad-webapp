<template>
    <div class="container">
      <vue-simplemde
        v-model="content"
        ref="markdownEditor"
        :highlight="true"
        preview-class="markdown-body"
        :previewRender="false"
        :configs="config"
      />
    </div>
</template>

<script>
import VueSimplemde from "vue-simplemde";

export default {
  nome: "document",
  data() {
    return {
      content: "# OI",
      config: {
        toolbar: [
          "bold", "italic", "heading", "|", 
          "quote", "unordered-list", "ordered-list", "|",
          "link", "image", "|",
          "guide"
        ]
      }
    };
  },
  mounted() {
    this.simpleMDE.toggleFullScreen();
    this.simpleMDE.toggleSideBySide();
  },
  computed: {
    documentName() {
      const path = this.$route.fullPath;
      const lastChar = path[path.length - 1];
      if (lastChar === "/") {
        return path.substring(1, path.length - 1);
      }
      return this.$route.fullPath.substring(1);
    },
    simpleMDE() {
      return this.$refs.markdownEditor.simplemde;
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
  display: block;
  justify-items: center;
  align-items: center;
}
</style>
