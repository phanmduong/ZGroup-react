#!/bin/bash
 
docker run -it --name composer --mount type=bind,source=$(pwd),target=/app composer bash