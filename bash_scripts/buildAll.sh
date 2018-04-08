branch=$1
if [ -z "$branch" ]; then
    branch=master
fi

branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}
branch_name=${branch_name:-HEAD}

if [ $branch_name != $branch ]; then
    echo "Current git branch not match"
    echo "You cannot push to $branch_name from $branch"
    exit 1
fi

for file in $(find "../src/entries" -type f)
do
file_name=$(basename $file)  
module_name="${file_name%.*}"
./build.sh $module_name $branch_name
done