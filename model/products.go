package model

type Product struct {
	ID        string `json:"id"`
	Sku       string `json:"sku"`
	Name      string `json:"name"`
	ItemID    string `json:"item_id"`
	ItemName  string `json:"item_name,omitempty"` // Optional, for response
	UnitID    string `json:"unit_id"`
	UnitName  string `json:"unit_name,omitempty"` // Optional, for response
	Price     int    `json:"price"`
	PriceSell int    `json:"price_sell"`
	MinStock  int    `json:"min_stock"`
}
