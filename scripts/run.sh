puzzle=`echo "$1" | sed "s/[^0-9]//g"`
if [ -z "$1" ]; then
  echo "Missing puzzle arg"
  exit 1
fi

npx ts-node "src/$puzzle/$1.ts"
