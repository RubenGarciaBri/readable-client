import { createSelector } from 'reselect';

const getAllNotificationIds = state => {
  return state.notifications.allIds;
};
const getAllNotifications = state => {
  return state.notifications.byId;
};

const getNotificationById = (state, stateId) => {
  return state.notifications.byId[stateId];
};

const getNotificationLoading = state => {
  return state.notifications.loading;
};

const getNotificationError = state => {
  return state.notifications.error;
};

export const getAllNotificationIdsSelector = () =>
  createSelector(
    state => getAllNotificationIds(state),
    allIds => allIds
  );

export const getAllNotificationsSelector = () =>
  createSelector(
    state => getAllNotifications(state),
    byId => byId
  );

export const getNotificationByIdSelector = stateId =>
  createSelector(
    state => getNotificationById(state, stateId),
    notification => notification
  );

export const getNotificationLoadingSelector = () =>
  createSelector(
    state => getNotificationLoading(state),
    loading => loading
  );

export const getNotificationErrorSelector = () =>
  createSelector(
    state => getNotificationError(state),
    error => error
  );
