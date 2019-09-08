export default {
    templateFile: "registrationcollector.html",
    components: {},
    data() {
        return {
            invoiceNo: 0,
            ceatedUser: "",
            createdDate: (new Date()).toDateString(),
            total: 0,
            datas: [],
            registeredDatas: [],
            isPrinting: false,
        };
    },
    created() {
        console.info("Configuration component is initialized");
    },
    mounted() {
        this.init();
    },
    methods: {
        init: function init() {
            const user = JSON.parse(window.localStorage.getItem('user'));
            this.invoiceNo = window.Application.Config.userConfig.sessionId;
            this.ceatedUser = user.email;
            if (user.id && user.email) {
                this.checkPrintStatus();
                this.loadData();
            }
        },
        loadData: function loadData() {
            var that = this;
            axios.get('/api/registration', {
                    method: 'GET',
                    mode: 'no-cors',
                })
                .then(function(response) {
                    const resData = response.data;
                    if (resData.length) {
                        that.registeredDatas = resData;
                        var idTracking = {};
                        resData.forEach(item => {
                            if (item.data && item.data.id) {
                                that.total += 1;
                                var data = item.data;

                                if (idTracking[data.id]) {
                                    idTracking[data.id].count += 1;
                                    idTracking[data.id].registerUser += that.getUserName(item.user.email) + ", ";
                                } else {
                                    data["count"] = 1;
                                    data["registerUser"] = that.getUserName(item.user.email) + ", ";
                                    idTracking[data.id] = data;
                                    that.datas.push(data);
                                }
                            }
                        });
                    }
                })
                .catch(function(error) {
                    // handle error
                    console.error("Got an error when loading user.", error.response);
                    that.setError(error);
                })
        },
        getUserName: function name(email) {
            return email.slice(0, email.lastIndexOf('@'));
        },
        setError: function setError(error) {},
        checkPrintStatus: function checkPrintStatus(params) {
            const urlParam = URLHelper.getUrlParams(window.location.href);
            if (urlParam && urlParam.appSate == 'printing') {
                this.isPrinting = true;
                setTimeout(function print(params) {
                    window.print();
                }, 1000)
            }
        },
        print: function printEl() {
            var printUrl = window.location.href;
            if (printUrl.indexOf('?') <= 0) {
                printUrl += '?hideLoginPanel=true&appSate=printing'
            } else {
                printUrl += '&hideLoginPanel=true&appSate=printing'
            }
            var mywindow = window.open(printUrl, "Invoice Printing", 'height=600,width=1024');
            mywindow.document.close();
            mywindow.focus();
        }
    },
};