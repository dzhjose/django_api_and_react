import React from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import { Divider } from "semantic-ui-react";
import { Container, Header } from "semantic-ui-react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
const style = {
	h2: {
		marginTop: "2em",
		padding: "2em 0em",
	},
};

const App = () => {
	return (
		<Container>
			<Header
				as="h2"
				style={style.h2}
				content="Todo with Django rest framework"
			/>
			<Divider />
			<Router>
				<Switch>
					<Route path="/" exact>
						<Todo />
					</Route>
					<Route path="/add-todo">
						<AddTodo />
					</Route>
					<Route path="/edit-todo/:id">
						<EditTodo />
					</Route>
				</Switch>
			</Router>
		</Container>
	);
};

export default App;
