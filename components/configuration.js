export default {
    templateFile: "configuration.html",
    components: {},
    data() {
        return {
            sessionId: 0,
            host: "",
            message: "",
            supplier: "A Khoai",
            url: undefined,
            timeSet: 10,
            timer: undefined
        };
    },
    created() {
        console.info("Configuration component is initialized");
    },
    mounted() {
        this.sessionId = (new Date).getTime();
        this.host = "http://77dddebf.ngrok.io";
        window.Application.Config.host = this.host;
    },
    methods: {
        submit: function() {
            this.url = undefined;
            if (this.timer) {
                clearInterval(this.timer);
            }

            this.sessionId = (new Date).getTime();
            if (this.host) {
                this.url = window.location.origin + "/registration?data=" + URLHelper.dataToUrlQuery(this.sessionId, this.host, this.supplier, this.message);
                console.info("Url: ", this.url);

                this.timeSet = 20;
                var that = this;

                this.timer = setInterval(function() {
                    that.timeSet = that.timeSet - 1;
                    if (that.timeSet <= 0) {
                        clearInterval(that.timer);
                        that.timer = undefined;
                        that.url = undefined;
                    }
                }, 1000);
            }
        }
    },
};