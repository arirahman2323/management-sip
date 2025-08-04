package productexpired

type ExpiredSoon struct {
	ProductID   string `json:"product_id"`
	ProductName string `json:"product_name"`
	Quantity    int    `json:"quantity"`
	Supplier    string `json:"supplier"`
	UpdatedAt   string `json:"updated_at"`
	ExpiredDate string `json:"expired_date"`
	ItemName    string `json:"item_name"`
	Message     string `json:"message"`
}

type ExpiredProduct struct {
	ProductID     string `json:"product_id"`
	Quantity      int    `json:"quantity"`
	Supplier      string `json:"supplier"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
	Note          string `json:"note"`
	ReceivedBy    string `json:"received_by"`
	ExpiredDate   string `json:"expired_date"`
	ExpiredStatus bool   `json:"expired_status"`
	ItemName      string `json:"item_name"`
	UnitName      string `json:"unit_name"`
}
