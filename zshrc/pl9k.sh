# 2017-12-25 powerlevel9k variables
# 2018-02-02 override icon and add randomness to prompt segment separator
# 2020-07-04 deprecated, use p10k.sh

# NOTE config theme: powerlevel9k
# NOTE run before running `source $ZSH/oh-my-zsh.sh` in zshrc (v1.x)
# NOTE run after running `source $ZSH/oh-my-zsh.sh` in zshrc (v2.1)

PL9K_THEME_PATH="$HOME/.oh-my-zsh/custom/themes/powerlevel9k/powerlevel9k.zsh-theme"
PL9K_VAR_NAME_REGEX='\<POWERLEVEL9K_[a-zA-Z_\$]+\>|\<POWERLEVEL9K_\$.*\>'


# NOTE config variables in theme file
POWERLEVEL9K_INVERT_DISPLAY=true    # custom var
POWERLEVEL9K_PROMPT_ON_NEWLINE=true
POWERLEVEL9K_RPROMPT_ON_NEWLINE=true
POWERLEVEL9K_RPROMPT=true
POWERLEVEL9K_SHORTEN_DELIMITER=$' \uF141'
POWERLEVEL9K_STATUS_OK=false
POWERLEVEL9K_TIME_FORMAT='%D{%R}' # '%D{%R %p}'  # format: zsh prompt expansion http://zsh.sourceforge.net/Doc/Release/Prompt-Expansion.html
# defined in functions/*.zsh
POWERLEVEL9K_MODE='nerdfont-fontconfig'  # 'awesome-fontconfig'


pl9kVars() { set | awk '/^POWERLEVEL9K_/ {print $0}' }
plToggle() {
  eval set_default $1 true  # NOTE init: if not init, set a non-empty value
  if [ $(eval "print \$$1") = "false" ]; then eval $1=true; else eval $1=false; fi
}
pl_toggle_INVERT_DISPLAY() { plToggle POWERLEVEL9K_INVERT_DISPLAY }
pl_toggle_PROMPT_ON_NEWLINE() { plToggle POWERLEVEL9K_PROMPT_ON_NEWLINE }
pl_toggle_RPROMPT_ON_NEWLINE() { plToggle POWERLEVEL9K_RPROMPT_ON_NEWLINE }
pl_toggle_RPROMPT() { plToggle POWERLEVEL9K_RPROMPT }
pl_set_SHORTEN_DIR_LENGTH() { POWERLEVEL9K_SHORTEN_DIR_LENGTH="${1:-1}" }
pl_set_prompt_separator() {
  POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR=${1:-''}
  POWERLEVEL9K_RIGHT_SEGMENT_SEPARATOR=${2:-''}
  POWERLEVEL9K_LEFT_SUBSEGMENT_SEPARATOR=${3:-'>'}
  POWERLEVEL9K_RIGHT_SUBSEGMENT_SEPARATOR=${4:-'<'}
  _pl9k_arrows=( '\uF432' '\uf178' '\uf061' '\uf0a4' '\uE0C1 ')  #     
  POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX="\u2570$_pl9k_arrows[$(( RANDOM % ${#_pl9k_arrows[@]} + 1))] "
  # TODO customize MULTILINE_FIRST_PROMPT_PREFIX MULTILINE_NEWLINE_PROMPT_PREFIX
}
pl_set_prompt_style() {   # NOTE ref https://github.com/ryanoasis/powerline-extra-symbols#glyphs
  rand() { print $(( RANDOM % ${1:-10})) }
  case ${1:-$( rand 6 )} in
    0) pl_set_prompt_separator '\uE0B0' '\uE0B2' '\uE0B1' '\uE0B3';;          #    
    1) pl_set_prompt_separator '\uE0B4 ' ' \uE0B6' '\uE0B5' '\uE0B7';;        #    
    2) pl_set_prompt_separator '\uE0B8 ' ' \uE0BA' '\uE0B9 ' ' \uE0BB';;      #         
    # 2) pl_set_prompt_separator '\uE0B8 ' ' \uE0BE' '\uE0B9 ' '\uE0B9;; '      #      
    3) pl_set_prompt_separator '\uE0BC ' ' \uE0BE' '\uE0BD ' ' \uE0BF';;      #         
    # 3) pl_set_prompt_separator '\uE0BC ' ' \uE0BA' '\uE0BD ' ' \uE0BD ';;     #    
    4) pl_set_prompt_separator '\uE0C0  ' '  \uE0C2' '\uE0C1  ' '  \uE0C3';;  #      
    5) pl_set_prompt_separator '\uE0C6 ' ' \uE0C7' '\uE0C6 ' ' \uE0C7';;      #    
    # 5) pl_set_prompt_separator '\uE0C4 ' ' \uE0C5' '\uE0C4 ' ' \uE0C5';;      #    
    *) pl_set_prompt_separator;;
  esac
}
pl_set_prompt_style 0


