import { createApp } from 'vue';
import { API_URL }  from '@/common/config'
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp();

app.use(VueAxios, axios);

const ApiService = {
  init() {
    app.axios.defaults.baseURL = API_URL;
  },

  get(resource) {
    this.init();
    return app.axios.get(`${resource}`)
  },

  post(resource, params) {
    this.init();
    return app.axios.post(`${resource}`, params)
  }
}

export default ApiService;