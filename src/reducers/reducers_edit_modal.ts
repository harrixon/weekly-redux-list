import {
    EditActions,
    CHOOSE_LINK,
    UNSELECT_LINK,
    EDIT_LINK,
} from "../actions/actions_edit_modal";

export interface IEditModalState {
    choosenLinkID: string,
    editModalOpen: boolean,
    editLinkEntry: string,
}

const initialState = {
    choosenLinkID: "",
    editModalOpen: false,
    editLinkEntry: "",
}

export const editModalReducer = (state: IEditModalState = initialState, action: EditActions): IEditModalState => {
    switch (action.type) {
        case CHOOSE_LINK:
            {
                return { ...state, choosenLinkID: action.choosenLinkID, editModalOpen: true };
            }
        case UNSELECT_LINK:
            {
                return { ...state, choosenLinkID: "", editModalOpen: false, editLinkEntry: "" };
            }
        case EDIT_LINK:
            {
                return { ...state, editLinkEntry: action.editLinkEntry };
            }
        default:
            {
                return state;
            }
    }
}