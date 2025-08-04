package productexpired

import (
	"database/sql"
	"log"
)

// Struct untuk response expired products

func GetExpiredStatus(db *sql.DB) ([]ExpiredProduct, error) {
	// Step 1: Update expired_status = TRUE jika sudah expired
	_, err := db.Exec(`
		UPDATE products_in
		SET expired_status = TRUE
		WHERE DATE(expired_date) <= DATE('now') AND (expired_status IS FALSE OR expired_status IS NULL)
	`)
	if err != nil {
		return nil, err
	}

	// Step 2: Ambil semua data yang expired_status = TRUE
	rows, err := db.Query(`
		SELECT 
			pi.product_id,
			p.name,
			pi.quantity,
			ut.name AS unit_name,
			pi.supplier,
			pi.created_at,
			pi.updated_at,
			pi.note,
			pi.received_by,
			pi.expired_date,
			pi.expired_status
		FROM products_in pi
		JOIN products p ON pi.product_id = p.id
		JOIN unit_types ut ON p.unit_id = ut.id
		WHERE pi.expired_status = TRUE
	`)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var expiredProducts []ExpiredProduct

	for rows.Next() {
		var p ExpiredProduct
		err := rows.Scan(
			&p.ProductID,
			&p.Quantity,
			&p.Supplier,
			&p.CreatedAt,
			&p.UpdatedAt,
			&p.Note,
			&p.ReceivedBy,
			&p.ExpiredDate,
			&p.ExpiredStatus,
			&p.ItemName,
		)
		if err != nil {
			log.Println("Error scanning expired product:", err)
			continue
		}
		expiredProducts = append(expiredProducts, p)
	}

	return expiredProducts, nil
}
