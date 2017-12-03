<!doctype html>
<html lang="en">

<head>
    <script src="/assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
    <meta charset="utf-8"/>
    <link rel="icon" type="image/png" href="/assets/img/favicon.ico">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>Nhật Quang Shop</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <link href="/fontawesome/css/font-awesome.min.css" rel="stylesheet"/>

    <link href="/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="/assets/css/demo.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="/assets/css/nucleo-icons.css" rel="stylesheet">
    <script>
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>
</head>
<body class="profile" style="background:#fafafa">
<div id="app">
    <div v-for="order in orders">
        @{{ order.customer.name }}
    </div>
</div>
</body>

<!-- Core JS Files -->

<script src="/assets/js/jquery-ui-1.12.1.custom.min.js" type="text/javascript"></script>
<script src="/assets/js/tether.min.js" type="text/javascript"></script>
<script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/assets/js/paper-kit.js?v=2.0.0"></script>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/graphics.js?6868"></script>
<script src="/js/nhatquangshop.js?6868"></script>
<script>

    new Vue({
        el: '#app',
        data: {
            orders: []
        },
        methods: {
            getUnits: function () {
                axios.get('http://manageapi.nhatquangshop.tk/order/all-orders?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU1NDYsImlzcyI6Imh0dHA6Ly9hcGkubmhhdHF1YW5nc2hvcC50ay9sb2dpbiIsImlhdCI6MTUxMTkyOTcwOSwiZXhwIjoxNTEyNTM0NTA5LCJuYmYiOjE1MTE5Mjk3MDksImp0aSI6ImkxVmJWcE5JVjROM2t2NGkifQ.EZ_Ij3NOOg92To5XNDQ6LSMHqwccVCYQ4GRdBkWMgk4')
                    .then(function (response) {
                        this.orders = response.data.orders;
                        console.log(this.data);
                        console.log(this);
                    }.bind(this))
                    .catch(function (error) {

                    });
            }
        },
        created: function () {
            console.log('gaugau');
            this.getUnits()
        }
    });
</script>
</html>