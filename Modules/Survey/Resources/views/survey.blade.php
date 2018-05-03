@extends("survey::layouts.master")

@section("content")
    <div class="container">
        <h5 style="text-align:center">{{$survey->name}}</h5>
        <form id="form">
            @if($user == null)
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
            @endif

            @foreach($survey->questions()->orderby("order")->get() as $question)
                @include(question_view($question->type), ['question' => $question])
            @endforeach
            <div style="text-align: center" id="submit-button">
                <input style="padding:6px 40px" type="submit" class="btn btn-success" value="Gửi"/>
            </div>
        </form>
    </div>
@endsection

@section("script")
<script>
        $(document).ready(() => {
            let user = {};
            const form = $("#form");
            form.submit((event) => {             
                event.preventDefault();
                const answers = form.serializeArray();
                
                console.log(answers);
                const reducedArray = {};
                for (let i = 0; i < answers.length; i++) {
                    let {name, value} = answers[i];
                    name = name + "";
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
                const submitData = JSON.stringify(reducedArray);
                
                console.log(submitData);
                console.log(user);
                $("#submit-button").html(
                    "<i class=\"fa fa-circle-o-notch fa-spin\"></i> Đang tải lên"
                );

                $.post("/survey/{{$survey->id}}/store", {
                    data : submitData,
                    email: user.email,
                    name: user.name,
                    phone: user.phone
                }, (data) => {
                    window.location.replace("/survey/submitted");
                })
            });
        });        
    </script>
@endsection