import { combineReducers } from 'redux';
import { homeReducer, IHomeState } from "./reducers_home";
import { manageLinkReducer, IManageLinkState } from "./reducers_manage";
import { editModalReducer, IEditModalState } from "./reducers_edit_modal";

export interface IRootState {
    home: IHomeState,
    manageLink: IManageLinkState,
    editModal: IEditModalState,
}

export const rootReducer = combineReducers<IRootState>({
    home: homeReducer,
    manageLink: manageLinkReducer,
    editModal: editModalReducer,
});

