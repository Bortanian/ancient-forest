select * from heroes
join users on users.id = heroes.user_id
WHERE auth_id = $1