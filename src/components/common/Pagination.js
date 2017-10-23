import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        let page = [];
        let currentPage = this.props.currentPage;
        let totalPages = this.props.totalPages;

        let startPage = (currentPage - 2 > 0 ? currentPage - 2 : 1);
        for (let i = startPage; i <= currentPage; i++) {
            page.push(i);
        }

        let endPage = (5 - page.length + currentPage >= totalPages ? totalPages : 5 - page.length + currentPage);

        for (let i = currentPage + 1; i <= endPage; i++) {
            page.push(i);
        }

        if (page && page.length < 5) {
            let pageData = [...page];
            for (let i = page[0] - 1; i >= (page[0] - (5 - page.length) > 0 ? page[0] - (5 - page.length) : 1); i--) {
                pageData = [i, ...pageData];
            }
            page = pageData;
        }

        return (
            <ul className="pagination pagination-info">

                <li className={(currentPage === 1) ? 'disabled' : ''}>
                    <a onClick={() => {
                        if (currentPage !== 1) this.props.loadDataPage(1);
                    }}> Đầu</a>
                </li>
                <li className={(currentPage - 1 <= 0) ? 'disabled' : ''}>
                    <a
                        onClick={() => {
                            if (currentPage - 1 > 0)
                                this.props.loadDataPage(currentPage - 1);
                        }}> Trước</a>
                </li>
                {
                    page.map((item) => {
                        if (Number(currentPage) === item) {
                            return (
                                <li key={item} className="active">
                                    <a>{item}</a>
                                </li>
                            );
                        } else {
                            return (
                                <li key={item}>
                                    <a onClick={() => this.props.loadDataPage(item)}>{item}</a>
                                </li>
                            );
                        }
                    })
                }
                <li className={(currentPage + 1 > totalPages) ? 'disabled' : ''}>
                    <a onClick={() => {
                        if (currentPage + 1 <= totalPages)
                            this.props.loadDataPage(currentPage + 1);
                    }}>Tiếp </a>
                </li>
                <li className={((currentPage === totalPages)) ? 'disabled' : ''}>
                    <a onClick={() => {
                        if (currentPage !== totalPages) this.props.loadDataPage(totalPages);
                    }}>Cuối </a>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    loadDataPage: PropTypes.func.isRequired,
};

export default Pagination;
