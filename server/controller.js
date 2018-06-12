module.exports = {
    getChars:(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params

        db.get_chars([id])
        .then( chars => res.status(200).send(chars))
        .catch( () => res.status(500).send())
    }
}