export default {
    templateFile: "assignment.html",
    components: {},
    data() {
        return {
            isLoggedIn: false,
            email: "",
        };
    },
    created() {
        console.info("Assignment component is initialized");
    },
    mounted() {
        const userStr = window.localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            this.email = user.email;
            console.info("The user has logged in already.");
            this.signin();
        }
    },
    methods: {
        signin: function() {
            if (this.email) {
                this.isLoggedIn = true;
                const user = { email: this.email };
                console.log(`User [${this.email}] has logged in`);
                window.localStorage.setItem('user', JSON.stringify(user));
                this.$emit('logged', user)
                return;
            }
            console.warn(`Something were wrong when logging: email = [${this.email}]`);
        },
        logout: function() {
            this.isLoggedIn = false;
            this.email = "";
            this.$emit('logout', {});
            window.localStorage.removeItem('user');
        }
    },
};