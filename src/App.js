import { useEffect, useState } from 'react';
import NewCard from './component/NewCard';
import './App.css';
import axios from 'axios';
import PostItCard from './component/PostItCard';
import Button from 'react-bootstrap/Button';

const App = () => {

	const[modoInsercao, setModoInsercao] = useState(false);

	const[response, setResponse] = useState([]);

	useEffect(() => {
		getData();
	}, [])

	const getData = async () => {
		const response =  await axios.get('/canvas', {
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

	const salvaNota = async(nota) => {
		console.log("solicitou criacao de nota " , nota)
		await axios({
			method: 'post',
			url: '/canvas',
			data: nota,
			headers:{
					 'Content-Type' : 'application/json'
			}
		})
		getData()
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
		 	

			{response.map(canal => {
				return(
					<PostItCard canal={canal} deleteCanal={deleteCanal}/>
				)
			})}
    </div>
  );
}

export default App;
