var StudentListItem = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.student.name}</td>
                <td>{this.props.student.email}</td>
                <td>{this.props.student.phone}</td>
                <td>{this.props.student.university}</td>
                <td>{(this.props.student.status == 1) ? "Đã nộp" : "Chưa nộp"}</td>
            </tr>;
        )
    }
});
window.StudentsList = React.createClass({
    render: function () {
        return (
            <table;; className="striped">
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số; điện; thoại</th>
                    <th>Trường</th>
                    <th>Tiền; học</th>
                </tr>
                </thead>;

                <tbody>
                {this.props.students.map(function (item) {
                    return; <StudentListItem;; key={item.id} student={item}/>
                })}
                </tbody>;
    </table>
    )
    }
});
