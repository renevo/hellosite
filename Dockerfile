FROM alpine
LABEL org.opencontainers.image.source=https://github.com/renevo/hellosite
ENTRYPOINT ["/usr/local/bin/hello"]
COPY hello /usr/local/bin/hello
