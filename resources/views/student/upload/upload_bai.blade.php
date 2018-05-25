<div class="row">
    <div class="col s12">

        <div id="error-product">
        </div>
        <form method="post" action="{{url('student/storeproduct')}}" enctype="multipart/form-data">
            {{csrf_field()}}
            <div class="row">
                <div class="col s12">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>File</span>
                            <input type="file" name="product" id="product-field">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text">
                        </div>
                    </div>
                </div>
                <div class="input-field col s12">
                            <textarea name="description" class="materialize-textarea"
                                      id="product-description"></textarea>
                    <label for="description">Mô tả</label>
                </div>

                <input id="product-tags" name="tags" type="hidden">

                <div class="col s12">
                    <label>Tags</label>
                </div>
                <div class="input-field col s12" style="margin-top:0">
                    <ul id="ul-product-tags">
                    </ul>
                </div>

                <div class="col s12" id="btn-upload-container" style="padding-top:20px">

                    <input type="button" onclick="uploadProduct()" class="waves-effect waves-light btn"
                           value="submit" name="submit"
                           id="submit"/>
                </div>
            </div>
        </form>
    </div>
</div>
<script type="text/javascript">

    $(document).ready(function () {
        $("#ul-product-tags").tagit({
            availableTags: {!! json_encode($tags)!!},
            autocomplete: {delay: 0, minLength: 1},
            singleField: true,
            singleFieldNode: $('#product-tags')

        });
    });
</script>
<script>
    function uploadProduct() {
        var imageType = ['jpeg', 'jpg', 'png', 'gif'];
        var videoType = ['mp4', 'mov'];
        var alowType = imageType.concat(videoType);
        var file = document.getElementById('product-field').files[0];
        var fileExtension = file.name.split('.').pop();
        if ($.inArray(fileExtension, alowType) == -1) {
            $('#error-product').html('<span class="red-text">Bạn vui lòng chỉ up lên những file có định dạng sau: gif, jpeg, jpg, png, mp4, mov</span>');
        } else if ($.inArray(fileExtension, videoType) == 1 && file.size > 300 * 1024 * 1000) {
            $('#error-product').html('<span class="red-text">Video bạn up lên có kích thước quá lớn: tối đa 30Mb</span>');
        } else if ($.inArray(fileExtension, imageType) == 1 && file.size > 25 * 1024 * 1000) {
            console.log('hi');
            $('#error-product').html('<span class="red-text">Ảnh bạn up lên có kích thước quá lớn: tối đa 5Mb</span>');
        }
        else {
            $('#error-product').html('');
            var productType = 1;
            if ($.inArray(fileExtension, videoType) == -1) {
                productType = 0;
            }
            console.log(productType);
            $('#btn-upload-container').html('' +
                    '<strong class="blue-text">Xin bạn vui lòng đợi một chút, Bài của bạn đang được tải lên....' +
                    '</strong>' +
                    '<div class="progress">' +
                    '<div class="determinate" id="product-progress" style="width: 0%"></div>' +
                    '</div>');
            var formdata = new FormData();
            formdata.append("product", file);
            formdata.append("description", $('#product-description').val());
            formdata.append("tags", $('#product-tags').val());
            formdata.append("type", productType);
            formdata.append("_token", "{{csrf_token()}}");
            var ajax = new XMLHttpRequest();
            ajax.addEventListener("load", completeHandler, false);
            ajax.addEventListener("error", errorHandler, false);
            ajax.addEventListener("abort", abortHandler, false);
            ajax.open("POST", "{{url('student/storeproduct')}}");
            ajax.send(formdata);
        }
    }
    function progressHandler(event) {
        var percent = (event.loaded / event.total) * 100;
        var roundedPercent = Math.round(percent);
        if (roundedPercent >= 100) {
            $('#error-product').html('Đang tối ưu, xin bạn đợi cho đến khi có thông báo "tải lên thành công"');
        }
        $('#product-progress').attr('style', 'width:' + roundedPercent + '%');
    }
    function completeHandler(event, data) {
        $('#error-product').html(event.target.responseText);
        window.location.reload(true);
    }
    function errorHandler(event, data) {
        console.log(data);
        alert('Có lỗi');
    }
    function abortHandler(event) {
        alert('Đã huỷ tải lên');
    }
</script>