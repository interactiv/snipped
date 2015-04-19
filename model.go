package main

// Language represent the possible languages for a snippet
type Language struct {
	ID   int
	Name string
}

// Snippet represents a Snippet
type Snippet struct {
	ID           string
	Title        string
	Description  string
	Content      string
	Language     Language
	DateCreation string
	DateUpdate   string
	Tags         []string
}

type User struct {
	ID string
}
