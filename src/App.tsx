
import * as React from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import './App.css';

import { Home } from "./pages/page_home";
import { Manage } from "./pages/page_manage";
import { EditModal } from "./pages/page_edit_modal";

import { connect } from 'react-redux';
import { IRootState } from "./reducers/index";
// import { PrivateRoute } from './privateRoute';

interface IAppProps {
	choosenLinkID: string,
	editModalOpen: boolean,
	isAuth: boolean,
}

class PureApp extends React.Component<IAppProps, {}> {
	constructor(props: IAppProps) {
		super(props);
	}

	public render() {
		return (
			<Router>
				<div>
					<div>
						<Link to="/" className="nav-tab">Home</Link>
						{
							(this.props.isAuth) ? <Link to="/manage" className="nav-tab">Manage</Link> : <div />
						}
					</div>
					<hr />
					{/* private route not working on modal */}
					{/* <Route path="/" exact={true} component={Home} /> */}
					{/* <PrivateRoute path="/manage" component={Manage} /> */}
					{/* {
						this.props.editModalOpen ? <PrivateRoute path="manage" component={EditModal} /> : <div/>
					} */}

					<Switch>
						<Route path="/" exact={true} component={Home} />
						{
							this.props.isAuth ? (
								<Route path="/manage" component={Manage} />
							) : (<Redirect to={{
								pathname: "/",
								state: this.state,
							}} />)
						}
						<Redirect to={{
							pathname: "/",
							state: this.state,
						}} />
					</Switch>
					{
						(this.props.editModalOpen && this.props.isAuth) ? (
							<Route path="/manage" component={EditModal} />
						) : (<div />)
					}
				</div>
			</Router>
		)
	}
}

const mapStateToProps = (state: IRootState) => {
	return {
		choosenLinkID: state.editModal.choosenLinkID,
		editModalOpen: state.editModal.editModalOpen,
		isAuth: state.home.isAuth,
	}
}

const App = connect(mapStateToProps)(PureApp);

export default App;