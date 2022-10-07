import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {

	const[response, setResponse] = useState("");

	useEffect(() => {
		getData();
	}, [])
	

	const getData = async () => {
		const response =  await axios.get('https://random-data-api.com/api/v2/blood_types', 
			{ 
				params: { 
					"response_type": "json" ,
					"size": 3
				} 
			});

		setResponse(response.data)
	}

  return (
    <div className="App">
			{response.map(blood => {
				return(
					<div className='nota'>
						<h1> id: {blood.id}</h1>
						<h3> texto: {blood.group} </h3>
					</div>
				)
			})}

			<div className='nota'>
				
			</div>
    </div>
  );
}

export default App;
