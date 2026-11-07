FROM docker.io/library/golang:1.25-alpine@sha256:78c9e40f10516d7070156948a1747347cc5093022f06deeff3c9decd5faa3af7 AS builder
RUN apk add --no-cache patch
WORKDIR /src
COPY upstream/ ./
COPY patches/ /patches/
RUN patch -p1 < /patches/startos-rpc.patch \
    && go mod download \
    && go mod verify \
    && CGO_ENABLED=0 go build -mod=readonly -trimpath -ldflags="-s -w" -o /moneroblock .
FROM docker.io/library/alpine:3.24@sha256:3f4d6b32e26703c6082839234f43769d5046b3ac7c910033911d1e71d8cd630a
COPY --from=builder /moneroblock /usr/local/bin/moneroblock
COPY --from=builder /src/go.sum /usr/share/moneroblock/go.sum
COPY start-moneroblock /usr/local/bin/start-moneroblock
RUN chmod 755 /usr/local/bin/start-moneroblock
EXPOSE 31312
ENTRYPOINT []
