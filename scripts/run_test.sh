if [ -z "$1" ]; then
  echo "Missing puzzle arg"
  exit 1
fi

npx jest --testRegex "src/.*$1/.*Spec.*\\.ts"
