/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../../constants/actionTypes';
import * as boardApi from './boardApi';

export function archiveBoard(board) {
    return function (dispatch) {
        dispatch({
            type: types.ARCHIVE_BOARD_SUCCESS,
            board
        });
        boardApi.archiveBoard(board.id);
    };
}

export function unarchiveBoard(board) {
    return function (dispatch) {
        dispatch({
            type: types.UNARCHIVE_BOARD_SUCCESS,
            board
        });
        boardApi.unarchiveBoard(board.id);
    };
}

export function showArchiveBoardsModal(showModal) {
    return function (dispatch) {
        dispatch({
            type: types.SHOW_ARCHIVE_BOARDS_MODAL,
            showModal
        });
    };
}


export function loadArchiveBoards(projectId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ARCHIVE_BOARDS
        });
        boardApi.loadArchiveBoards(projectId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ARCHIVE_BOARDS_SUCCESS,
                    boards: res.data.data.boards
                });
            });
    };
}

