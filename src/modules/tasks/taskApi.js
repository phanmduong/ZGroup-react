/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';
import moment from "moment";
import {DATETIME_FORMAT} from "../../constants/constants";

export function loadArchiveCards(projectId, page = 1) {
    let url = env.MANAGE_API_URL + `/project/${projectId}/archive-cards?page=` + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function toggleArchive(card) {
    let url = env.MANAGE_API_URL + `/card/${card.good_id}/toggle-archive`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {status: card.status});
}

export function changeProjectSetting(project) {
    let url = env.MANAGE_API_URL + `/project/${project.id}/setting`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    const {canDragCard, canDragBoard, canEditTask} = project;
    return axios.put(url, {
        canDragCard,
        canDragBoard,
        canEditTask
    });
}

export function commentCard(value, cardId) {
    let url = env.MANAGE_API_URL + `/card/${cardId}/comment`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        comment_content: value
    });
}


export function toggleArchiveProject(project) {
    let url = env.MANAGE_API_URL + `/project/${project.id}/toggle-archive`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}


export function loadArchiveProjects(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/projects/archive?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&q=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}


export function loadProjects(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/projects?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&q=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadProject(projectId) {
    let url = env.MANAGE_API_URL + "/project/" + projectId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function createProject(project) {
    let url = env.MANAGE_API_URL + "/project/create";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, project);
}

export function deleteProject(project) {
    let url = env.MANAGE_API_URL + "/project/delete/" + project.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function changeProjectStatus(project, status) {
    let url = env.MANAGE_API_URL + "/project/status/" + project.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {status});
}

export function createBoard(board) {
    let url = env.MANAGE_API_URL + "/board/create";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, board);
}

export function loadBoards(projectId) {
    let url = env.MANAGE_API_URL + "/boards/" + projectId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function deleteCard(cardId) {
    let url = env.MANAGE_API_URL + `/card/${cardId}/delete`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function createCard(card) {
    let url = env.MANAGE_API_URL + "/card/create";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, card);
}

export function loadAvailableMembers(taskId) {
    let url = env.MANAGE_API_URL + `/task/${taskId}/available-members`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function updateCards(cards, boardId) {
    let url = env.MANAGE_API_URL + "/cards/update";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        board_id: boardId,
        cards: JSON.stringify(cards)
    });
}

export function updateBoards(boards) {
    let url = env.MANAGE_API_URL + "/boards/update";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        boards: JSON.stringify(boards)
    });
}

export function updateCard(card) {
    let url = env.MANAGE_API_URL + "/card/" + card.id + "/update";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, card);
}

export function updateCardTitle(card) {
    let url = env.MANAGE_API_URL + "/card/" + card.id + "/update-title";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, card);
}

export function updateCardDeadline(card) {
    let url = env.MANAGE_API_URL + "/card/" + card.id + "/deadline";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, card);
}


export function createTaskList(taskList) {
    let url = env.MANAGE_API_URL + "/tasklist/create";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, taskList);
}

export function createTaskListFromTemplate(taskListId, cardId) {
    let url = env.MANAGE_API_URL + "/tasklist-template/create";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        card_id: cardId,
        task_list_id: taskListId
    });
}

export function loadTaskLists(cardId) {
    let url = env.MANAGE_API_URL + "/tasklists/" + cardId;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function createTask(task) {
    let url = env.MANAGE_API_URL + "/task/create";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, task);
}


export function deleteTask(task) {
    let url = env.MANAGE_API_URL + "/task/" + task.id + "/delete";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}


export function toggleTaskStatus(task) {
    let url = env.MANAGE_API_URL + "/task/" + task.id + "/toggle";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function loadMembers(filter, cardId) {
    let url = env.MANAGE_API_URL + "/members/" + filter;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&card_id=" + cardId;
    return axios.get(url);
}

export function deleteTaskList(taskList) {
    let url = env.MANAGE_API_URL + "/tasklist/" + taskList.id + "/delete";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function toggleAssignMember(card, member) {
    let url = env.MANAGE_API_URL + "/card/" + card.id + "/user/" + member.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function toggleAssignProjectMember(project, member) {
    let url = env.MANAGE_API_URL + "/project/" + project.id + "/user/" + member.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function uploadFile(card, index = 0, file, completeHandler, progressHandler, error) {
    let url = env.MANAGE_API_URL + '/card/' + card.id + "/file";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let formData = new FormData();
    formData.append('file', file);
    formData.append('index', index);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formData);
}

export function addUrl(cardId, fileUrl) {
    let url = env.MANAGE_API_URL + "/card/" + cardId + "/url";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        url: fileUrl
    });
}

export function loadCardDetail(cardId) {
    let url = env.MANAGE_API_URL + "/card/" + cardId + "/detail";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function deleteFile(file) {
    let url = env.MANAGE_API_URL + "/card-file/" + file.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function createCardLabel(projectId, label) {
    let url = env.MANAGE_API_URL + `/project/${projectId}/create-label`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, label);
}

export function loadLabels(projectId) {
    let url = env.MANAGE_API_URL + `/project/${projectId}/labels`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function deleteCardLabel(labelId) {
    let url = env.MANAGE_API_URL + `/cardlabel/${labelId}`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function deleteCardComment(comment) {
    let url = env.MANAGE_API_URL + `/card-comment/${comment.id}`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function assignCardLabel(cardId, cardLabelId) {
    let url = env.MANAGE_API_URL + `/cardlabel/${cardLabelId}/card/${cardId}`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function loadCalendarEvents(userId) {
    let url = env.MANAGE_API_URL + `/user/${userId}/calendar-events`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadProjectMembers(filter, projectId) {
    let url = env.MANAGE_API_URL + "/project-members/" + filter;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&project_id=" + projectId;
    return axios.get(url);
}


export function loadProjectDetail(projectId) {
    let url = env.MANAGE_API_URL + "/project/" + projectId;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeProjectMemberRole(projectId, memberId, role) {
    let url = env.MANAGE_API_URL + `/project/${projectId}/member/${memberId}/role/${role}`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}

export function saveMemberTask(membersStr, taskId) {
    let url = env.MANAGE_API_URL + `/task/${taskId}/members`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {members: membersStr});
}

export function saveTaskDeadline(task) {
    let deadline = moment(task.deadline, DATETIME_FORMAT).format("YYYY-MM-DD HH:mm:ss");
    let url = env.MANAGE_API_URL + `/task/${task.id}/deadline`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.put(url, {deadline});
}

export function updateTasksOrder(tasks) {
    let url = env.MANAGE_API_URL + "/tasklist/update-tasks-order";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.put(url, {tasks: JSON.stringify(tasks)});
}


export function submitProjectPersonalSetting(projectId, setting) {
    let url = env.MANAGE_API_URL + `/project/${projectId}/personal-setting`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {setting});
}

export function loadProjectPersonalSetting(projectId) {
    let url = env.MANAGE_API_URL + `/project/${projectId}/personal-setting`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function saveTaskTitle(taskId, title) {
    let url = env.MANAGE_API_URL + `/task/${taskId}/title`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {title});
}

export function loadGoodPropertyItems(taskListId) {
    let url = env.MANAGE_API_URL + `/tasklist-templates/${taskListId}/items`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadTaskListTemplates(projectId) {
    let url = env.MANAGE_API_URL + `/tasklist-templates/${projectId}`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function barcodeNotEmpty(type = "book") {
    let url = env.MANAGE_API_URL + "/book/barcode/exist?type=" + type;
    const token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}




