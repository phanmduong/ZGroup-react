<div id="userPackModal" class="modal fade show">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h3 class="medium-title">Đăng kí </h3></div>
            <div id="modal-body" class="modal-body">
                <div v-if="modalLoading" class="container">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        @include('upcoworkingspace::includes.loading')
                    </div>
                </div>
                <div v-else="modalLoading" class="container">
                    <div class="row" style="padding: 10px">
                        <select v-on:change="changeProvince"
                                v-model="provinceId"
                                placeholder="Tỉnh/Thành phố"
                                class="form-control">
                            <option value="" selected>Tỉnh, Thành phố</option>
                            <option v-for="province in provinces" v-bind:value="province.id">
                                @{{province.name}}
                            </option>
                        </select>
                    </div>
                    <div v-if="provinceId" class="row" style="padding: 10px">
                        <div v-if="baseLoading" style="text-align: center;width: 100%;;padding: 15px;">
                            @include('upcoworkingspace::includes.loading')
                        </div>
                        <select v-else="baseLoading"
                                v-model="baseId"
                                placeholder="Cơ sở"
                                class="form-control">
                            <option value="" selected>Cơ sở</option>
                            <option v-for="base in bases" v-bind:value="base.id">
                                @{{base.name}}
                            </option>
                        </select>
                    </div>
                    <h3>Chọn gói thành viên</h3>
                    <div class="row">
                        <div v-for="userPack in userPacks" class="col-md-4">
                            <a>
                                <div v-on:click="pickSubscription(event, userPack.id)"
                                     class="card card-profile"
                                     v-bind:style="{'background-image': 'url('+userPack.avatar_url+')', 'padding-bottom': '70%', 'background-size': 'cover', 'background-position': 'center'}">
                                </div>
                                <h6>
                                    @{{ userPack.name }}
                                </h6>
                                <p>
                                    @{{ userPack.detail }}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="alert alert-danger" v-if="message"
                     style="margin-top: 10px"
                     id="purchase-error">
                    @{{ message }}
                </div>
            </div>
        </div>
    </div>
</div>
<div id="subscriptionModal" class="modal fade show">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h3 class="medium-title">Đăng kí </h3></div>
            <div id="modal-body" class="modal-body">
                <div class="container">
                    {{--<div class="col-md-12">--}}
                        {{--<img class="img-responsive img-rounded"--}}
                             {{--v-bind:src="userPack.avatar_url">--}}
                    {{--</div>--}}
                    <div class="row">
                        <button class="btn" v-for="subscription in userPack.subscriptions"
                                style="margin: 10px 10px 10px 0px !important; background-color: #c1c1c1; border-color: #c1c1c1"
                                v-on:click="subscriptionOnclick(event, subscription.id)"
                                v-bind:id="'subscription'+subscription.id">
                            @{{ subscription.subscription_kind_name }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@push('scripts')
    <script>
        var userPackModal = new Vue(
            {
                el: "#userPackModal",
                data: {
                    provinces: [],
                    bases: [],
                    userPacks: [],
                    provinceId: '',
                    baseId: '',
                    baseLoading: false,
                    provinceLoading: false,
                    userPackLoading: false,
                    modalLoading: false,
                    message: ''
                },
                methods: {
                    changeProvince: function () {
                        this.baseId = '';
                        this.getBases();
                    },
                    getProvinces: function () {
                        this.provinceLoading = true;
                        this.modalLoading = true;
                        axios.get(window.url + '/api/province')
                            .then(function (response) {
                                this.provinces = response.data.provinces;
                                this.provinceLoading = false;
                                if (this.userPackLoading === false)
                                    this.modalLoading = false;
                            }.bind(this))
                            .catch(function (reason) {
                            });
                    },
                    getUserPacks: function () {
                        this.userPackLoading = true;
                        this.modalLoading = true;
                        axios.get(window.url + '/api/user-packs')
                            .then(function (response) {
                                this.userPacks = response.data.data.user_packs;
                                this.userPackLoading = false;
                                if (this.provinceLoading === false)
                                    this.modalLoading = false;
                            }.bind(this))
                            .catch(function (reason) {
                            });
                    },
                    getBases: function () {
                        this.baseLoading = true;
                        axios.get(window.url + '/api/province/' + this.provinceId + '/base')
                            .then(function (response) {
                                this.bases = response.data.bases;
                                this.baseLoading = false;
                            }.bind(this))
                            .catch(function (reason) {
                            });
                    },
                    pickSubscription: function (event, userPackId) {
                        if (this.baseId === '') {
                            this.message = 'Xin bạn vui lòng chọn cơ sở';
                            return;
                        }
                        subscriptionModal.userPack = this.userPacks.filter(userPack => userPack.id === userPackId)[0];
                        subscriptionModal.base = this.bases.filter(base => base.id === this.baseId)[0];
                        subscriptionModal.subscriptionOnclick(event, subscriptionModal.userPack.subscriptions[0].id);


                        $("#userPackModal").modal("hide");
                        $("#subscriptionModal").modal("show");
                    }
                },
                mounted: function () {
                    this.getProvinces();
                    this.getUserPacks();
                }
            });
        var subscriptionModal = new Vue({
            el: '#subscriptionModal',
            data: {
                userPack: [],
                base: [],
                subscriptionId: 0,
            },
            methods: {
                subscriptionOnclick: function (event, subscriptionId) {
                    if(this.subscriptionId !== 0)
                        $('#subscription' + this.subscriptionId).css({'background-color': '#c1c1c1', 'border-color': '#c1c1c1'});
                    $('#subscription' + subscriptionId).css({'background-color': '#96d21f', 'border-color': '#96d21f'});
                    this.subscriptionId = subscriptionId;
                }
            }
        });
    </script>
@endpush
