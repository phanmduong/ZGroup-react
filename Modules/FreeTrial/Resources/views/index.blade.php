<!DOCTYPE html>
<html lang="en">

<head>


    <link href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/material/assets/css/bootstrap.min.css" rel="stylesheet"/>




</head>
<body>


<style type="text/css">
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: 50px;
  text-transform: uppercase;
  font-size: 18px;
}
.loading span {
  display: inline-block;
  background: #C50000;
  width: 50px;
  height: 50px;
  font-weight: bold;
  line-height: 50px;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 0 black;
  position: relative;
  top: 0;
  box-shadow: inset 0 1px 1px -1px black, inset 0 -5px 1px -1px rgba(0, 0, 0, 0.5);
}

.char1 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.1s;
}

.char2 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.2s;
}

.char3 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.3s;
}

.char4 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.4s;
}

.char5 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.5s;
}

.char6 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.6s;
}

.char7 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.7s;
}

.char8 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.8s;
}

.char9 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 0.9s;
}

.char10 {
  animation: foo 2s ease infinite, bar 3s linear infinite;
  animation-delay: 1s;
}

@keyframes foo {
  10% {
    top: -10px;
  }
  50% {
    top: 0;
  }
  100% {
    top: 0;
  }
}
@keyframes bar {
  10% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

</style>

<body>	

    <div class="container">
        <div style="height: 900px; display: flex; border-radius: 30px">
           <h1 class="loading">
                <span class="char1">K</span><span class="char2">E</span><span class="char3">E</span><span class="char4">T</span><span class="char5">O</span><span class="char6">O</span><span class="char7">L</span><span class="char8">.</span><span class="char9">.</span><span class="char10">.</span>
            </h1>
        </div>
    </div>
   
    <script>
        localStorage.setItem("token", "{{$token}}");
        localStorage.setItem("user", "{!!$user!!}");
        // window.location = "http://manage.keetool.xyz";
    </script>
</body>
</body>
</html>


