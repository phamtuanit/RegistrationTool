export default {
    templateFile: "registration.html",
    components: {},
    data() {
        return {
            commonInfo: {
                message: "",
                supplier: ""
            },
            userComment: "",
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
        this.commonInfo.message = window.Application.Config.userConfig.message;
        this.commonInfo.supplier = window.Application.Config.userConfig.supplier;

        const user = JSON.parse(window.localStorage.getItem('user'));
        const that = this;
        // Load last submition data
        axios.get('/api/registration', {
                method: 'GET',
                mode: 'no-cors',
            })
            .then(function(response) {
                const repData = response.data;
                console.log("Data:", repData);
                if (repData.length) {
                    repData.forEach(item => {
                        if (user.email == item.user.email) {
                            that.submittedData = item;
                            return;
                        }
                    });
                }
            })
            .catch(function(error) {
                // handle error
                console.error("Got an error when loading user.", error);
            })

        // Load reference data
        axios.get('/api/reference', {
                method: 'GET',
                mode: 'no-cors',
            })
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
            const user = JSON.parse(window.localStorage.getItem('user'));
            if (this.lastSelectedItem != undefined && this.lastSelectedItem.id >= 0) {
                const submittedData = {};
                submittedData["id"] = user.id;
                submittedData["user"] = user;
                submittedData["data"] = JSON.parse(JSON.stringify(this.lastSelectedItem));
                submittedData.data["comment"] = this.userComment;

                // Submit to server
                var that = this;
                const url = '/api/registration/' + submittedData.id;
                axios.post(url, submittedData)
                    .then(function(response) {
                        console.log("Response:", response);
                        that.submittedData = submittedData;
                    })
                    .catch(function(error) {
                        // handle error
                        console.error("Got an error when submitting data.", error);
                    })
            }
        },
        removeSubmitted: function() {
            if (this.submittedData && this.submittedData.id) {
                // Submit to server
                var that = this;
                const url = '/api/registration/' + this.submittedData.id;
                axios.delete(url)
                    .then(function(response) {
                        console.log("Response:", response);
                        that.submittedData.data = {};
                    })
                    .catch(function(error) {
                        // handle error
                        console.error("Got an error when submitting data.", error);
                    })

            }
        }
    },
};