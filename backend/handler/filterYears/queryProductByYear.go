package filteryears

import (
	"database/sql"
	"fmt"
)

func QueryProductByYear(db *sql.DB, table string, year int) ([]MonthlyQuantity, int, error) {
	query := fmt.Sprintf(`
		SELECT strftime('%%m', updated_at) AS month, SUM(quantity) AS total_quantity
		FROM %s
		WHERE strftime('%%Y', updated_at) = ?
		GROUP BY month
		ORDER BY month;
	`, table)

	rows, err := db.Query(query, fmt.Sprintf("%04d", year))
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var results []MonthlyQuantity
	total := 0

	for rows.Next() {
		var m MonthlyQuantity
		if err := rows.Scan(&m.Month, &m.TotalQuantity); err != nil {
			return nil, 0, err
		}
		total += m.TotalQuantity
		results = append(results, m)
	}

	return results, total, nil
}
