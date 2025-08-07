package utils

import (
	"errors"
	"time"
)

func ParseDate(s string) (time.Time, error) {
	if s == "" {
		return time.Time{}, nil
	}
	t, err := time.Parse("2006-01-02", s)
	if err != nil {
		return time.Time{}, errors.New("format tanggal harus YYYY-MM-DD")
	}
	return t, nil
}

func ToIntDefault(s string, def int) int {
	if s == "" {
		return def
	}
	v := 0
	for _, ch := range s {
		if ch < '0' || ch > '9' {
			return def
		}
		v = v*10 + int(ch-'0')
	}
	if v == 0 {
		return def
	}
	return v
}

func InStringSet(v string, set ...string) bool {
	for _, s := range set {
		if v == s {
			return true
		}
	}
	return false
}
