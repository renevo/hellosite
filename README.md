# Hello Site

A full-screen, animated hello from the edge of the internet.

The site is plain HTML, CSS, and JavaScript embedded in the Go binary. Run it locally with:

```bash
go run .
```

## Go Releaser

Snapshot:

```bash
goreleaser --snapshot --rm-dist
```

Release:

```bash
git tag -a v0.3.0 -m "New Release"
git push origin v0.3.0
goreleaser release --rm-dist
```