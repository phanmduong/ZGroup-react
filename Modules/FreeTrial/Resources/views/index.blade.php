<!DOCTYPE html>
<html lang="en">

<head>


    <link href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/material/assets/css/bootstrap.min.css" rel="stylesheet"/>


<style>
#loader {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	background: #262626;
	z-index: 10000;
	text-align: center;
	font-size: 14px;
	color: #555;
	font-weight: normal;
	text-transform: uppercase;
}

#loader > img {
	display: block;
	width: 245px;
	height: 26px;
	margin: 250px auto 0px;
}

#loader span {
	position: relative;
	top: 10px;
	margin-top: 30px;
}

</style>

</head>



<body>	

    <div id="loader" class="">
        <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1513614828XX7yezVsBmicbFA.gif" alt="Loading..." style="width: 330px!important; height: auto!important;">
        <span>Loading FLATPACK Elements...</span>
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
        var url = "http://manage.keetool.xyz/login";
        axios.post(url, {
            email: '{{$email}}',
            password: '{{$password}}',
        }).then((res) => {
            token = res.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(res.data.user));    
            // localStorage.setItem("zgroup-token", JSON.stringify(res.data.user));    
            window.location = "http://manage.keetool.xyz";
        });
    </script>
</body>
</body>
</html>


