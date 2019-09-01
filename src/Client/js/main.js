const appConfig = {
    host: "http://127.0.0.1:9090/api"
}

window["appConfig"] = appConfig;

// config Vuejs axios
axios.defaults.baseURL = appConfig.host;