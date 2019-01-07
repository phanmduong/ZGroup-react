import GroupManageContainer from '../modules/groupManage/GroupManageContainer';
import GroupContainer from '../modules/groupDetailManage/GroupContainer';

/**
 * Tab Quản lý nhóm người
 */
export default [
	{
		path: '/group',
		component: GroupManageContainer
	},
	{
		path: '/group/group-detail/:clusterId',
		component: GroupContainer
	}
];
