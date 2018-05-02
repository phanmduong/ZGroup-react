<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">

    <title>{{$survey->name}}</title>
  </head>
  <body>
        <div class="container">
            <h5 style="text-align:center">{{$survey->name}}</h5>
            <form id="form">
                <div class="form-group">
                    <label for="name">Họ tên</label>
                    <input type="text" 
                        name="name"
                        id="name"
                        class="form-control">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" 
                        name="email"
                        id="email"
                        class="form-control">
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="text" 
                        name="phone"
                        id="phone"
                        class="form-control">
                </div>

                @foreach($survey->questions()->orderby("order")->get() as $question)
                    @include(question_view($question->type), ['question' => $question])
                @endforeach
                <div style="text-align: center">
                    <input type="submit" class="btn btn-success" value="Gửi"/>
                </div>
            </form>
        </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <script>
        $(document).ready(() => {
            let user = {};
            const form = $("#form");
            form.submit((event) => {             
                event.preventDefault();
                const answers = form.serializeArray();
                const reducedArray = [];
                for (let i = 0; i < answers.length; i++) {
                    const {name, value} = answers[i];
                    if (name === "name") {
                        user.name = value;
                    } else if (name === "email") {
                        user.email = value;
                    } else if (name === "phone") {
                        user.phone = value;
                    }
                    else {
                        if (reducedArray[name]) {
                            reducedArray[name] += "," + value;
                        } else {
                            reducedArray[name] = value;
                        }
                    }
                }
                console.log(reducedArray);
                console.log(user);
                // TODO: post data to server  
            });
        });        
    </script>
  </body>
</html>