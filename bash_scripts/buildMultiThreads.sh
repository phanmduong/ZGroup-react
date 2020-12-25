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
gnome-terminal --tab --command="./build.sh $module_name $branch_name"
i=$((i+1))
if ! (( i % 8 ));
then
  secs=$((180))
  while [ $secs -gt 0 ]; do
     echo -ne "Count down: $secs\033[0K\r"
#     grep 'cpu ' /proc/stat | awk '{u=$2+$4; t=$2+$4+$5; if (NR==1){u1=u; t1=t;} else print ($2+$4-u1) * 100 / (t-t1) "%"; }'
     sleep 1
     : $((secs--))
done
fi



done
