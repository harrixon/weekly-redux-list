export interface ILink {
	id: number,
	linkText: string
}

export interface IAppState {
	display: ILink[],
	displayLength: number,
	items: ILink[],
	itemsLength: number,
	selectedItemID: any
}

export interface IModalProps {
	children: JSX.Element | JSX.Element[];
	onClose: () => void;
	confirmedEdit: (newLink: string) => void
};

export interface IModalState {
	entry: string
}

export interface ILink {
    id: number,
    linkText: string
}

export interface IAddState {
    display: ILink[],
    displayLength: number,
    items: ILink[],
    itemsLength: number
}

export interface IDisplayState {
    dataId: string
}

export interface IDisplayProp {
    itemEditProp: (id: string) => void,
    itemArrayProp: ILink[],
    itemIndexProp: number,
}