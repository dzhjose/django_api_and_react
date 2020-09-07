import React, { useState, useEffect } from "react";
import { Button, Segment, Grid, Header, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddTodo = (props) => {
	const [title, setTitle] = useState("");
	const [description, setDesc] = useState("");
    const [completed, setCompleted] = useState(false);
    
	useEffect(() => {
	}, []);
	// const validateInputs = () => {
	// 	if (title === "") {
	// 		return setErrorInput({ title: true });
	// 	}

	// 	if (description === "") {
	// 		return setErrorInput({ description: true });
	// 	}

	// 	return setErrorInput({ title: false, description: false });
    // };
    
    const resetData = () => {
        setTitle("");
        setDesc("");
        setCompleted(false);
    }

	const handleSubmit = async (e) => {
		const params = new FormData();
		params.append("title", title);
		params.append("description", description);
        params.append("Completed", completed);

        try {
            const rs = await axios.post('http://127.0.0.1:8000/api/todos/', params);
            if(rs.data.save){
                resetData();
            }
        } catch (error) {
            console.log(error);
        }
	};

	return (
		<>
			<Link to="/">
				<Button floated="right">Todo list</Button>
			</Link>

			<Header as="h3" content="Add Todo" />
			<Segment>
				<Grid columns={1} container stackable>
					<Grid.Row>
						<Grid.Column>
							<Form onSubmit={(e) => handleSubmit(e)}>
								<Form.Input
									fluid
									label="Title"
									placeholder="Title..."
									onChange={(e) => setTitle(e.target.value)}
									value={title}
								/>
								<Form.TextArea
									label="Description"
									placeholder="Description..."
									onChange={(e) => setDesc(e.target.value)}
									value={description}
								/>
								<Form.Checkbox
									label="Completed"
									onChange={() => setCompleted(!completed)}
								/>
								<Form.Button>Save</Form.Button>
							</Form>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</>
	);
};

export default AddTodo;
