import {
    LinkActions,
    TYPE_LINK,
    SEARCH_LINK,
    REMOTE_FETCH_LINKS_SUCCESS,
    REMOTE_FETCH_LINKS_FAIL,
    REMOTE_ADD_LINK_SUCCESS,
    REMOTE_ADD_LINK_FAIL,
    REMOTE_EDIT_LINK_SUCCESS,
    REMOTE_EDIT_LINK_FAIL,
} from "../actions/actions_manage";
// import { IEditModalState } from "./reducers_edit_modal";

export interface IManageLinkState {
    LinksArray: Array<{
        id: number,
        link: string,
    }>,
    DisplayArray: Array<{
        id: number,
        link: string,
    }>,
    newLinkEntry: string,
    searchEntry: string,
    choosenLinkID: string,
    editModalOpen: boolean,
}

const initialState = {
    LinksArray: [],
    DisplayArray: [],
    newLinkEntry: "",
    searchEntry: "",
    choosenLinkID: "",
    editModalOpen: false,
}

export const manageLinkReducer = (state: IManageLinkState = initialState, action: LinkActions): IManageLinkState => {
    switch (action.type) {
        case TYPE_LINK:
            {
                return { ...state, newLinkEntry: action.newLinkEntry };
            }
        case SEARCH_LINK:
            {
                const filtered: any = [];
                state.LinksArray.forEach(e => {
                    if (e.link.search(action.searchEntry) !== -1) {
                        filtered.push(e);
                    }
                });
                return { ...state, searchEntry: action.searchEntry, DisplayArray: filtered };
            }
        case REMOTE_FETCH_LINKS_SUCCESS:
            {
                return { ...state, LinksArray: action.LinksArray, DisplayArray: action.LinksArray };
            }
        case REMOTE_FETCH_LINKS_FAIL:
            {
                return state;
            }
        case REMOTE_ADD_LINK_SUCCESS:
            {
                return { ...state, LinksArray: action.LinksArray, DisplayArray: action.LinksArray, newLinkEntry: "", };
            }
        case REMOTE_ADD_LINK_FAIL:
            {
                return state;
            }
        case REMOTE_EDIT_LINK_SUCCESS:
            {
                return { ...state, LinksArray: action.LinksArray, DisplayArray: action.LinksArray };
            }
        case REMOTE_EDIT_LINK_FAIL:
            {
                return state;
            }
        default:
            return state;
    }
}