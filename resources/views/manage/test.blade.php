<html>
<head>
<body>


<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>
<script>
    var socket = io('http://{{url('/')}}:3000');
    $(document).ready(function(){
        socket.on('test-channel:UserSignedUp',function(data){
            console.log(data);
        });
    });

</script>
</body>
</head>
</html>