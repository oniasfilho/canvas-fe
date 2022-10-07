import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

const NewCard = (props) => {

	
	const canalPadrao = {
		id: 0,
		text_canais: ""
	}
	
	const [canal, setCanal] = useState(canalPadrao)
	
	const resetCanal = () => {
		setCanal(canalPadrao)
	}

	const handleCanalChange = (e) => {
		const {value, id} = e.target;
		
		setCanal(valorAntigo => {
			return {
				...valorAntigo,
				[id]: value
			}
		})
	} 

	const enviaNota = () => {
		props.salvaNota(canal);
		resetCanal()
	}

	return (
		<Card className='nota'>
				<Form.Control
					id={"id"}
          placeholder="Insira o id"
          aria-label="Id"
					value={canal.id}
					onChange={handleCanalChange}
					type={"number"}
        />

				<Form.Control
					id={"text_canais"}
          placeholder="Insira o texto"
          aria-label="text_canais"
					value={canal.text_canais}
					onChange={handleCanalChange}
        />

				<div className='button-wrapper'>
					<Button className="new-card-button" variant="primary" onClick={enviaNota}>add</Button>{' '}
					
					<Button className="new-card-button" variant="danger" onClick={props.cancelaNota}>
						cancel
					</Button>{' '}
				</div>
		</Card>
	)
}

export default NewCard