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
      content: "",
      config: {}
    };
  },
  mounted() {
    this.simpleMDE.toggleFullScreen();
    this.simpleMDE.toggleSideBySide();

    // Remove fullscreen button
    const removeElements = elms => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".fa.fa-arrows-alt"));
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
