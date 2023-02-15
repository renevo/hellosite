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
