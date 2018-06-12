import * as React from 'react';

import { connect } from "react-redux";
import { IRootState } from "../reducers/index";

import { remoteFetchLinks, typeLink, remoteAddLink, searchLink } from "../actions/actions_manage";
import { chooseLink } from "../actions/actions_edit_modal";
// ^ we are using reducers from other comp' to write to other's state

interface IManageProps {
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
    typeLink: (newLinkEntry: string) => void,
    searchLink: (searchEntry: string) => void,
    chooseLink: (choosenLinkID: string) => void,
    remoteFetchLinks: () => void,
    remoteAddLink: (newLinkEntry: string) => void,
}

class PureManage extends React.Component<IManageProps, {}> {
    constructor(props: IManageProps) {
        super(props);
    }

    public render() {
        return (
            <div className="App row no-gutters">
                <div className="input-group col-12">
                    <input value={this.props.newLinkEntry} onChange={this.onType} onKeyPress={this.onEnter} className="inputBox form-control col-10" type="text" placeholder="new entry" />
                    <input onClick={this.onAdd} type="button" value="ADD" className="btn btn-info col-2" />
                </div>
                <div className="input-group col-12">
                    <input value={this.props.searchEntry} onChange={this.onSearch} className="inputBox form-control col-10" type="text" placeholder="search" />
                    <input value="RELOAD" type="button" className="btn info col-2" onClick={this.remoteFetchLinks} />
                </div>
                <div className="display col-12">
                    <ul className="list list-group">
                        {
                            this.props.DisplayArray.map((e: any) => (
                                <li onClick={this.onChoose} key={e.id} data-id={e.id} className="list-group-item">{e.link}</li>))
                        }
                    </ul>
                </div>
            </div >
        )
    }

    /* DOCS: If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    render() will be called twice in this case, the user won’t see the intermediate state */
    public componentDidMount(){
        this.props.remoteFetchLinks();
    }

    private remoteFetchLinks = () => {
        this.props.remoteFetchLinks();
    }

    private onType = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.typeLink(e.target.value);
    }

    private onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.searchLink(e.target.value);
    }

    private onAdd = () => {
        if (this.props.newLinkEntry !== "") {
            this.props.remoteAddLink(this.props.newLinkEntry);
        }
    }

    private onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { this.onAdd(); }
    }

    private onChoose = (e: React.MouseEvent<HTMLLIElement>) => {
        const id = e.currentTarget.dataset.id;
        if (id !== undefined) {
            this.props.chooseLink(id);
        }
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        LinksArray: state.manageLink.LinksArray,
        DisplayArray: state.manageLink.DisplayArray,
        newLinkEntry: state.manageLink.newLinkEntry,
        searchEntry: state.manageLink.searchEntry,
        // v READ from other comp's state
        choosenLinkID: state.editModal.choosenLinkID,
        editModalOpen: state.editModal.editModalOpen,
    }
}

// const mapDispatchToProps = (dispatch: Dispatch<LinkActions>) => {
const mapDispatchToProps = (dispatch: any) => {
    return {
        typeLink: (newLinkEntry: string) => {
            dispatch(typeLink(newLinkEntry));
        },
        searchLink: (searchEntry: string) => {
            dispatch(searchLink(searchEntry));
        },
        chooseLink: (choosenLinkID: string) => {
            dispatch(chooseLink(choosenLinkID));
        },
        remoteFetchLinks: () => {
            dispatch(remoteFetchLinks());
        },
        remoteAddLink: (newLinkEntry: string) => {
            dispatch(remoteAddLink(newLinkEntry));
        },
    }
}

export const Manage = connect(mapStateToProps, mapDispatchToProps)(PureManage);