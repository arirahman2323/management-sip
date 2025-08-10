package model

type ProductIn struct {
	ID          string `json:"id"`
	ProductID   string `json:"product_id"`
	Quantity    int    `json:"quantity"`
	Supplier    string `json:"supplier"`
	Note        string `json:"note"`
	ReceivedBy  string `json:"received_by"`
	ExpiredDate string `json:"expired_date"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}