# NOTE custom icon overriding in functions/icons.zsh (require nerdfont installed)
POWERLEVEL9K_BACKGROUND_JOBS_ICON=$'\uF013'             # 
POWERLEVEL9K_NODE_ICON=$'\uE718'                        # 
# POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX=$'\u2570'$'\U2500'$'\uE0B1 '    # ╰─
POWERLEVEL9K_RAM_ICON=$'\uF463'                         # 
POWERLEVEL9K_VCS_REMOTE_BRANCH_ICON=$' \uE728 '         # 
POWERLEVEL9K_VCS_GIT_ICON=$'\uF1D3 '                    # 
POWERLEVEL9K_VCS_GIT_GITHUB_ICON=$'\uF113 '             # 
# POWERLEVEL9K_VCS_GIT_GITHUB_ICON=$'\uE708 '             # 
# POWERLEVEL9K_VCS_GIT_GITHUB_ICON=$'\uF408 '             # 
# POWERLEVEL9K_VCS_GIT_GITHUB_ICON=$'\uE709 '             # 
POWERLEVEL9K_NPM_LOCK_ICON=$'npm \uF023'                # npm 
POWERLEVEL9K_YARN_LOCK_ICON=$'yarn \uF023'              # yarn 
POWERLEVEL9K_NPM_ICON=$'\uE71E'                         # 
# POWERLEVEL9K_NPM_ICON=$'\uE616'                         # 
POWERLEVEL9K_CLOCK_ICON=$'\uF43A'                       # 
# POWERLEVEL9K_CPU_ICON=$'\uE266'                         # 
POWERLEVEL9K_CPU_ICON=$'\uF295'                         # 



# NOTE POWERLEVEL9K_* vars from powerlevel9k.zsh-theme
#   order by appearance
#     egrep -o $PL9K_VAR_NAME_REGEX $PL9K_THEME_PATH | awk '!a[$0]++'
#   order by first letter
#     egrep -o $PL9K_VAR_NAME_REGEX $PL9K_THEME_PATH | sort -u

