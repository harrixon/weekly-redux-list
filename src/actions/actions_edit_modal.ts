import { Action } from "redux";

export const CHOOSE_LINK = "CHOOSE_LINK";
export type CHOOSE_LINK = typeof CHOOSE_LINK;
export interface IChooseLinkAction extends Action {
    type: CHOOSE_LINK,
    choosenLinkID: string,
}

export const UNSELECT_LINK = "UNSELECT_LINK";
export type UNSELECT_LINK = typeof UNSELECT_LINK;
export interface IUnselectLinkAction extends Action {
    type: UNSELECT_LINK,
}

export const EDIT_LINK = "EDIT_LINK";
export type EDIT_LINK = typeof EDIT_LINK;
export interface IEditLinkAction extends Action {
    type: EDIT_LINK,
    editLinkEntry: string,
}

export type EditActions =
    IChooseLinkAction |
    IUnselectLinkAction |
    IEditLinkAction;

export function chooseLink(choosenLinkID: string): IChooseLinkAction {
    return {
        type: CHOOSE_LINK,
        choosenLinkID,
    }
}

export function unSelectLink(): IUnselectLinkAction {
    return {
        type: UNSELECT_LINK,
    }
}

export function editLink(editLinkEntry: string): IEditLinkAction {
    return {
        type: EDIT_LINK,
        editLinkEntry,
    }
}

