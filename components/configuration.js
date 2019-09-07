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
            timer: undefined,
            errorTimer: undefined,
            hasError: false
        };
    },
    created() {
        console.info("Configuration component is initialized");
    },
    mounted() {
        this.sessionId = (new Date).getTime();
        window.Application.Config.host = this.host;
    },
    methods: {
        setError: function(hasError) {
            if (this.errorTimer) {
                clearTimeout(this.errorTimer);
            }
            this.hasError = hasError
            var that = this;
            if (hasError) {
                this.errorTimer = setTimeout(function() {
                    that.hasError = false;
                    that.errorTimer = undefined;
                }, 3 * 1000);
            }
        },
        submit: function() {
            this.setError(false);
            this.url = undefined;
            if (this.timer) {
                clearInterval(this.timer);
            }

            if (this.host && this.host.length >= 14 && (this.host.indexOf('http://') + this.host.indexOf('https://')) >= -1) {
                this.sessionId = (new Date).getTime();
                this.url = window.Application.Config.baseUrl + "/registration?data=" + URLHelper.dataToUrlQuery(this.sessionId, this.host, this.supplier, this.message);
                console.info("Access url: ", this.url);

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
            } else {
                this.setError(true);
            }
        }
    },
};