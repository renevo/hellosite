package main

import (
	"io/fs"

	"github.com/renevo/bootstrap"
)

var (
	// populated by goreleaser
	version = "dev"
)

func main() {
	webPath, err := fs.Sub(content, "public")
	if err != nil {
		panic(err)
	}

	if err := bootstrap.HTTP("hello", version, webPath); err != nil {
		panic(err)
	}
}
