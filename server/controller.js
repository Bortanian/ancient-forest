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
        const {name, color, style, gender, charClass, id} = req.body
        console.log(req.body)

        db.create_hero([name, color, style, gender, charClass, id])
        .then( () => res.status(200).send())
        .catch( () => res.status(500).send())
    },
    deleteChar:(req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_char([id])
        .then( () => res.status(200).send())
        .catch( () => res.status(500).send())
    }
}