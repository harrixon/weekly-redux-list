import { Action, Dispatch } from "redux";
import axios from "axios";

interface ILink {
    id: number,
    link: string,
}

export const TYPE_LINK = "TYPE_LINK";
export type TYPE_LINK = typeof TYPE_LINK;
export interface ITypeLinkAction extends Action {
    type: TYPE_LINK,
    newLinkEntry: string,
}

export const SEARCH_LINK = "SEARCH_LINK";
export type SEARCH_LINK = typeof SEARCH_LINK;
export interface ISearchLinkAction extends Action {
    type: SEARCH_LINK,
    searchEntry: string,
}

export const REMOTE_FETCH_LINKS_SUCCESS = "REMOTE_FETCH_LINKS_SUCCESS";
export type REMOTE_FETCH_LINKS_SUCCESS = typeof REMOTE_FETCH_LINKS_SUCCESS;
export interface IRemoteFetchLinksSuccessAction extends Action {
    type: REMOTE_FETCH_LINKS_SUCCESS,
    LinksArray: ILink[],
}

export const REMOTE_FETCH_LINKS_FAIL = "REMOTE_FETCH_LINKS_FAIL";
export type REMOTE_FETCH_LINKS_FAIL = typeof REMOTE_FETCH_LINKS_FAIL;
export interface IRemoteFetchLinksFailAction extends Action {
    type: REMOTE_FETCH_LINKS_FAIL,
}

export const REMOTE_ADD_LINK_SUCCESS = "REMOTE_ADD_LINK_SUCCESS";
export type REMOTE_ADD_LINK_SUCCESS = typeof REMOTE_ADD_LINK_SUCCESS;
export interface IRemoteAddLinkSuccessAction extends Action {
    type: REMOTE_ADD_LINK_SUCCESS,
    LinksArray: ILink[],
}

export const REMOTE_ADD_LINK_FAIL = "REMOTE_ADD_LINK_FAIL";
export type REMOTE_ADD_LINK_FAIL = typeof REMOTE_ADD_LINK_FAIL;
export interface IRemoteAddLinkFailAction extends Action {
    type: REMOTE_ADD_LINK_FAIL,
}

export const REMOTE_EDIT_LINK_SUCCESS = "REMOTE_EDIT_LINK_SUCCESS";
export type REMOTE_EDIT_LINK_SUCCESS = typeof REMOTE_EDIT_LINK_SUCCESS;
export interface IRemoteEditLinkSuccessAction extends Action {
    type: REMOTE_EDIT_LINK_SUCCESS,
    LinksArray: ILink[],
}

export const REMOTE_EDIT_LINK_FAIL = "REMOTE_EDIT_LINK_FAIL";
export type REMOTE_EDIT_LINK_FAIL = typeof REMOTE_EDIT_LINK_FAIL;
export interface IRemoteEditLinkFailAction extends Action {
    type: REMOTE_EDIT_LINK_FAIL,
}

export type LinkActions =
    ITypeLinkAction |
    ISearchLinkAction |
    IRemoteFetchLinksSuccessAction |
    IRemoteFetchLinksFailAction |
    IRemoteAddLinkSuccessAction |
    IRemoteAddLinkFailAction |
    IRemoteEditLinkSuccessAction |
    IRemoteEditLinkFailAction;

export function typeLink(newLinkEntry: string): ITypeLinkAction {
    return {
        type: TYPE_LINK,
        newLinkEntry,
    }
}

export function searchLink(searchEntry: string): ISearchLinkAction {
    return {
        type: SEARCH_LINK,
        searchEntry,
    }
}

export function remoteFetchLinksSuccess(LinksArray: ILink[]): IRemoteFetchLinksSuccessAction {
    return {
        type: REMOTE_FETCH_LINKS_SUCCESS,
        LinksArray,
    }
}

export function remoteFetchLinksFail(): IRemoteFetchLinksFailAction {
    return {
        type: REMOTE_FETCH_LINKS_FAIL,
    }
}

export function remoteFetchLinks() {
    return (dispatch: Dispatch<IRemoteFetchLinksSuccessAction | IRemoteFetchLinksFailAction>) => {
        axios.post<ILink[]>("http://localhost:8080/api/fetchLinkArray", { token: localStorage.getItem("token") })
            .then((res: any) => {
                const LinksArray = res.data.map((e: ILink) => ({
                    id: e.id,
                    link: e.link,
                }));
                dispatch(remoteFetchLinksSuccess(LinksArray));
            })
            .catch((err: any) => {
                dispatch(remoteFetchLinksFail());
            });
    };
}

export function remoteAddLinkSuccess(LinksArray: ILink[]): IRemoteAddLinkSuccessAction {
    return {
        type: REMOTE_ADD_LINK_SUCCESS,
        LinksArray,
    }
}

export function remoteAddLinkFail(): IRemoteAddLinkFailAction {
    return {
        type: REMOTE_ADD_LINK_FAIL,
    }
}

export function remoteAddLink(newLinkEntry: string) {
    return (dispatch: Dispatch<IRemoteAddLinkSuccessAction | IRemoteAddLinkFailAction>) => {
        const data = { newLinkEntry, token: localStorage.getItem("token") };
        axios.post("http://localhost:8080/api/addNewLink", data)
            .then((res: any) => {
                const LinksArray = res.data.map((e: ILink) => ({
                    id: e.id,
                    link: e.link,
                }));
                dispatch(remoteAddLinkSuccess(LinksArray));
            })
            .catch((err: any) => {
                dispatch(remoteAddLinkFail());
            });
    };
}

export function remoteEditLinkSuccess(LinksArray: ILink[]): IRemoteEditLinkSuccessAction {
    return {
        type: REMOTE_EDIT_LINK_SUCCESS,
        LinksArray,
    }
}

export function remoteEditLinkFail(): IRemoteEditLinkFailAction {
    return {
        type: REMOTE_EDIT_LINK_FAIL,
    }
}

export function remoteEditLink(choosenLinkID: string, editLinkEntry: string) {
    return (dispatch: Dispatch<IRemoteEditLinkSuccessAction | IRemoteEditLinkFailAction>) => {
        const update = { choosenLinkID, editLinkEntry, token: localStorage.getItem("token") };
        axios.put<ILink[]>("http://localhost:8080/api/updateLink", update)
            .then((res: any) => {
                const LinksArray = res.data.map((e: ILink) => ({
                    id: e.id,
                    link: e.link,
                }));
                dispatch(remoteEditLinkSuccess(LinksArray));
            })
            .catch((err: any) => {
                dispatch(remoteEditLinkFail());
            });
    };
}

