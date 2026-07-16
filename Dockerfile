FROM alpine
LABEL org.opencontainers.image.source=https://github.com/renevo/hellosite
ENTRYPOINT ["/usr/local/bin/hello"]
ARG TARGETPLATFORM
COPY $TARGETPLATFORM/hello /usr/local/bin/hello
