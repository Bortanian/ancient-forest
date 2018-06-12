CREATE TABLE heroes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    color INTEGER,
    style INTEGER,
    gender INTEGER,
    class INTEGER,
    user_id INTEGER,
    map_id INTEGER,
    inv_id INTEGER
)