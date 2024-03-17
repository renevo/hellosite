package main

import (
	"cmp"
	"io/fs"
	"net/http"
	"os"

	"github.com/renevo/bootstrap"
)

var (
	// populated by goreleaser
	version = "dev"
)

func main() {
	var dfs fs.FS

	// using an env here, because there isn't currently a good way in the bootstrap to add a configuration before creating it
	if staticPath := os.Getenv("HTTP_STATIC_PATH"); staticPath != "" {
		dfs = os.DirFS(staticPath)
	} else {
		dfs, _ = fs.Sub(content, "public")
	}

	if err := bootstrap.HTTP(cmp.Or(os.Getenv("SERVICE_NAME"), "hello"), version, http.FS(dfs)); err != nil {
		panic(err)
	}
}
