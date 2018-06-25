SELECT * FROM heroes
JOIN skillset on hero_id = heroes.id
JOIN abilities on ability = abilities.id
WHERE heroes.id = $1