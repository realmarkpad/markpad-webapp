<template>
  <div class="container">
    <sidebar-menu :menu="menu" :collapsed="true" :rtl="true">
      <span slot="toggle-icon">
        <i class="fa fa-arrows-h"></i>
      </span>
    </sidebar-menu>
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
import { SidebarMenu } from "vue-sidebar-menu";
import { documentApi } from "../services";
import moment from "moment";

export default {
  nome: "document",
  data() {
    return {
      content: "",
      lastUpdated: null,
      child: [],
      config: {},
      setIntervalId: null,
      lastEditionToContent: null,
      menu: [
        {
          header: true,
          title: "Documentos",
          hiddenOnCollapse: true
        }
      ]
    };
  },
  async created() {
    const path = this.cleanPath(this.$route.fullPath);
    await this.loadDocument(path);

    this.setIntervalId = setInterval(this.checkBack, 5000);
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
        this.lastUpdated = moment.utc(res.data.last_updated);
        this.lastEditionToContent = moment.utc(res.data.last_updated);
      } catch (e) {
        const res = e.response;
        if (res.status === 404) {
          const res = await documentApi.create({ path: name });
          this.content = "";
          this.child = [];
          this.lastUpdated = moment.utc(res.data.created_at);
          this.lastEditionToContent = moment.utc(res.data.created_at);
        }
      }
    },
    cleanPath(path) {
      const lastChar = path[path.length - 1];
      if (lastChar === "/") {
        return path.substring(1, path.length - 1);
      }
      return this.$route.fullPath.substring(1);
    },
    async checkBack() {
      const documentPath = this.cleanPath(this.$route.fullPath);
      const res = await documentApi.get_last_updated(documentPath);
      const lastUpdatedServer = moment.utc(res.data.last_updated);
      if (this.lastUpdated.isSame(lastUpdatedServer)) {
        if (this.lastEditionToContent.isAfter(lastUpdatedServer)) {
          const res = await documentApi.update({
            path: documentPath,
            content: this.content
          });
          this.lastUpdated = moment.utc(res.data.last_updated);
        }
      } else {
        await this.loadDocument(documentPath);
      }
    }
  },
  watch: {
    $route: async function(to) {
      clearInterval(this.setIntervalId);
      const path = this.cleanPath(to.path);
      await this.loadDocument(path);
      this.setIntervalId = setInterval(this.checkBack, 5000);
    },
    content: function() {
      this.lastEditionToContent = moment.utc();
    },
    child: function(to) {
      const path = this.cleanPath(this.$route.fullPath);
      const childItems = to.map(child => {
        return {
          href: { path: `/${path}/${child}` },
          title: child,
          icon: "fa fa-file"
        };
      });
      this.menu = [
        {
          header: true,
          title: "Documentos",
          hiddenOnCollapse: true
        },
        ...childItems
      ];
    }
  },
  components: { VueSimplemde, SidebarMenu }
};
</script>

<style lang="scss">
@import "~vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";
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
