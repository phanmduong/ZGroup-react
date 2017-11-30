export function moveAndCreateCard(instance, task) {
    const sourceBoardId = task.current_board_id;
    let isMoved = false;
    let promiseArray = [];

    task.board_tasks.forEach((boardTask) => {
        const board = boardTask.board;
        const targetBoardId = board.id;

        if (isMoved) {

            const promise =
                instance.props.taskActions.createCard({
                    ...instance.props.card,
                    board_id: targetBoardId,
                    task_list_id: task.task_list_id,
                    id: null
                });
            promiseArray = [...promiseArray, promise];
        } else {
            isMoved = true;
            instance.props.taskActions.moveCard(sourceBoardId, targetBoardId, instance.props.card.id);
        }

    });
    instance.props.taskActions.toggleTaskStatus(task, instance.props.card);

    return new Promise((resolve) => {
        Promise.all(promiseArray)
            .then(() => {
                resolve("success");
            });
    });
}