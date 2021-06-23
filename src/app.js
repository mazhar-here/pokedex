import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar'

import './styles/styles.css';


let bulbasaur={
	name:"Bulbasaur",
	type:"Grass",
	species:"Bulb Pokemon",
	height:"2'04",
	weight:"15.2 lbs",
	flavor:"It loves to bask in the sunlight. It uses the leaf on its head to seekout warm places",
	hp:45,
	attack:49,
	defense:49,
	spAttack:65,
	spDefense:65,
	speed:45
}



function Header(props){
	const { pokemon } = props; 
	return( <div className="text-center my-3" id="header"> 
				<img src={"images/"+pokemon.type+".png"} 
					alt={pokemon.typeAltText} width="35" />
				<h4 className="d-inline font-weight-bold">
					{pokemon.name}
				</h4>
				<div className="font-weight-bold text-secondary">{pokemon.species}</div>
				<div className="font-weight-bold text-secondary">
					{pokemon.height}, {pokemon.weight}
				</div>
			</div>  );
	
}

function Stats(props){
	const { pokemon } = props;
	const max=255;
	return(
		<div id="stats">
			Hp: <ProgressBar striped animated now={pokemon.hp/max*100} />
			Attack: <ProgressBar striped animated now={pokemon.attack/max*100} />
			Defense: <ProgressBar striped animated now={pokemon.defense/max*100} />
			Sp. Attack: <ProgressBar striped animated now={pokemon.spAttack/max*100} />
			Sp. Defense: <ProgressBar striped animated now={pokemon.spDefense/max*100} />
		</div>
	);
	
	
	
}





function Description(props){
	
	return  <div> 
				{props.pokemon.flavor}
			</div>
	
	
}

class PokeDex extends React.Component{
	
	render(){
		return( 
			<Container className="border rounded my-3 py-3 px-5 shadow">
				<Header pokemon={bulbasaur} />
				<div className="row">
					<div className="col-md-4 border rounded" id="poke-image">
						<img src="images/1.png" width="200" />
					</div>
					<div className="border rounded col-md-8 pt-5" id="flavor">
						{bulbasaur.flavor}
					</div>
				</div>
				<Stats pokemon={bulbasaur} />
			</Container>
			);
		
	}
	
}





ReactDOM.render(<PokeDex />, document.getElementById('root'));
