module.exports = {
    getChars:(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params

        db.get_chars([id])
        .then( chars => res.status(200).send(chars))
        .catch( () => res.status(500).send())
    },
    addChar:(req, res) => {
        const db = req.app.get('db');
        const {name, color, style, gender, charClass, id, preview_img} = req.body


        db.create_hero([name, color, style, gender, charClass, id, preview_img])
        .then( hero => res.status(200).send(hero))
        .catch( () => res.status(500).send())
    },
    deleteChar:(req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_hero([id])
        .then( () => res.status(200).send())
        .catch( () => res.status(500).send())
    },
    getEnemy:(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params

        db.get_enemy([id])
        .then( enemy => res.status(200).send(enemy))
        .catch( () => res.status(500).send())
    },
    getHero:(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params

        db.get_hero([id])
        .then( hero => res.status(200).send(hero))
        .catch( () => res.status(500).send())
    },
    addAbilities:(req, res) => {
        const db = req.app.get('db');
        const {ability, id} = req.body

        db.create_abilities([ability, id])
        .then( () => res.status(200).send())
        .catch( () => res.status(500).send())
    },
    deleteAbilities:(req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_abilities([id])
        .then( () => res.status(200).send())
        .catch( () => res.status(500).send())
    }
}