import React from 'react';
import Card from 'react-bootstrap/Card';
import TypeBox from './TypeBox';


//The pokemon card on the main page
export default function PokemonCard(props){
	let cardStyle={
		width: '14rem'
	
	}
	
	return (
			<a className="no-decoration text-dark" onClick={()=>{props.onClick(props.pokemon)}} 
				>
				<Card style={cardStyle} className="pokemon-card text-center my-2">
					<Card.Header className="font-weight-bold" as="h5">{props.pokemon.name}</Card.Header>
					<Card.Img variant="top" 
						src={"images/sprites/"+props.pokemon.id+".png"} />
					<Card.Body>
						<Card.Title>
						
							{props.pokemon.types.map(pokemonType=>{
								
								return <TypeBox key={pokemonType} type={pokemonType} />
								
							})
								
							}
					

						</Card.Title>
						<Card.Subtitle className="mb-2">
							{props.pokemon.species}
						</Card.Subtitle>
						
			
					</Card.Body>
					
				</Card>
			</a>
	
	);

}