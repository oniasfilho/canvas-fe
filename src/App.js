import { useEffect, useState } from 'react';
import NewCard from './component/NewCard';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {

	const [modoInsercao, setModoInsercao] = useState(false);

	const [response, setResponse] = useState([]);

	useEffect(() => {
		getData();
	}, [])

	const getData = async () => {
		const response = await axios.get('/canvas', {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		setResponse(response.data)
	}

	const deleteCanal = async (id) => {
		await axios.delete(`/canvas/${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		getData();
	}

	const cancelaNota = () => {
		setModoInsercao(!modoInsercao);
	}

	const salvaNota = async (nota) => {
		console.log("solicitou criacao de nota ", nota)
		await axios({
			method: 'post',
			url: '/canvas',
			data: nota,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		getData()
	}

	const handleDragAndDrop = (e) => {
		const items = Array.from(response);
		const [reordenado] = items.splice(e.source.index, 1);
		items.splice(e.destination.index, 0, reordenado);

		setResponse(items)
	}

	return (
		<div className="App">

			<div className='addButton'>
				<Button variant="primary" onClick={() => {
					setModoInsercao(!modoInsercao)
				}}>
					adicionar nota
				</Button>
			</div>

			{modoInsercao ? <NewCard salvaNota={salvaNota} cancelaNota={cancelaNota} /> : null}

			<DragDropContext onDragEnd={handleDragAndDrop}>
				<Droppable droppableId='canais'>
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef}>
							{response.map((canal, index) => {
								return (
									<Draggable key={canal.id} draggableId={canal.id.toString()} index={index}>
										{(provided) => (
											<li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='nota'>
												<div className="deleteButtonWrapper">
													<Button className={"deleteButton"} variant={"danger"} onClick={() => {
														deleteCanal(canal.id)
													}}>
														<p>x</p>
													</Button>
												</div>
												<p> id: {canal.id}</p>
												<p> texto: {canal.text} </p>
											</li>
										)}
									</Draggable>
								)
							})}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default App;
