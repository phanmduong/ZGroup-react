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
    @observable registerRooms = [];

    @action
    loadDashboard(closeModal = null) {
        if (closeModal == null)
            this.isLoading = true;
        dashboardApi
            .loadDashboard(this.selectedBaseId, this.selectedRoomTypeId, this.selectedRoomId)
            .then(res => {
                this.registerRooms = res.data.data.rooms;
                this.isLoading = false;
                // console.log(this.registerRooms,"store");
                if (closeModal) {
                    closeModal();
                    this.isCreatingRegister = false;
                }
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }

    @action
    changeTime(registerId = "", startTime = "", endTime = "") {
        dashboardApi
            .changeTime(registerId, startTime, endTime)
            .then(() => {
                this.registerRooms = this.registerRooms.map(room => {
                    const register_rooms = room.register_rooms.map(register => {
                        if (register.register_id == registerId) {
                            return {
                                ...register,
                                start_time: startTime,
                                end_time: endTime,
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
    registerMergeRooms() {
        let registers = [];
        if (this.registerRooms) {
            let registersTemp = [];
            this.registerRooms.forEach((room) => {
                registersTemp = [...registersTemp, ...room.register_rooms];
            });

            registersTemp.forEach((register) => {
                if (registers.filter((item) => item.register_id == register.register_id).length <= 0) {
                    registers = [...registers, register];
                }
            })


        }
        return registers;
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


                if (res.data.status == 1) {

                    if (register.register_id) {
                        this.loadDashboard(closeModal);
                    } else {
                        this.isCreatingRegister = false;
                        closeModal();
                        this.registerRooms = this.registerRooms.map(room => {
                            let roomData = room;
                            res.data.data.register_rooms.map(register_room => {
                                if (room.id == register_room.room_id) {
                                    roomData = {
                                        ...room,
                                        register_rooms: [...room.register_rooms, register_room]
                                    };
                                }

                            });
                            return {
                                ...roomData,
                            };
                        });
                    }
                } else {
                    showErrorNotification(res.data.message);
                    this.isCreatingRegister = false;
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
                value: base.name,
                id: base.id
            };
        });

        return [
            {
                key: 0,
                value: "Tất cả phòng tại cơ sở"
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

    allRoomsSimilar(room) {
        //console.log(room);
        let rooms = this.rooms;
        if (this.selectedBaseId != 0) {
            rooms = rooms.filter(room => room.base_id == this.selectedBaseId);
        }

        if (room) {
            rooms = rooms.filter(roomItem => roomItem.id != room.id);
        }

        return rooms;
    }
}();
