export default {
    templateFile: "registrationcollector.html",
    components: {},
    data() {
        return {
            invoiceNo: 0,
            ceatedUser: "",
            createdDate: (new Date()).toDateString(),
            total: 10,
            data: {},
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

        },
        checkPrintStatus: function checkPrintStatus(params) {
            const urlParam = URLHelper.getUrlParams(window.location.href);
            if (urlParam && urlParam.appSate == 'printing') {
                this.isPrinting = true;
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
            $(mywindow.document).ready(function() {
                mywindow.print();
            });
            mywindow.focus();
        }
    },
};