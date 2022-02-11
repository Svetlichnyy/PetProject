import axios from "axios";

const defaultOptions = {
    baseURL: 'https://young-brushlands-01487.herokuapp.com/api',
        };
        let instance = axios.create(defaultOptions);
        instance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            config.headers.Authorization =  token ? `Bearer ${token}` : '';
            return config;
        });

        export default instance