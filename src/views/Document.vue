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
import { documentApi } from "../services";

export default {
  nome: "document",
  data() {
    return {
      content: "",
      last_edited: new Date(),
      child: [],
      config: {}
    };
  },
  async created() {
    const path = this.cleanPath(this.$route.fullPath);
    await this.loadDocument(path);

    setInterval(async () => {
      const documentPath = this.cleanPath(this.$route.fullPath);
      await documentApi.update({
        path: documentPath,
        content: this.content
      })
    },1000);
  },
  mounted() {
    this.simpleMDE.toggleFullScreen();
    this.simpleMDE.toggleSideBySide();

    // Remove fullscreen button
    const removeElements = elms => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".fa.fa-arrows-alt"));
  },
  computed: {
    simpleMDE() {
      return this.$refs.markdownEditor.simplemde;
    }
  },
  methods: {
    async loadDocument(name) {
      try {
        const res = await documentApi.get(name);
        this.content = res.data.content;
        this.child = res.data.child;
      } catch (e) {
        const res = e.response;
        if (res.status === 404) {
          await documentApi.create({ path: name });
          this.content = "";
          this.child = [];
        }
      }
    },
    cleanPath(path) {
      const lastChar = path[path.length - 1];
      if (lastChar === "/") {
        return path.substring(1, path.length - 1);
      }
      return this.$route.fullPath.substring(1);
    }
  },
  watch: {
    $route: async function(to) {
      const path = this.cleanPath(to.path);
      await this.loadDocument(path);
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
