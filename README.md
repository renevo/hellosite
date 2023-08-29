# Website Placeholder

Simple website displaying... `Hello`.

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

## Tailwind

Install [Tailwind CLI](https://tailwindcss.com/blog/standalone-cli):

```bash
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
chmod +x tailwindcss-linux-x64
mv tailwindcss-linux-x64 ~/.local/bin/tailwindcss
```

Develop the CSS:

```bash
tailwindcss -i ./tailwind.css -o ./public/css/hello.css --watch
```

Build the CSS:

```bash
tailwindcss -i ./tailwind.css -o ./public/css/hello.css --minify
```