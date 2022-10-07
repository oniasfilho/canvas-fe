import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const PostItCard = ({canal, deleteCanal}) => {
	return (
		<Card key={canal.id} className='nota'>
			<div className="deleteButtonWrapper">
				<Button className={"deleteButton"} variant={"danger"} onClick={ () => {
					deleteCanal(canal.id)}}>
					<p>x</p>
				</Button>
			</div>
			<p> id: {canal.id}</p>
			<p> texto: {canal.text} </p>
			
		</Card>
		
			
		
	)
}

export default PostItCard