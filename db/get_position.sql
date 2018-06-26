SELECT map_id, pos_x, pos_y FROM heroes
JOIN map ON map.hero_id = heroes.id
WHERE heroes.id = $1