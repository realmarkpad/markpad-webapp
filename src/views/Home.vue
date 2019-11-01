<template>
  <div class="container">
    <div class="search">
      <img class="logo" src="../assets/logo.jpg" />
      <div class="input">
        <input
          class="search-input"
          v-model="document"
          type="text"
          placeholder="Access your document"
          @keydown.enter="goToDocument"
        />
        <a class="search-button" @click="goToDocument">
          <img
            class="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          />
        </a>
      </div>
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
  grid-template-columns: 0.2fr 1fr 0.2fr;
  grid-template-rows: 0.2fr 1fr 0.2fr;

  .search {
    grid-row: 2/3;
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo {
      margin: 0 auto;
      width: 820px;
      height: 312px;
    }
    .input {
      margin: 0 auto;
      display: inline;

      .search-input {
        margin: 0 auto;
        width: 100%;
        height: 45px;
        padding: 0 20px;
        font-size: 1rem;
        border: 1px solid #d0cfce;
        outline: none;

        &:focus {
          border: 1px solid #008abf;
          transition: 0.35s ease;
          color: #008abf;

          &::-webkit-input-placeholder {
            transition: opacity 0.45s ease;
            opacity: 0;
          }
          &::-moz-placeholder {
            transition: opacity 0.45s ease;
            opacity: 0;
          }
          &:-ms-placeholder {
            transition: opacity 0.45s ease;
            opacity: 0;
          }
        }
      }
      .search-icon {
        position: relative;
        float: right;
        width: 75px;
        height: 75px;
        top: -62px;
        right: -45px;
      }
    }
  }
}
</style>
