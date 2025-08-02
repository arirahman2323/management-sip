package productexpired

import "database/sql"

func GetExpiredStatus(db *sql.DB) error {
	_, err := db.Exec(`
		UPDATE products_in
		SET expired_status = TRUE
		WHERE DATE(expired_date) <= DATE('now') AND expired_status = FALSE
	`)
	return err
}
