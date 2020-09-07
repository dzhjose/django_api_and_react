import React, { useState, useEffect } from "react";
import { Button, Segment, Grid, Header, Form } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EditTodo = (props) => {
	const [title, setTitle] = useState("");
	const [description, setDesc] = useState("");
    const [completed, setCompleted] = useState(false);

    const { id } = useParams();

    const getTodo = async () => {
        try {
            const rs = await axios.get(`http://127.0.0.1:8000/api/todos/${id}`);
            setTitle(rs.data.title);
            setDesc(rs.data.description);
            setCompleted(rs.data.completed);
        } catch (error) {
            console.log(error);
        }
    }
    
	useEffect(() => {
        getTodo();
    }, []);
    
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
            const rs = await axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, params);
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

			<Header as="h3" content="Edit Todo" />
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
									onChange={() => setCompleted(completed)}
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

export default EditTodo;
