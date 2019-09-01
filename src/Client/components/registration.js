export default {
    templateFile: "registration.html",
    components: {},
    data() {
        return {
            commoninfo: {
                message: "",
                supplier: ""
            },
            usercomment: "",
            refDrinkGroups: {},
            lastSelectedItem: { name: "Please select anything" },
            submittedData: {
                user: {},
                data: {}
            },
            drinks: []
        };
    },
    created() {
        console.info("Registration component is initialized");
    },
    mounted() {
        const that = this;
        axios.get('/reference')
            .then(function(response) {
                const repData = response.data;
                console.log("Data:", repData);
                that.commoninfo = {
                    message: repData.message,
                    supplier: repData.supplier
                };

                that.refDrinkGroups = repData.drinkgroups;
                that.drinks = repData.drinkgroups[0].drinks;
            })
            .catch(function(error) {
                // handle error
                console.error("Got an error when loading data.", error);
            })
    },
    methods: {
        selectItem: function(index) {
            if (index && index < 0) {
                this.lastSelectedItem = undefined;
                return;
            }
            this.lastSelectedItem = this.drinks[index];
        },
        submit: function() {
            if (this.lastSelectedItem != undefined && this.lastSelectedItem.id >= 0) {

                // Submit to server

                this.submittedData.user = window.localStorage.getItem('user');
                this.submittedData.data = JSON.parse(JSON.stringify(this.lastSelectedItem));
                this.submittedData.data.comment = this.usercomment;
            }
        },
        removeSubmitted: function() {
            if (this.submittedData.data.id != undefined && this.lastSelectedItem.id >= 0) {
                // Submit to server
                this.submittedData.data = {};
            }
        }
    },
};