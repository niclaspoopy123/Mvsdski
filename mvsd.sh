#!/bin/bash

# Mvsd Script
# A utility script for Mvsdski project

VERSION="1.0.0"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display help message
show_help() {
    echo "Mvsd Script v${VERSION}"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  help              Show this help message"
    echo "  version           Display version information"
    echo "  info              Display system information"
    echo "  greet [name]      Greet someone (default: Sigma boy)"
    echo ""
    echo "Examples:"
    echo "  $0 help"
    echo "  $0 version"
    echo "  $0 greet"
    echo "  $0 greet John"
}

# Function to display version
show_version() {
    echo -e "${GREEN}Mvsd Script${NC}"
    echo -e "Version: ${BLUE}${VERSION}${NC}"
    echo "Part of the Mvsdski project"
}

# Function to display system info
show_info() {
    echo -e "${BLUE}=== System Information ===${NC}"
    echo "Hostname: $(hostname)"
    echo "User: $(whoami)"
    echo "Date: $(date)"
    echo "Working Directory: $(pwd)"
    if command -v uname &> /dev/null; then
        echo "OS: $(uname -s)"
    fi
}

# Function to greet
greet() {
    local name="${1:-Sigma boy}"
    echo -e "${GREEN}Hello, ${name}!${NC}"
    echo -e "Welcome to ${YELLOW}Mvsdski${NC}"
}

# Main script logic
main() {
    if [ $# -eq 0 ]; then
        show_help
        exit 0
    fi

    case "$1" in
        help|--help|-h)
            show_help
            ;;
        version|--version|-v)
            show_version
            ;;
        info)
            show_info
            ;;
        greet)
            shift
            greet "$@"
            ;;
        *)
            echo -e "${RED}Error: Unknown command '$1'${NC}"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Execute main function
main "$@"
