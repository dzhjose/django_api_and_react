import React, { useEffect, useState } from "react";
import { Button, Segment, Grid, Header, Icon, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = (props) => {
	const [todos, setTodos] = useState([]);
	const [modal, setModal] = useState({ open: false, item: null });

	const getTodoList = async () => {
		try {
			const rs = await axios.get("http://127.0.0.1:8000/api/todos/");
			setTodos(rs.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const rs = await axios.delete(
				`http://127.0.0.1:8000/api/todos/${id}/`
			);
			setTimeout(() => {
				getTodoList();
				setModal({ open: false, item: null });
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTodoList();
	}, []);

	return (
		<>
			<Link to="/add-todo">
				<Button floated="right">Add Todo</Button>
			</Link>

			<Header as="h3" content="Todo list" />
			<Segment style={{ overflow: "auto", maxHeight: "50vh" }}>
				<Segment.Group>
					{todos.map((item) => {
						return (
							<Segment
								clearing
								key={item.id}
								key={item.id}
								style={{ marginTop: "12px" }}
							>
								<Grid columns={2} container divided stackable>
									<Grid.Row>
										<Grid.Column width={14}>
											<p>{item.title}</p>
											<p>{item.description}</p>
										</Grid.Column>
										<Grid.Column width={2}>
											<Link to={`/edit-todo/${item.id}`}>
												<Button floated="right" icon>
													<Icon name="edit outline" />
												</Button>
											</Link>
											<Button
												floated="right"
												icon
												onClick={() => {
													setModal({
														open: true,
														item: item,
													});
												}}
											>
												<Icon name="remove" />
											</Button>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Segment>
						);
					})}
				</Segment.Group>
			</Segment>
			<Modal
				size={"mini"}
				open={modal.open}
				onClose={() => setModal({ open: false, item: null })}
			>
				<Modal.Header>Delete Your Todo</Modal.Header>
				{modal.item != null ? (
					<Modal.Content>
						<p>Are you sure you want to delete your todo?</p>
						<p>Title: {modal.item.title}</p>
						<p>Description: {modal.item.description}</p>
						<p>
							Completed: {modal.item.completed ? "Yes" : "No"}
						</p>
					</Modal.Content>
				) : (
					<Modal.Content></Modal.Content>
				)}
				<Modal.Actions>
					<Button
						negative
						onClick={() =>
							setModal({ open: false, item: null })
						}
					>
						No
					</Button>
					<Button
						positive
						onClick={() => deleteTodo(modal.item.id)}
					>
						Yes
					</Button>
				</Modal.Actions>
			</Modal>
		</>
	);
};

export default Todo;
