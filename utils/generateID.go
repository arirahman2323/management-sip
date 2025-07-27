package utils

import (
	"database/sql"
	"fmt"
)

func GenerateNewID(db *sql.DB, table string, prefix string) (string, error) {
	var lastNumber int
	query := fmt.Sprintf(`
		SELECT CAST(SUBSTR(id, LENGTH(?) + 3) AS INTEGER)
		FROM %s
		WHERE id LIKE ?
		ORDER BY CAST(SUBSTR(id, LENGTH(?) + 3) AS INTEGER) DESC
		LIMIT 1
	`, table)

	likePattern := prefix + "-%"
	err := db.QueryRow(query, prefix, likePattern, prefix).Scan(&lastNumber)
	if err == sql.ErrNoRows {
		lastNumber = 0
	} else if err != nil {
		return "", err
	}
	fmt.Println(lastNumber)
	// ✅ Cari ID unik yang belum dipakai
	for {
		newID := fmt.Sprintf("%s-%03d", prefix, lastNumber+1)

		var exists int
		checkQuery := fmt.Sprintf("SELECT COUNT(*) FROM %s WHERE id = ?", table)
		err := db.QueryRow(checkQuery, newID).Scan(&exists)
		if err != nil {
			return "", err
		}

		if exists == 0 {
			return newID, nil // ✅ ketemu yang belum dipakai
		}

		lastNumber++
	}
}
