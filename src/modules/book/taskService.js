export function moveAndCreateCard(instance, task, projectId, cardId) {

    const deleteCardPromise = instance.props.taskActions.deleteCard(cardId);

    let promiseArray = [deleteCardPromise];
    task.board_tasks.forEach((boardTask) => {
        const board = boardTask.board;
        const targetBoardId = board.id;

        const promise =
            instance.props.taskActions.createCard({
                ...instance.props.card,
                board_id: targetBoardId,
                task_list_id: task.task_list_id,
                id: null
            });

        promiseArray = [...promiseArray, promise];
    });
    instance.props.taskActions.toggleTaskStatus(task, instance.props.card);


    return new Promise((resolve) => {
        Promise.all(promiseArray)
            .then(() => {
                instance.props.taskActions.loadBoards(projectId)
                    .then(() => {
                        resolve("success");
                    });
            });
    });
}
