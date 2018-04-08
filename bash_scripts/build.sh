#!/bin/bash

# Those rules must be obeyed
# syntax: ./build.sh module_name branch_name
# module_name == public/manage/folder_name == views/client/blade_file_name

module_name=$1

echo "Build module: $module_name"

branch=$2
if [ -z "$branch" ]; then
    branch=master
fi

branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}
branch_name=${branch_name:-HEAD}

# if [ $branch_name != $branch ]; then
#     echo "Current git branch not match"
#     echo "You cannot push to $branch_name from $branch"
#     exit 1
# fi


project_folder=~/code/keetool-client-server
dest_folder=$project_folder/public/manage
blade_file=$project_folder/resources/views/client/$module_name.blade.php

# get blade template content
template=$(cat ./content.temp)

if [ ! -d "../dist" ]; then
    mkdir ../dist
fi

eval "npm run build:$module_name -s"

#delete map file
find ../dist/$module_name/ -type f -name '*map' -delete

find "$dest_folder/$module_name" -type f -delete

for file in $(find "../dist/$module_name" -type f)
do
    echo "========================="
    file_name=$(basename $file)    
    dest_file=$dest_folder/$module_name/$file_name 
    echo "From $file"
    echo "To $dest_file"
    cp $file $dest_file

    if [ ${file_name: -3} == ".js" ]; then
        js_file_link=$module_name/$file_name
        template=${template/"[JS]"/$js_file_link}
        # echo $template
        echo "js link replaced"
    fi

    if [ ${file_name: -4} == ".css" ]; then
        css_file_link=$module_name/$file_name
        template=${template/"[CSS]"/$css_file_link}
        echo "css file link replaced"
        # echo $template
    fi
done

echo "write blade: $blade_file"
echo $template > $blade_file
echo "Build successfully"

# echo "Push to branch: $branch"
# cd $project_folder
# git add .
# git commit -m "Build module $module_name"
# git pull origin $branch
# git push origin $branch
# echo "Push successfully"