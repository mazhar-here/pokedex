import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import './styles/styles.css';


let bulbasaur={
	id:1,
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
	speed:45,
	evolutions:["Ivysaur","Venusaur"],
	LearnedMoves:{0:"Tackle",4:"Growl",7:"Leech Seed",10:"Vine Whip"},
	MachineMoves:{"TM02":"Headbutt","TM03":"Curse","TM06":"Toxic","TM10":"Hidden Power" }
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
		<div id="stats" className="my-3">
			Hp: <ProgressBar striped animated now={pokemon.hp/max*100} />
			Attack: <ProgressBar striped animated now={pokemon.attack/max*100} />
			Defense: <ProgressBar striped animated now={pokemon.defense/max*100} />
			Sp. Attack: <ProgressBar striped animated now={pokemon.spAttack/max*100} />
			Sp. Defense: <ProgressBar striped animated now={pokemon.spDefense/max*100} />
		</div>
	);
	
	
	
}

function EvolutionList(props){
	
	
	return( <ListGroup horizontal> 
				{props.evolutionList.map((evolution)=>{
					return <ListGroup.Item key={evolution} variant="primary">{evolution}</ListGroup.Item>
					
				})}
				
			</ListGroup>);	
	
	
	
	
}

function MoveList(props){
	return(
		<Table striped hover>
			<thead>
				<tr>
					<th>{props.moveType}</th>
					<th>Attack Name</th>
				</tr>
			</thead>
			<tbody>
				
				{Object.keys(props.moveList).map((move)=>{
					return( 
						<tr key={move}>
							<td>{move}</td>
							<td>{props.moveList[move]}</td>
							
						</tr>
					);	
							
				})}
				
				
			</tbody>
			
		</Table>
		
	
	);
	
}





class PokeDex extends React.Component{
	
	render(){
		return( 
			<Container className="border rounded my-3 py-3 px-5 shadow">
				<Header pokemon={bulbasaur} />
				<Row>
					<Col md={4} id="poke-image">
						<img src="images/1.png" width="200" />
					</Col>
					<Col md={8} className="border rounded pt-5" id="flavor">
						{bulbasaur.flavor}
					</Col>
				</Row>
				<Stats pokemon={bulbasaur} />
				<div className="my-3">
					<div className="font-weight-bold my-3">Evolutionary Chain:</div>
					<EvolutionList evolutionList={bulbasaur.evolutions} />
				</div>
				
				<div className="font-weight-bold my-3">Moves:</div>
				<Row>
					
					<Col>
						<MoveList moveList={bulbasaur.LearnedMoves} moveType="Level" />
					</Col>
					<Col>
						<MoveList moveList={bulbasaur.MachineMoves} moveType="TM/HM" />
					</Col>
				</Row>

			</Container>
			);
		
	}
	
}





ReactDOM.render(<PokeDex />, document.getElementById('root'));
