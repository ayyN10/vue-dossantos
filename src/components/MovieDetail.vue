<template>
    <div class="bloc">
        <div class="film-poster" :style="{ 'background-image': `url(${film.poster})` }"></div>
        <div class="film-details">
            <h1>{{ film.title }}</h1>
            <h2>{{ film.realisateur }} ({{ film.year }})</h2>
            <p>{{film.description}}</p>
        </div>
        <button v-if="!showForm" @click="showForm = true">Modifier</button>
        <form v-else class="edit-form">
            <input type="text" v-model="film.poster" placeholder="URL de l'affiche">
            <input type="text" v-model="film.title" placeholder="Titre">
            <input type="text" v-model="film.year" placeholder="Année de sortie">
            <input type="text" v-model="film.realisateur" placeholder="Réalisateur">
            <textarea v-model="film.description" placeholder="Description"></textarea>
            <div class="button-container">
                <button type="submit" @click.prevent="editFilm">Enregistrer</button>
                <button type="button" @click="showForm = false">Annuler</button>
            </div>
        </form>
        <div class="button-container">
            <button class="delete-button" @click="deleteFilm">Supprimer</button>
            <button class="back-button" @click="$router.push('/')">Retour à la liste</button>
        </div>
    </div>
</template>

<script>
import { films } from "../data.js";
export default {
    data() {
        return {
            film: {},
            showForm: false
        }
    },
    created() {
        const filmId = this.$route.params.id
        this.film = films.find(film => film.id === parseInt(filmId))
    },
    methods: {
        editFilm() {
            // Ajouter ici la logique pour éditer le film
            this.showForm = false;
            this.$router.push(`/movies/${this.film.id}`);
        },
        deleteFilm() {
            const index = films.findIndex(film => film.id === this.film.id);
            if (index !== -1) {
                films.splice(index, 1);
                this.$router.push('/');
            }
        }
    }
}
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
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0062cc;
}

div{
    height: 100%;
}
body{
    min-height: 100vh;
}
</style>
