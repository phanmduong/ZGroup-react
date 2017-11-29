export function moveAndCreateCard(instance) {
    const sourceBoardId = instance.props.task.current_board_id;
    let isMoved = false;
    let promiseArray = [];
    instance.props.task.board_tasks.forEach((boardTask) => {
        const board = boardTask.board;
        const targetBoardId = board.id;

        if (isMoved) {
            instance.props.taskActions.showGlobalLoading();
            const promise =
                instance.props.taskActions.createCard({
                    ...instance.props.card,
                    board_id: targetBoardId,
                    task_list_id: instance.props.task.task_list_id,
                    id: null
                });
            promiseArray = [...promiseArray, promise];
        } else {
            isMoved = true;
            instance.props.taskActions.toggleTaskStatus(instance.props.task, instance.props.card);
            instance.props.taskActions.moveCard(sourceBoardId, targetBoardId, instance.props.card.id);
        }

        Promise.all(promiseArray)
            .then(() => {
                instance.props.taskActions.hideGlobalLoading();
            });

    });
}