# POWERLEVEL9K_INSTALLATION_DIR
# POWERLEVEL9K_COLOR_SCHEME
# POWERLEVEL9K_WHITESPACE_BETWEEN_LEFT_SEGMENTS
# POWERLEVEL9K_INVERT_DISPLAY  (customize)
# POWERLEVEL9K_LEFT_PROMPT_ELEMENTS
# POWERLEVEL9K_${(U)1#prompt_}_BACKGROUND
# POWERLEVEL9K_${(U)1#prompt_}_FOREGROUND
# POWERLEVEL9K_${(U)1#prompt_}_VISUAL_IDENTIFIER_COLOR
# POWERLEVEL9K_WHITESPACE_BETWEEN_RIGHT_SEGMENTS
# POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS
# POWERLEVEL9K_ANACONDA_LEFT_DELIMITER
# POWERLEVEL9K_ANACONDA_RIGHT_DELIMITER
# POWERLEVEL9K_BACKGROUND_JOBS_VERBOSE
# POWERLEVEL9K_PROMPT_ON_NEWLINE
# POWERLEVEL9K_DISK_USAGE_ONLY_WARNING
# POWERLEVEL9K_DISK_USAGE_WARNING_LEVEL
# POWERLEVEL9K_DISK_USAGE_CRITICAL_LEVEL
# POWERLEVEL9K_BATTERY_LOW_THRESHOLD
# POWERLEVEL9K_BATTERY_VERBOSE
# POWERLEVEL9K_BATTERY_STAGES
# POWERLEVEL9K_BATTERY_ICON
# POWERLEVEL9K_BATTERY_LEVEL_BACKGROUND
# POWERLEVEL9K_PUBLIC_IP_TIMEOUT
# POWERLEVEL9K_PUBLIC_IP_NONE
# POWERLEVEL9K_PUBLIC_IP_FILE
# POWERLEVEL9K_PUBLIC_IP_HOST
# POWERLEVEL9K_PUBLIC_IP_METHODS
# POWERLEVEL9K_ALWAYS_SHOW_CONTEXT
# POWERLEVEL9K_ALWAYS_SHOW_USER
# POWERLEVEL9K_CONTEXT_TEMPLATE
# POWERLEVEL9K_USER_TEMPLATE
# POWERLEVEL9K_HOST_TEMPLATE
# POWERLEVEL9K_CUSTOM_
# POWERLEVEL9K_COMMAND_EXECUTION_TIME_THRESHOLD
# POWERLEVEL9K_COMMAND_EXECUTION_TIME_PRECISION
# POWERLEVEL9K_DIR_PATH_SEPARATOR
# POWERLEVEL9K_HOME_FOLDER_ABBREVIATION
# POWERLEVEL9K_DIR_SHOW_WRITABLE
# POWERLEVEL9K_SHORTEN_DIR_LENGTH
# POWERLEVEL9K_SHORTEN_STRATEGY
# POWERLEVEL9K_SHORTEN_DELIMITER
# POWERLEVEL9K_DIR_PACKAGE_FILES
# POWERLEVEL9K_SHORTEN_FOLDER_MARKER
# POWERLEVEL9K_DIR_OMIT_FIRST_CHARACTER
# POWERLEVEL9K_IP_INTERFACE
# POWERLEVEL9K_VPN_IP_INTERFACE
# POWERLEVEL9K_LOAD_WHICH
# POWERLEVEL9K_STATUS_CROSS
# POWERLEVEL9K_STATUS_OK
# POWERLEVEL9K_STATUS_SHOW_PIPESTATUS
# POWERLEVEL9K_STATUS_HIDE_SIGNAME
# POWERLEVEL9K_STATUS_VERBOSE
# POWERLEVEL9K_STATUS_OK_IN_NON_VERBOSE
# POWERLEVEL9K_TIME_FORMAT
# POWERLEVEL9K_VCS_ACTIONFORMAT_FOREGROUND
# POWERLEVEL9K_VCS_INTERNAL_HASH_LENGTH
# POWERLEVEL9K_CHANGESET_HASH_LENGTH
# POWERLEVEL9K_SHOW_CHANGESET
# POWERLEVEL9K_VCS_GIT_HOOKS
# POWERLEVEL9K_VCS_HG_HOOKS
# POWERLEVEL9K_VCS_SVN_HOOKS
# POWERLEVEL9K_VI_INSERT_MODE_STRING
# POWERLEVEL9K_VI_COMMAND_MODE_STRING
# POWERLEVEL9K_PROMPT_ADD_NEWLINE
# POWERLEVEL9K_RPROMPT_ON_NEWLINE
# POWERLEVEL9K_DISABLE_RPROMPT
# NOTE from functions/icons.zsh
# POWERLEVEL9K_MODE
# POWERLEVEL9K_HIDE_BRANCH_ICON
# POWERLEVEL9K_${icon_name}
# NOTE from functions/icons.zsh
# POWERLEVEL9K_VCS_SHOW_SUBMODULE_DIRTY
# POWERLEVEL9K_VCS_HIDE_TAGS
