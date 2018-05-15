/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../../constants/actionTypes';
import * as boardApi from './boardApi';
import {showErrorMessage} from "../../../helpers/helper";

export function archiveBoard(board) {
    return function (dispatch) {

        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        boardApi.archiveBoard(board.id)
            .then((res) => {
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
                if (res.data.status === 0) {
                    showErrorMessage("Không thể xoá", res.data.message);
                } else {
                    dispatch({
                        type: types.ARCHIVE_BOARD_SUCCESS,
                        board
                    });
                }

            });
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

