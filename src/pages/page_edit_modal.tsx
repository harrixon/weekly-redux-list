import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { connect } from "react-redux";
// import { Dispatch } from "redux";
import { IRootState } from "../reducers/index";

// import { EditActions, editLink, remoteEditLink, unSelectLink } from "../actions/actions_edit_modal";
import { editLink, unSelectLink } from "../actions/actions_edit_modal";
import { remoteEditLink } from "../actions/actions_manage";

interface IEditModalProps {
    choosenLinkID: string,
    editModalOpen: boolean,
    editLinkEntry: string,
    unSelectLink: () => void,
    editLink: (editLinkEntry: string) => void,
    remoteEditLink: (choosenLinkID: string, editLinkEntry: string) => void,
}

class PureEditModal extends React.Component<IEditModalProps, {}> {
    constructor(props: IEditModalProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Modal isOpen={true} toggle={this.toggle} onClose={this.toggle} >
                    <ModalHeader>Edit Link (ID: {this.props.choosenLinkID}) {(this.props.editModalOpen)?"true":"false"}</ModalHeader>
                    <ModalBody>
                        <div className="input-group col-12">
                            <input value={this.props.editLinkEntry} onChange={this.onType} onKeyPress={this.onEnter} className="inputBox form-control col-12" type="text" placeholder="edit entry" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.confirmEdit}>Confirm</Button>
                        <Button color="secondary" onClick={this.toggle}>Discard</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    private onType = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editLink(e.target.value);
    }

    private confirmEdit = () => {
        this.props.remoteEditLink(this.props.choosenLinkID, this.props.editLinkEntry);
    }

    private onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { this.confirmEdit(); }
    }
    
    private toggle = () => {
        this.props.unSelectLink();
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        choosenLinkID: state.editModal.choosenLinkID,
        editModalOpen: state.editModal.editModalOpen,
        editLinkEntry: state.editModal.editLinkEntry,
    }
}

// const mapDispatchToProps = (dispatch: Dispatch<EditActions>) => {
const mapDispatchToProps = (dispatch: any) => {
    return {
        editLink: (editLinkEntry: string) => {
            dispatch(editLink(editLinkEntry));
        },
        remoteEditLink: (choosenLinkID: string, editLinkEntry: string, token: string) => {
            dispatch(remoteEditLink(choosenLinkID, editLinkEntry));
            dispatch(unSelectLink());
        },
        unSelectLink: () => {
            dispatch(unSelectLink());
        },
    }
}

export const EditModal = connect(mapStateToProps, mapDispatchToProps)(PureEditModal);