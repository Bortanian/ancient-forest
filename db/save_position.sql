UPDATE map
SET pos_x = $1,
    pos_y = $2,
    map_id = $3
WHERE hero_id = $4