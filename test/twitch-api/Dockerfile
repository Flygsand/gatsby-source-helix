FROM frolvlad/alpine-glibc:alpine-3.15

RUN wget -qO- https://github.com/twitchdev/twitch-cli/releases/download/1.1.1/twitch-cli_1.1.1_Linux_x86_64.tar.gz | tar x -C / -zf- twitch

ENTRYPOINT ["/twitch", "mock-api", "start"]
