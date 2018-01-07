@extends('layouts.2018-public')

@section('content')
    <div>
        <div class="container-fluid">
            <div class="row au-first right-image"
                 style="height: 300px; background-image: url('{{$course->cover_url}}')">
            </div>
            <div class="row" id="bl-routing-wrapper">
                <div style="width: 100%; text-align: center; background-color: white; height: 50px; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;">
                    <a class="routing-bar-item" href="#first-after-nav"
                       style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Thông
                        tin</a><span
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span><a
                            class="routing-bar-item" href="#pick-class"
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Đăng
                        kí</a>
                </div>
            </div>
            <br> <br>
        </div>
        <div class="container" id="first-after-nav">
            <div class="row">
                <div class="col-md-1">
                </div>
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="landing-title">{{$lesson_selected->name}}</h1>
                            <p>{{$lesson_selected->description}}</p>
                            <br>
                        </div>
                        <div class="col-md-8">
                            <div class='embed-container'>
                                <iframe src='{{$lesson_selected->video_url}}'
                                        frameborder='0' webkitAllowFullScreen mozallowfullscreen
                                        allowFullScreen></iframe>
                            </div>
                            <br>
                            <br>
                            <div>
                                {!! convert_image_html($lesson_selected->detail) !!}
                            </div>
                            <br>
                            <p></p>
                            <div class="comments" id="vue-comments">
                                @if(!isset($user))
                                    <div class="comment-wrap" v-if="login.isLogin">
                                        <div class="photo">
                                            <div class="avatar"
                                                 :style="{backgroundImage: 'url(' + login.user.avatar_url + ')' }"
                                            ></div>
                                        </div>
                                        <div class="comment-block">
                                            <div style="position: relative">
                                                <textarea cols="30" rows="3"
                                                          v-model="comment"
                                                          :disabled="isStoring"
                                                          @keydown="createComment($event,{{$lesson_selected->id}})"
                                                          placeholder="Đặt câu hỏi"></textarea>
                                                <div style="position: absolute; top: 0px; right: 0px" v-if="isStoring">
                                                    <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @else
                                    <div class="comment-wrap vue-login">
                                        <div class="photo">
                                            <div class="avatar"
                                                 style="background-image: url('{{$user->avatar_url}}')"></div>
                                        </div>
                                        <div class="comment-block">
                                            <div style="position: relative">
                                                <textarea cols="30" rows="3"
                                                          v-model="comment"
                                                          :disabled="isStoring"
                                                          @keydown="createComment($event,{{$lesson_selected->id}})"
                                                          placeholder="Đặt câu hỏi"></textarea>
                                                <div style="position: absolute; top: 0px; right: 0px" v-if="isStoring">
                                                    <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                @endif

                                <div v-for="commentItem in comments">
                                    <comment-parent v-bind:comment="commentItem"></comment-parent>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-4">
                            @foreach($course->terms()->orderBy('order')->get() as $term)
                                <div class="course-term">
                                    <a data-toggle="collapse" href="#collapse{{$term->id}}"
                                       class="{{$term->id == $lesson_selected->term->id ? '' : 'collapsed'}} "
                                       aria-expanded="{{$term->id == $lesson_selected->term->id ? 'true' : 'false'}}">
                                        <div style="background:#138edc; color:white; padding:10px">
                                            <div style="display: flex; flex-direction: row; justify-content: space-between">
                                                <div>
                                                    <p style="font-weight: 600; font-size:18px">{{$term->name}}</p>
                                                    <p style="font-weight: 200;">{{$term->short_description}}</p>
                                                </div>
                                                <div>
                                                    <i style="font-size:25px" class="fa fa-angle-down"
                                                       aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <br>
                                    <div id="collapse{{$term->id}}"
                                         aria-expanded="{{$term->id == $lesson_selected->term->id ? 'true' : 'false'}}"
                                         class="collapse {{$term->id == $lesson_selected->term->id ? 'in' : ''}}">
                                        @foreach($term->lessons()->orderBy('order')->get() as $lesson)

                                            <a href="/elearning/{{$course->id}}/{{$lesson->id}}"
                                               style="color:black; display: flex; flex-direction: row; cursor: pointer">
                                                <div style="font-size:20px;color:#138edc;">
                                                    <i class="fa fa-check-circle" aria-hidden="true"></i>
                                                </div>
                                                <div style="padding-left: 10px">
                                                    <p style="font-weight: 600">{{$lesson->name}}</p>
                                                    <p>{{$lesson->description}}</p>
                                                </div>
                                            </a>
                                        @endforeach
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
            <br><br><br>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        @if(isset($user))
            vueData.isLogin = true;
        vueData.user = JSON.parse(localStorage.getItem('auth')).user;
        @endif
        Vue.component('comment-child', {
            props: ['comment'],
            data: function () {
                return {
                    login: vueData,
                }
            },
            template: '<div class="comment-wrap">\n' +
            '                                        <div class="photo">\n' +
            '                                            <div class="avatar"\n' +
            '                                                 style="background-image: \'url(\'\')\'"\n' +
            '                                            ></div>\n' +
            '                                        </div>\n' +
            '                                        <div class="photo">\n' +
            '                                            <div class="avatar"\n' +
            '                                                 :style="{backgroundImage: \'url(\' + comment.commenter.avatar_url + \')\' }"></div>\n' +
            '                                        </div>\n' +
            '                                        <div class="comment-block  product-item">\n' +
            '                                            <p class="comment-text" style="word-wrap: break-word; white-space: pre-wrap;">@{{comment.content}}</p>\n' +
            '                                            <div class="bottom-comment">\n' +
            '                                                <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">\n' +
            '                                                    <div class="comment-date">@{{comment.created_at}}<a v-bind:href="/profile/+comment.commenter.username"> @@{{ comment.commenter.name }}</a></div>\n' +
            '                                                    <ul class="comment-actions"\n' +
            '                                                        style="padding: 0px!important;width: 90px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-bottom: 0px">\n' +
            '                                                        <li class="complain" v-if="login.isLogin">Thích</li>\n' +
            '                                                        <li class="reply" v-if="login.isLogin" v-on:click="$emit(\'changeCardComment\')">Trả lời</li>\n' +
            '                                                    </ul>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>'
        });
        Vue.component('comment-parent', {
            props: ['comment'],
            data: function () {
                return {
                    login: vueData,
                    commentChild: '',
                    isStoring: false,
                    isOpenComment: false
                }
            },
            template: '<div><div class="comment-wrap">\n' +
            '                                        <div class="photo">\n' +
            '                                            <div class="avatar"\n' +
            '                                                 :style="{backgroundImage: \'url(\' + comment.commenter.avatar_url + \')\' }"></div>\n' +
            '                                        </div>\n' +
            '                                        <div class="comment-block  product-item">\n' +
            '                                            <p class="comment-text" style="word-wrap: break-word; white-space: pre-wrap;">@{{comment.content}}</p>\n' +
            '                                            <div class="bottom-comment">\n' +
            '                                                <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">\n' +
            '                                                    <div class="comment-date">@{{comment.created_at}}<a v-bind:href="/profile/+comment.commenter.username"> @@{{ comment.commenter.name }}</a></div>\n' +
            '                                                    <ul class="comment-actions"\n' +
            '                                                        style="padding: 0px!important;width: 90px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-bottom: 0px">\n' +
            '                                                        <li class="complain" v-if="login.isLogin">Thích</li>\n' +
            '                                                        <li class="reply" v-if="login.isLogin" v-on:click="changeCardComment">Trả lời</li>\n' +
            '                                                    </ul>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div> ' +
            '                               <div class="comment-wrap" v-if="login.isLogin && isOpenComment">\n' +
            '                                        <div class="photo">\n' +
            '                                            <div class="avatar"\n' +
            '                                                 style="background-image: \'url(\'\')\'"\n' +
            '                                            ></div>\n' +
            '                                        </div>\n' +
            '                                        <div class="photo">\n' +
            '                                            <div class="avatar"\n' +
            '                                                 :style="{backgroundImage: \'url(\' + login.user.avatar_url + \')\' }"\n' +
            '                                            ></div>\n' +
            '                                        </div>\n' +
            '                                        <div class="comment-block">\n' +
            '                                                <div style="position: relative">\n' +
            '                                                <textarea cols="30" rows="3"\n' +
            '                                                          v-model="commentChild"\n' +
            '                                                          :disabled="isStoring"\n' +
            '                                                          @keydown="createCommentChild($event,{{$lesson_selected->id}})"\n' +
            '                                                          placeholder="Đặt câu hỏi"></textarea>\n' +
            '                                                <div style="position: absolute; top: 0px; right: 0px" v-if="isStoring">\n' +
            '                                                    <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>\n' +
            '                                                </div>\n' +
            '                                            </div>' +
            '                                        </div>\n' +
            '                                    </div>' +
            '                               <div v-for="commentItem in comment.child_comments">\n' +
            '                                    <comment-child v-bind:comment="commentItem" v-on:changeCardComment="changeCardComment"></comment-child>\n' +
            '                                </div>' +
            '                                    </div>',
            methods: {
                changeCardComment: function () {
                    this.isOpenComment = !this.isOpenComment;
                },
                createCommentChild: function (e, lessonId) {
                    if (e.keyCode === 13 && !e.shiftKey) {
                        e.preventDefault();
                        this.isStoring = true;
                        var url = "/elearning/" + lessonId + "/add-comment";
                        axios.post(url, {
                            lesson_id: lessonId,
                            content_comment: this.commentChild,
                            parent_id: this.comment.id,
                        }).then(function (res) {
                                this.commentChild = '';
                                this.isStoring = false;
                                this.comment.child_comments.unshift(res.data.comment);
                            }.bind(this)
                        );
                    }

                }
            }
        });
        var vueComments = new Vue({
            el: '#vue-comments',
            data: function () {
                return {
                    login: vueData,
                    comment: '',
                    isStoring: false,
                    comments: {!! $comments !!}
                }

            },
            methods: {
                createComment: function (e, lessonId) {
                    if (e.keyCode === 13 && !e.shiftKey) {
                        e.preventDefault();
                        this.isStoring = true;
                        var url = "/elearning/" + lessonId + "/add-comment";
                        axios.post(url, {
                            lesson_id: lessonId,
                            content_comment: this.comment
                        }).then(function (res) {
                                this.comments.unshift(res.data.comment);
                                this.comment = '';
                                this.isStoring = false;
                            }.bind(this)
                        );
                    }

                }
            }
        });

    </script>
@endpush