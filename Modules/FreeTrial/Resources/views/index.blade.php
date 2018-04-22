<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Keetool demo</title>
</head>
<body>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
        let url = env.DOMAIN + "/login";
        axios.post(url, {
            email: login.email,
            password: login.password,
            token_browser: tokenBrowser,
        });
    </script>
</body>
</html>
