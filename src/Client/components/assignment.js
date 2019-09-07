export default {
    templateFile: "assignment.html",
    components: {},
    data() {
        return {
            isLoggedIn: false,
            user: { email: "" }
        };
    },
    created() {
        console.info("Assignment component is initialized");
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
        signin: function() {
            if (this.user.email) {
                this.isLoggedIn = true;
                this.user["lastAccessTime"] = (new Date()).toTimeString();
                this.user["id"] = (function() {
                    const now = new Date();
                    var id = now.getMonth() * 1000000 + now.getDay() * 100000 + now.getHours() * 1000
                    return id + now.getMinutes() * 100 + now.getMilliseconds();
                })();
                console.log(`User [${this.user}] has logged in`);
                window.localStorage.setItem('user', JSON.stringify(this.user));
                this.$emit('logged', this.user);

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
                                    window.localStorage.setItem('user', JSON.stringify(that.user));
                                    return;
                                }
                            });
                        }
                    })
                    .catch(function(error) {
                        // handle error
                        console.error("Got an error when loading user.", error);
                    })
                return;
            }
            console.warn(`Something were wrong when logging: email = [${this.email}]`);
        },
        logout: function() {
            this.isLoggedIn = false;
            this.user.email = "";
            this.$emit('logout', {});
            window.localStorage.removeItem('user');
        }
    },
};