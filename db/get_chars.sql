select heroes.id, name, style, color, gender, class, preview_img from heroes
join users on users.id = heroes.user_id
WHERE auth_id = $1