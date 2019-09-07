export default {
    templateFile: "assignment.html",
    components: {},
    data() {
        return {
            homeUrl: window.location.href,
            isLoggedIn: false,
            user: { email: "" }
        };
    },
    created() {
        console.info("Assignment component is initialized");

        const lastSlash = window.location.href.lastIndexOf('/');
        if (lastSlash > window.location.origin.length) {
            this.homeUrl = homeUrl.slice(0, lastSlash);
        }
    },
    mounted() {
        const userStr = window.localStorage.getItem('user');
        if (userStr) {
            this.user = JSON.parse(userStr);
            console.info("The user has logged in already.");
            this.signin();
        }
    },
    methods: {
        getUserId: function() {
            const now = new Date();
            var id = now.getMonth() * 1000000 + now.getDay() * 100000 + now.getHours() * 1000;
            return id + now.getMinutes() * 100 + now.getMilliseconds();
        },
        signin: function() {
            if (this.user.email) {
                this.isLoggedIn = true;
                this.user["lastAccessTime"] = (new Date()).toTimeString();

                if (!this.user.id) {
                    this.user["id"] = this.getUserId();
                }
                window.localStorage.setItem('user', JSON.stringify(this.user));
                this.$emit('logged', this.user);

                // Trying to update user Id
                var that = this;
                axios.get('/api/registration', {
                        method: 'GET',
                        mode: 'no-cors',
                    })
                    .then(function(response) {
                        const repData = response.data;
                        console.log("Data:", repData);
                        if (repData.length) {
                            repData.forEach(item => {
                                if (that.user.email == item.user.email) {
                                    that.user.id = item.user.id;
                                    console.info("Changed user Id to: ", item.user.id);
                                    window.localStorage.setItem('user', JSON.stringify(that.user));
                                }
                            });
                        }
                    })
                    .catch(function(error) {
                        // handle error
                        console.warn("Got an error when loading user.", error);
                    })

            } else {
                console.warn(`Something were wrong when logging: email = [${this.email}]`);
            }
        },
        logout: function() {
            this.isLoggedIn = false;
            this.user.email = "";
            this.$emit('logout', {});
            window.localStorage.removeItem('user');
        }
    },
};