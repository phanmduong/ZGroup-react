#!/bin/bash
bar=world
foo="Hello $bar"

echo $foo $bar

res=$(ls /etc | wc -l)
echo $res