<template>
    <div>
        <router-view />
    </div>
</template>


<script>
import MovieList from './components/Movies.vue';
import Movies from "./components/Movies.vue";

export default {
    components: {
        Movies,
        MovieList,
    },
};
</script>
