@extends("survey::layouts.master")

@section("content")
    <div class="container">
        <h5 style="text-align:center">{{$survey->name}}</h5>
        <form id="survey-form" novalidate>
            @if($user == null)
                <div class="form-group">
                    <label for="name">Họ tên</label>
                    <input type="text" 
                        name="name"
                        id="name"
                        required
                        class="form-control">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" 
                        name="email"
                        required
                        id="email"
                        class="form-control">
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="text" 
                        name="phone"
                        id="phone"
                        required
                        class="form-control">
                </div>
            @endif

            @foreach($survey->questions()->orderby("order")->get() as $question)
                @include(question_view($question->type), ['question' => $question])
            @endforeach
            <div id="error"></div>
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
            const form = $("#survey-form");
            form.submit((event) => {             
                event.preventDefault();
                const formJs = document.getElementById("survey-form");

                if (formJs.checkValidity()) {
                    const answers = form.serializeArray();
                
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
                } else {
                    alert("Bạn cần nhập đủ thông tin");
                    formJs.classList.add('was-validated');
                }
            });
        });        
    </script>
@endsection