INSERT INTO heroes (name, color, style, gender, class, user_id, preview_img, hp)
VALUES ($1, $2, $3, $4, $5, $6, $7, 100);

SELECT * FROM heroes
WHERE name = $1