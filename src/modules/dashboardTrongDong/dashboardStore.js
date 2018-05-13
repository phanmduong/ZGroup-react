import {observable, action, computed} from "mobx";
import {showErrorNotification} from "../../helpers/helper";
import * as dashboardApi from "./dashboardApi";

export default new class DashboardTrongDongStore {
    @observable isCreatingRegister = false;
    @observable isLoadingBases = false;
    @observable bases = [];
    @observable isLoadingCampaigns = false;
    @observable campaigns = [];
    @observable selectedBaseId = 0;
    @observable isLoadingRooms = false;
    @observable rooms = [];
    @observable selectedRoomId = 0;
    @observable isLoadingRoomTypes = false;
    @observable roomTypes = [];
    @observable selectedRoomTypeId = 0;
    @observable isLoading = false;
    @observable registerRooms = {};

    @action
    loadDashboard() {
        this.isLoading = true;
        dashboardApi
            .loadDashboard(this.selectedBaseId, this.selectedRoomTypeId, this.selectedRoomId)
            .then(res => {
                this.registerRooms = res.data.data.rooms;
                this.isLoading = false;
                // console.log(this.registerRooms,"store");
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }

    @action
    changeTime(registerRoomId = "", startTime = "", endTime = "") {
        dashboardApi
            .changeTime(registerRoomId, startTime, endTime)
            .then(() => {
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            });
    }

    @action
    changeStatus(registerId = "", status) {
        dashboardApi
            .changeStatus(registerId, status)
            .then(res => {
                this.registerRooms = this.registerRooms.map(room => {
                    const register_rooms = room.register_rooms.map(register => {
                        if (register.register_id == res.data.data.register.id) {
                            return {
                                ...register,
                                status: res.data.data.register.status
                            };
                        } else {
                            return {...register};
                        }
                    });
                    return {
                        ...room,
                        register_rooms: register_rooms
                    };
                });
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            });
    }

    @action
    loadBases() {
        this.isLoadingBases = true;
        dashboardApi
            .loadBases()
            .then(res => {
                this.bases = res.data.data.bases;
                this.isLoadingBases = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingBases = false;
            });
    }

    @action
    loadCampaigns() {
        this.isLoadingCampaigns = true;
        dashboardApi
            .loadCampaigns()
            .then(res => {
                this.campaigns = res.data.data.marketing_campaigns;
                this.isLoadingCampaigns = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingCampaigns = false;
            });
    }

    @action
    loadRooms() {
        this.isLoadingRooms = true;
        dashboardApi
            .loadRooms()
            .then(res => {
                this.rooms = res.data.data.rooms;
                this.isLoadingRooms = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingRooms = false;
            });
    }

    @action
    createRegister(register, closeModal) {
        this.isCreatingRegister = true;
        dashboardApi
            .storeRegister(register)
            .then(res => {
                this.isCreatingRegister = false;

                if (res.data.status == 1) {
                    closeModal();
                    if (register.register_id) {
                        this.registerRooms = this.registerRooms.map(room => {
                            const register_rooms = room.register_rooms.map(register => {
                                if (register.id == res.data.data.register_room.id) {
                                    return {
                                        ...register,
                                        ...res.data.data.register_room
                                    };
                                } else {
                                    return {...register};
                                }
                            });
                            return {
                                ...room,
                                register_rooms: register_rooms
                            };
                        });
                    } else {
                        this.registerRooms = this.registerRooms.map(room => {
                            if (room.id == res.data.data.register_room.room_id) {
                                return {
                                    ...room,
                                    register_rooms: [...room.register_rooms, res.data.data.register_room]
                                }
                            }
                            return {
                                ...room,
                            };
                        });
                    }
                } else {
                    showErrorNotification(res.data.message);
                }
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isCreatingRegister = false;
            });
    }

    @action
    loadRoomTypes() {
        this.isLoadingRoomTypes = true;
        dashboardApi
            .loadRoomTypes()
            .then(res => {
                this.roomTypes = res.data.data.room_types;
                this.isLoadingRoomTypes = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingRoomTypes = false;
            });
    }

    @computed
    get basesData() {
        let baseData = this.bases.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả"
            },
            ...baseData
        ];
    }

    @computed
    get roomTypesData() {
        let roomTypesData = this.roomTypes.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả"
            },
            ...roomTypesData
        ];
    }

    @computed
    get roomsData() {
        let rooms = this.rooms;
        if (this.selectedBaseId != 0) {
            rooms = rooms.filter(room => room.base_id == this.selectedBaseId);
        }
        if (this.selectedRoomTypeId != 0) {
            rooms = rooms.filter(room => room.room_type_id == this.selectedRoomTypeId);
        }
        rooms = rooms.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });

        return [
            {
                key: 0,
                value: "Tất cả"
            },
            ...rooms
        ];
    }

    @computed
    get campaignsData() {
        return this.campaigns.map(function (campaign) {
            return {
                ...campaign,
                value: campaign.id,
                label: campaign.name
            };
        });
    }
}();
