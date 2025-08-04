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
			pi.product_id,     -- 1
			p.name,            -- 2 (ItemName)
			pi.quantity,       -- 3
			ut.name AS unit_name, -- 4 (UnitName)
			pi.supplier,       -- 5
			pi.created_at,     -- 6
			pi.updated_at,     -- 7
			pi.note,           -- 8
			pi.received_by,    -- 9
			pi.expired_date,   -- 10
			pi.expired_status  -- 11
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
			&p.ProductID,     // 1
			&p.ItemName,      // 2
			&p.Quantity,      // 3
			&p.UnitName,      // 4
			&p.Supplier,      // 5
			&p.CreatedAt,     // 6
			&p.UpdatedAt,     // 7
			&p.Note,          // 8
			&p.ReceivedBy,    // 9
			&p.ExpiredDate,   // 10
			&p.ExpiredStatus, // 11
		)
		if err != nil {
			log.Println("Error scanning expired products:", err)
			continue
		}
		expiredProducts = append(expiredProducts, p)
	}

	return expiredProducts, nil
}
