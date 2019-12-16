branch=$1
if [ -z "$branch" ]; then
    branch=zgroup
fi

branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}
branch_name=${branch_name:-HEAD}


i=0
for file in $(find "../src/entries" -type f)
do
file_name=$(basename $file)  
module_name="${file_name%.*}"
echo "${i} : ${file_name%.*}"
i=$((i+1))
if ! (( i % 5 ));
then
  sleep 80
fi

gnome-terminal --command="./build.sh $module_name $branch_name"
#gnome-terminal --tab --command="./build.sh $module_name $branch_name"

done
