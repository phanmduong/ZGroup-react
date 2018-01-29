<div id="registerModal" class="modal fade show">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h3 class="medium-title">Đăng kí</h3></div>
            <div id="modal-body" class="modal-body">
                <div class="container">
                    <div class="row" style="padding: 10px">
                        <div v-if="provinceLoading" style="text-align: center;width: 100%;;padding: 15px;">
                            @include('upcoworkingspace::includes.loading')
                        </div>
                        <select v-else="provinceLoading"
                                v-on:change="changeProvince"
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
                    <div class="row">
                        <div class="col-md-4">
                            <a>
                                <div class="card card-profile"
                                     style="padding-bottom: 70%; background-size: cover; background-position: center; background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg')">

                                </div>
                                <h6>
                                    Thanh vien linh hoat
                                </h6>
                                <p>
                                    Sample description
                                </p>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a>
                                <div class="card card-profile"
                                     style="padding-bottom: 70%; background-size: cover; background-position: center; background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg')">

                                </div>
                                <h6>
                                    Thanh vien linh hoat
                                </h6>
                                <p>
                                    Sample description
                                </p>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a>
                                <div class="card card-profile"
                                     style="padding-bottom: 70%; background-size: cover; background-position: center; background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg')">
                                </div>
                                <h6>
                                    Thanh vien linh hoat
                                </h6>
                                <p>
                                    Sample description
                                </p>
                            </a>
                        </div>
                    </div>
                    <div class="row">

                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button id="btn-purchase" class="btn btn-sm btn-main"
                        style="margin: 10px 10px 10px 0px !important;">Đăng kí</i>
                </button>
            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        var registerModal = new Vue(
            {
                el: "#registerModal",
                data: {
                    provinces: [],
                    bases: [],
                    provinceId: '',
                    provinceLoading: false,
                    baseId: '',
                    baseLoading: false,
                },
                methods: {
                    changeProvince: function () {
                        this.baseId = '';
                        this.getBases();
                    },
                    getProvinces: function () {
                        this.provinceLoading = true;
                        axios.get(window.url + '/api/province')
                            .then(function (response) {
                                this.provinceLoading = false;
                                this.provinces = response.data.provinces;
                            }.bind(this))
                            .catch(function (reason) {
                            });
                    },
                    getBases: function () {
                        this.baseLoading = true;
                        axios.get(window.url + '/api/province/' + this.provinceId + '/base')
                            .then(function (response) {
                                this.baseLoading = false;
                                this.bases = response.data.bases;
                            }.bind(this))
                            .catch(function (reason) {
                            });
                    }
                },
                mounted: function () {
                    this.getProvinces();
                }
            })
    </script>
@endpush
