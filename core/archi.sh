create_archi_hexa() {
  print_info "Create Hexa Architecture in $1 directory."
  cd $1
  touch index.ts
  mkdir application
  cd application
    touch index.ts
    mkdir services
    cd services
      touch index.ts
      mkdir interfaces
      cd ..
    mkdir useCases
    cd ..
  mkdir domain
  cd domain
    touch index.ts
    mkdir services
    cd services
      touch index.ts
      mkdir interfaces
      cd ..
    mkdir aggregates
    mkdir factories
    mkdir entities
    mkdir value-objects
    cd ..
  mkdir infrastructure
  cd infrastructure
    touch index.ts
    mkdir repositories
    cd repositories
      touch index.ts
      mkdir interfaces
      cd ..
    mkdir mappers
    mkdir dtos
    mkdir database
    cd ..
}
Color_Off='\033[0m'
Black='\033[0;30m'
Red='\033[0;31m'
Green='\033[0;32m'
Yellow='\033[0;33m'
Blue='\033[0;34m'
Purple='\033[0;35m'
Cyan='\033[0;36m'
White='\033[0;37m'
Orange="\e[38;5;208m"
yes='^[Yy][Ee]?[Ss]?$'
ArchiDir=$1
ArchiType=$2
print_info() {
  printf "${Blue}$1$Color_Off\n"
}
print_err() {
    printf "${Red}$1$Color_Off\n"
}

print_warn() {
    printf "${Orange}$1$Color_Off\n"
}

print_success() {
    printf "${Green}$1$Color_Off\n"
}
print_help() {
    echo "Architecture builder"
    echo "This script helps you easily to create a file structure for different architecture>"
    echo ""
    echo "Usage:"
    echo "${0} -hexa -l=[ts,js]"
    echo "This will install Android SDK 34.0.4 with command l"
    echo ""
    echo "Options :"
    echo "-hexa to create hexagonal architecture"
  
}
create_archi_hexa() {
  print_info "Create Hexa Architecture in $1 directory."
  cd $1
  touch index.ts
  mkdir application
  cd application
    touch index.ts
    mkdir services
    cd services
      touch index.ts
      mkdir interfaces
      cd ..
    mkdir useCases
    cd ..
  mkdir domain
  cd domain
    touch index.ts
    mkdir services
    cd services
      touch index.ts
      mkdir interfaces
      cd ..
    mkdir aggregates
    mkdir factories
    mkdir entities
    mkdir value-objects
    cd ..
  mkdir infrastructure
  cd infrastructure
    touch index.ts
    mkdir repositories
    cd repositories
      touch index.ts
      mkdir interfaces
      cd ..
    mkdir mappers
    mkdir dtos
    mkdir database
    cd ..
  exit 1
}

if [ ! $ArchiDir ]; then
  print_warn "The Achitecture Dir is not specify. It can get this directory."
  ArchiDir="."
fi
echo "$OTPARG"




