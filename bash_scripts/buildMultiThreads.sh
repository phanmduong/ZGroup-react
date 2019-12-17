branch=$1
sudo rm -rf ../dist/
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
if ! (( i % 10 ));
then
  sleep 70
fi



gnome-terminal --tab --command="./build.sh $module_name $branch_name"

done
