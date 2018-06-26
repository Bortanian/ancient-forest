SELECT * FROM heroes
JOIN skillset on skillset.hero_id = heroes.id
JOIN abilities on skillset.ability_name = abilities.id
JOIN map on map.hero_id = heroes.id
WHERE heroes.id = $1