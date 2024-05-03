# aliases
alias ll="ls -alF"
alias less="less -R"

## docker
alias dc="docker compose"
alias dce="dc exec"
alias dcr="dc restart"
alias dcps="dc ps"
alias dcl="dc logs"
alias dcf="dc down -v --rmi all --remove-orphans"
alias dcb="dc build --no-cache"
alias dcbp="dc build --no-cache --parallel"