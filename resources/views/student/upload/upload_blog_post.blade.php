<div class="row">
    <div class="col s12">

        <div id="blog-error">
        </div>
        <form method="post" action="{{url('student/storeblogpost')}}" enctype="multipart/form-data">
            {{csrf_field()}}
            <div class="row">

                <div class="col s12">
                    <label>Ảnh đại diện</label>
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>File</span>
                            <input type="file" name="blog-avatar"
                                   id="blog-avatar">
                        </div>
                        <div class="file-path-wrapper">
                            <input id="blog-avatar-url" value="{{isset($product)?$product->image_name:'' }}"
                                   class="file-path validate"
                                   type="text">
                        </div>
                    </div>
                </div>
                @if(isset($product))
                    <div class="col s12 m6">
                        <img class="responsive-img" src="{{$product->url}}"/>
                    </div>
                @endif
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <input name="blog-title" value="{{isset($product)?$product->description:''}}"
                           placeholder="Tiêu đề bài viết" id="blog-title"/>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <select id="blog-category-id">
                        @foreach($categories as $category)
                            @if(isset($product) && $product->category_id == $category->id)
                                <option selected value="{{$category->id}}">{{$category->name}}</option>
                            @else
                                <option value="{{$category->id}}">{{$category->name}}</option>
                            @endif

                        @endforeach
                    </select>
                    <label>Loại bài viết</label>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <label>Nội dung bài viết</label>
                                   <textarea name="blog-content" id="blog-content"
                                             style="width: 100%;height: 600px;">
                                       {!!isset($product)?$product->content:''!!}
                                    </textarea>
                </div>
            </div>

            <input id="blog-tags" name="blog-tags" value="{{isset($product)?$product->tags:''}}" type="hidden">

            <div class="row">
                <div class="col s12">
                    <label>Tags</label>
                </div>
                <div class="col s12">

                    <ul id="myTags">
                    </ul>
                </div>
            </div>


            <div class="row">
                <div class="col s12" id="blog-btn-upload-container" style="padding-top:20px">
                    <input type="button" onclick="uploadBlogProduct()" class="waves-effect waves-light btn"
                           value="submit" name="submit"
                           id="blog-submit"/>
                    {{--<input type="button" onclick="test()" class="waves-effect waves-light btn"--}}
                    {{--value="submit" name="submit"--}}
                    {{--id="blog-submit"/>--}}
                </div>
            </div>


        </form>
    </div>
</div>
{{--<script src="{{url('js/ckeditor/ckeditor.js')}}"></script>--}}
<script src="{{url('js/ckeditor/ckeditor.js')}}"></script>
<script type="text/javascript">

    $(document).ready(function () {
        $("#myTags").tagit({
            availableTags: {!!  json_encode($tags)!!},
            autocomplete: {delay: 0, minLength: 1},
            singleField: true,
            singleFieldNode: $('#blog-tags')

        });
    });
</script>


