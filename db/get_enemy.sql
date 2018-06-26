SELECT * FROM enemies
JOIN enemyskillset on enemy_id = enemies.id
JOIN abilities on ability = abilities.id
WHERE enemies.id = $1