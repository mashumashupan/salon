FROM mcr.microsoft.com/devcontainers/base:bullseye

# update packages
RUN apt update -y && apt install -y gpg sudo wget curl

USER vscode

# install mise
RUN curl https://mise.run | sh

# setup mise shims
RUN echo 'eval "$(~/.local/bin/mise activate bash && mise install)"' >> ~/.bashrc

# install mise tools (.mise.teoml)
# RUN ~/.local/bin/mise install

RUN mkdir -p /home/vscode/.ssh

RUN rsync -av --ignore-missing-args $HOME/.ssh/config /home/vscode/.ssh/config

COPY --chown=vscode:vscode ./.bash_aliases /home/vscode/.bash_aliases

CMD [ "bash" ]