<script>

    $(document).ready(function () {
        $('select').material_select();
    });

    CKEDITOR.on('dialogDefinition', function (ev) {
        // Take the dialog name and its definition from the event data.
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;
        // Check if the definition is from the dialog window you are interested in (the "Link" dialog window).
        if (dialogName == 'image') {
            var infoTab = dialogDefinition.getContents('info');
            dialogDefinition.removeContents('Link');
            console.log(infoTab);
            infoTab.remove('txtHeight');
            infoTab.remove('txtWidth');
            infoTab.remove('txtBorder');
            infoTab.remove('txtHSpace');
            infoTab.remove('txtVSpace');
            infoTab.remove('cmbAlign');
            infoTab.remove('txtAlt');
        }
    });
    //    CKEDITOR.on('dialogDefinition', function (ev) {
    //        console.log(ev.data);
    //        // Take the dialog name and its definition from the event data.
    //        var dialogName = ev.data.name;
    //        var dialogDefinition = ev.data.definition;
    //
    //        // Check if the definition is from the dialog we're
    //        // interested in (the 'image' dialog). This dialog name found using DevTools plugin
    //        if (dialogName == 'image') {
    //
    //            var uploadTab = dialogDefinition.getContents('Upload');
    //            var uploadButton = uploadTab.get('uploadButton');
    //
    //
    //            // Get a reference to the 'Image Info' tab.
    //            var infoTab = dialogDefinition.getContents('info');
    //
    //            // ADD OUR CUSTOM TEXT
    //            infoTab.add(
    //                    {
    //                        type: 'html',
    //                        html: 'Click the button to select your image from your gallery,<br> or use the UPLOAD tab to upload a new image.'
    //                    },
    //                    'htmlPreview'
    //            );
    //
    //            var imageButton = infoTab.get('browse');
    //            imageButton['label'] = 'Select Image';
    //
    //            //I HAVE DONE THIS TO HIDE BUT I WOULD LIKE TO REALLY HIDE!
    //            var urlField = infoTab.get('txtUrl');
    //            urlField['style'] = 'display:none; width:0;';
    //
    //
    //            // Remove unnecessary widgets/elements from the 'Image Info' tab.
    //            infoTab.remove('ratioLock');


    //            //CANT REMOVE IT AS IT IS REQUIRED BY THE CODE TO PREPARE THE PREVIEW WINDOW
    //            //infoTab.remove( 'txtUrl' );
    //
    //        }
    //    });
    var blog_content_editor = CKEDITOR.replace('blog-content', {
        filebrowserUploadUrl: "{{url('uploadfile?owner_id='.$owner_id)}}"
    });


    function uploadBlogProduct() {
//        console.log($('#blog-tags').val());
        var imageType = ['jpeg', 'jpg', 'png', 'gif'];
//        var videoType = ['mp4', 'mov'];
        var alowType = imageType;
        var file = document.getElementById('blog-avatar').files[0];
        if (file) {
            var fileExtension = file.name.split('.').pop();
            if ($.inArray(fileExtension, alowType) == -1) {
                $('#blog-error').html('<span class="red-text">Avatar chỉ chấp nhận những file có định dạng sau: gif, jpeg, jpg, png, mp4, mov</span>');
//        }
//        else if ($.inArray(fileExtension, videoType) == 1 && file.size > 300 * 1024 * 1000) {
//            $('#blog-error').html('<span class="red-text">Video bạn up lên có kích thước quá lớn: tối đa 30Mb</span>');
            }
            if ($.inArray(fileExtension, imageType) == 1 && file.size > 25 * 1024 * 1000) {
                $('#blog-error').html('<span class="red-text">Ảnh bạn up lên có kích thước quá lớn: tối đa 5Mb</span>');
            }
        }
        if (!$('#blog-avatar-url').val()) {
            alert('Bạn quên chưa thêm ảnh đại diện');
        } else {
            $('#blog-error').html('');
            var productType = 2;
            var avatarType = 0;
//            if ($.inArray(fileExtension, videoType) == -1) {
//                avatarType = 0;
//            }
            console.log(productType);
            $('#blog-btn-upload-container').html('' +
                    '<strong class="blue-text">Xin bạn vui lòng đợi một chút, Bài viết của bạn đang được tải lên....' +
                    '</strong>' +
                    '<div class="progress">' +
                    '<div class="determinate" id="blog-post-progress" style="width: 0%"></div>' +
                    '</div>');
//            var blog_content = nicEditors.findEditor('blog-content').getContent();
            var blog_content = blog_content_editor.getData();
//            console.log(blog_content);
            var formdata = new FormData();
            var category_id = $('#blog-category-id').val();
            var product_id = {{isset($product)?$product->id:-1}};
            formdata.append("avatar", file);
            formdata.append("id", product_id);
            formdata.append("title", $('#blog-title').val());
            formdata.append("tags", $('#blog-tags').val());
            formdata.append("type", productType);
            formdata.append("avatar_type", avatarType);
            formdata.append("category_id", category_id);
            formdata.append('blog_content', blog_content);
            formdata.append("_token", "{{csrf_token()}}");
            var ajax = new XMLHttpRequest();
            ajax.upload.addEventListener("progress", blogProgressHandler, false);
            ajax.addEventListener("load", blogCompleteHandler, false);
            ajax.addEventListener("error", blogErrorHandler, false);
            ajax.addEventListener("abort", blogAbortHandler, false);
            ajax.open("POST", "{{url('student/storeblogpost')}}");
            ajax.send(formdata);
        }
    }
    function blogProgressHandler(event) {
        var percent = (event.loaded / event.total) * 100;
        var roundedPercent = Math.round(percent);
        if (roundedPercent >= 100) {
            $('#blog-error').html('Đang tối ưu, xin bạn đợi cho đến khi có thông báo "tải lên thành công"');
        }
        $('#blog-post-progress').attr('style', 'width:' + roundedPercent + '%');
    }
    function blogCompleteHandler(event, data) {
        $('#blog-error').html(event.target.responseText);
        window.location.reload(true);
    }
    function blogErrorHandler(event, data) {
        console.log(data);
        alert('Có lỗi');
    }
    function blogAbortHandler(event) {
        alert('Đã huỷ tải lên');
    }
</script>