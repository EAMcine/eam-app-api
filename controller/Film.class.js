const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eam',
    port: 8889,
});

class Film {
    createFilm(titre, auteur, genre, date_sortie, acteurs, duree, img_link) {
        const query = `INSERT INTO FILMS_WISHLIST (titre, auteur, genre, date_sortie, acteur, duree, img_link) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return pool.query(query, [titre, auteur, genre, date_sortie, acteurs, duree, img_link]);
    }

    deleteFilm() {
        const query = '';
        // Code pour supprimer un film de la table FILMS_WISHLIST
    }

    createWishFilm() {
        const query = '';
        // Code pour créer un film dans la liste de souhaits (wishlist)
    }

    deleteWishFilm() {
        const query = '';
        // Code pour supprimer un film de la liste de souhaits (wishlist)
    }
}

module.exports = Film;
