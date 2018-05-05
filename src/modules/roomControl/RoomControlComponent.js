import React from 'react';
import FormInputSelect from '../../components/common/FormInputSelect';
import FormInputDate from '../../components/common/FormInputDate';
import PropTypes from 'prop-types';

export const MARITAL = [
    {
        id: 0,
        name: "Bình Ngô Đại Cáo",
    },
    {
        id: 1,
        name: "Thiên Trường Vãn Vọng",
    },
    {
        id: 2,
        name: "Xa Ngắm Thác Núi Lư",
    },
    {
        id: 3,
        name: "Bình Ngô Đại Cáo",
    },
    {
        id: 4,
        name: "Thiên Trường Vãn Vọng",
    },
    {
        id: 5,
        name: "Xa Ngắm Thác Núi Lư",
    },
];
class RoomControlComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            select_day:{},
            roomId: 1,
            rooms:[{id:1,name:"8 h - Room 1"},{id:2,name:" 9h - Room 2"},{id:3,name:"7h - Room 3"},{id:4,name:"6h - Room 4"}]
        };
        this.changeRoom = this.changeRoom.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }
    updateFormData(event){
        const field = event.target.name;
        let select_day = {...this.state.select_day};
        select_day[field] = event.target.value;
        this.setState({select_day: select_day});
    }
    changeRoom(value) {
        this.setState({ roomId: value });
    }
    render() {

        return (
            <div className="form-group">
                <form method="#" action="#">
                    <div className="row">
                        <div className="col-md-6">
                            <FormInputDate
                                name="name"
                                id="select_day"
                                label="Ngày chiếu"
                                value={this.state.select_day.name}
                                updateFormData={this.updateFormData}
                            />

                        </div>
                        <div className="col-md-6">
                            <FormInputSelect
                                label="Tên phim"
                                updateFormData=""
                                name="sms_template_type_id"
                                data={MARITAL}
                                value=""
                                required={true}
                            />
                        </div>

                    </div>
                    <ul className="nav nav-pills nav-pills-rose">
                        {this.state.rooms.map((room, index) => {
                            if (this.state.roomId === room.id) {
                                return (
                                    <li className="active">
                                        <a
                                            href={"#" + index}
                                            data-toggle="tab"
                                            aria-expanded="true"
                                            onClick={() =>
                                                this.changeRoom(room.id)
                                            }
                                        >
                                            {" "}
                                            {room.name}{" "}
                                        </a>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="">
                                        <a
                                            href={"#" + index}
                                            data-toggle="tab"
                                            aria-expanded="true"
                                            onClick={() =>
                                                this.changeRoom(room.id)
                                            }
                                        >
                                            {" "}
                                            {room.name}{" "}
                                        </a>
                                    </li>
                                );
                            }
                        })}
                    </ul><hr/>
                    <h1>{this.state.roomId}</h1>
                </form>
            </div>
        );
    }
}

RoomControlComponent.propTypes = {
    children: PropTypes.element
};
export default RoomControlComponent;