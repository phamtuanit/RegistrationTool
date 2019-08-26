export default {
    templateFile: "survey.html",
    components: {
    },
    data() {
      return {
        cartItemCount: 0
      };
    },
    created() {
      console.info("Survey component is initialized");
    },
    mounted() {
      const that = this;
    //   this.store.fetch(function (store) {
    //     console.info(that.products);
    //   });
    },
    methods: {
      
    },
  };
