import React from 'react';
import TypeBox from './TypeBox';


//The header for the pokemon details modal
export default function Header(props){
	const { pokemon } = props; 
	return( <div className="text-center my-3" id="header"> 
				
				<h4 className="d-inline font-weight-bold">
					{pokemon.name}
				</h4>
				
				<div className="font-weight-bold text-secondary">
					
					{/*Return a Typebox component for all the types of this pokemon*/}   
					{pokemon.types.map(pokemonType=>{
						
						return <TypeBox key={pokemonType} type={pokemonType} />
						
					})
					
					}
					
				</div>
				<div className="font-weight-bold text-secondary">{pokemon.species}</div>
				<div className="font-weight-bold text-secondary">
					{pokemon.height}, {pokemon.weight}
				</div>
			</div>  );
	
}