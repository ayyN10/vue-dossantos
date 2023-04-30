<template>
    <div class="bloc">
        <h1>Liste des films</h1>
        <div>
            <label for="title">Barre de recherche :</label>
            <input type="text" placeholder="Recherche" v-model="searchQuery">
        </div>
        <ul>
            <li v-for="film in filteredFilms" :key="film.id">
                <router-link :to="'/movies/' + film.id">
                    <div class="bloc blocFilm">
                        <div class="film-poster" :style="{ backgroundImage: 'url(' + film.poster + ')' }"></div>
                        <div class="film-title mt10">Titre : {{ film.title }}</div>
                        <div class="desc">
                            <div class="film-title">Anne : {{ film.year }}</div>
                            <div class="film-title">Realisateur : {{ film.realisateur }}</div>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        <div>
            <button @click="showAddForm = true">Ajouter un film</button>
            <div v-if="showAddForm">
                <h2>Ajouter un film</h2>
                <form @submit.prevent="addFilm">
                    <div>
                        <label for="title">Titre:</label>
                        <input type="text" id="title" v-model="newFilm.title">
                    </div>
                    <div>
                        <label for="description">Description:</label>
                        <textarea id="description" v-model="newFilm.description"></textarea>
                    </div>
                    <div>
                        <label for="poster">URL de l'affiche:</label>
                        <input type="text" id="poster" v-model="newFilm.poster">
                    </div>
                    <div>
                        <label for="year">Anne:</label>
                        <input type="text" id="year" v-model="newFilm.year">
                    </div>
                    <div>
                        <label for="realisateur">Realisateur:</label>
                        <input type="text" id="realisateur" v-model="newFilm.realisateur">
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { films } from '../data.js';

export default {
    setup() {
        const showAddForm = ref(false);
        const newFilm = reactive({
            title: '',
            description: '',
            poster: '',
            year:'',
            realisateur:''
        });
        const addFilm = () => {
            if (newFilm.title && newFilm.description && newFilm.poster) {
                const id = films.length + 1;
                films.push({
                    id,
                    title: newFilm.title,
                    description: newFilm.description,
                    poster: newFilm.poster,
                    year: newFilm.year,
                    realisateur: newFilm.realisateur,
                });
                newFilm.title = '';
                newFilm.description = '';
                newFilm.poster = '';
                newFilm.year = '';
                newFilm.realisateur = '';
                showAddForm.value = false;
            }
        };

        const searchQuery = ref('');

        const filteredFilms = computed(() => {
            return films.filter((film) => {
                return (
                    film.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    film.year.toString().includes(searchQuery.value) ||
                    film.realisateur.toLowerCase().includes(searchQuery.value.toLowerCase())
                );
            });
        });

        return {
            films,
            showAddForm,
            newFilm,
            addFilm,
            searchQuery,
            filteredFilms,
        };
    },
};
</script>

<style>
.film-poster {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
}
.bloc{
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: #2c3e50;
}

.desc{
    display: flex;
    width: 100%;
    margin: 20px;
    justify-content: space-around;
}
.blocFilm{
    border:2px solid white;
    width: 500px;
}
body{
    margin: 0;
}
::marker {
    display: none;
    color: transparent;
}

.mt10{
    margin-top: 10px;
}
.film-title{
    font-family: "system-ui";
    color: red;
    text-decoration:none;
    font-size: 2em;
}

h1{
    font-family: "system-ui";
    color: red;
    font-size: 4em;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

label {
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
}

button:hover {
    background-color: #0062cc;
}
</style>
