import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import MovieDetail from './components/MovieDetail.vue';
import Movies from './components/Movies.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Movies },
        { path: '/movies/:id', component: MovieDetail, props: true },
    ],
});

createApp(App).use(router).mount('#app');
