import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';






let bulbasaur={
	id:1,
	name:"Bulbasaur",
	types:["Grass","Poison"],
	index:0,
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

let charmander={
	id:4,
	name:"Charmander",
	types:["Fire"],
	species:"Lizard Pokémon",
	index:1,
	height:"1'11.6",
	weight:"18.7 lbs",
	flavor:"The fire on the tip of its tail is a measure of its life. If healthy, its tail burns intensely.",
	hp:39,
	attack:52,
	defense:43,
	spAttack:60,
	spDefense:50,
	speed:65,
	evolutions:["Charmeleon","Charizard"],
	LearnedMoves:{0:"Scratch",0:"Growl",7:"Ember",13:"Smokescreen"},
	MachineMoves:{"TM01":"Dynamic Punch","TM02":"Headbutt","TM03":"Curse","TM06":"Toxic" }
}

let squirtle={
	id:7,
	name:"Squirtle",
	types:["Water"],
	index:2,
	species:"Tiny Turtle Pokémon",
	height:"1'7.7",
	weight:"19.8 lbs",
	flavor:"It shelters itself in its shell, then strikes back with spouts of water"+ 
			"at every opportunity.",
	hp:44,
	attack:48,
	defense:65,
	spAttack:50,
	spDefense:64,
	speed:43,
	evolutions:["Wartortle","Blastoise"],
	LearnedMoves:{0:"Tackle",0:"Tail Whip",7:"Bubble",10:"Withdraw"},
	MachineMoves:{"TM01":"Dynamic Punch","TM02":"Headbutt","TM03":"Curse","TM06":"Toxic" }
}	

let listOfPokemon=[bulbasaur,squirtle,charmander];

function Header(props){
	const { pokemon } = props; 
	return( <div className="text-center my-3" id="header"> 
				
				<h4 className="d-inline font-weight-bold">
					{pokemon.name}
				</h4>
				
				<div className="font-weight-bold text-secondary">
					{pokemon.types.toString()}
				</div>
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

function PokemonCard(props){
	return (
			<a className="pokemon-card" onClick={()=>{props.onClick(props.pokemon)}} 
				href="#" >
				<Card style={{ width: '13rem' }} className="text-center">
					<Card.Header as="h5">{props.pokemon.name}</Card.Header>
					<Card.Img variant="top" 
						src={"images/sprites/"+props.pokemon.id+".png"} />
					<Card.Body>
						<Card.Title>
							{props.pokemon.types.toString()}
						</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							{props.pokemon.species}
						</Card.Subtitle>
						
			
					</Card.Body>
					
				</Card>
			</a>
	
	);

}

class PokemonCardDeck extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state={
			show:false,
			pokemon:{}
			
		};
		
		this.handleClose=this.handleClose.bind(this);
		this.handleShow=this.handleShow.bind(this);
		
		
	}
	
	handleClose(){
		this.setState({
			show:false
		});
		
		
	}
	
	handleShow(currentPokemon){
		this.setState({
			show:true,
			pokemon:currentPokemon
		});
	
		
	}
	
	
	render(){
		return (
		
			<CardDeck>
				{this.props.pokemonList.map((pokemonData)=>{
					return(
						<PokemonCard onClick={this.handleShow} key={pokemonData.id} 
							pokemon={pokemonData} />
					);
					
				})}
				
				
			<PokemonModal show={this.state.show} 
				pokemon={this.state.pokemon} handleClose={this.handleClose} />
			</CardDeck>
		
		);
	}
	
}

function PokemonModal(props){
	return(
		
		<Modal show={props.show} onHide={props.handleClose} >
			
			<Modal.Body>
				<Container >
				
					
					<Header pokemon={props.pokemon} />
					<Row>
						<Col >
							<img src={"images/"+props.pokemon.id+".png"} width="200" />
						</Col>
						<Col className="py-5"  >
							{props.pokemon.flavor}
						</Col>
					</Row>
					<Stats pokemon={props.pokemon} />
					<div className="my-3">
						<div className="font-weight-bold my-3">Evolutionary Chain:</div>
						<EvolutionList evolutionList={props.pokemon.evolutions} />
					</div>
					
					<div className="font-weight-bold my-3">Moves:</div>
					<Row>
						
						<Col>
							<MoveList moveList={props.pokemon.LearnedMoves} moveType="Level" />
						</Col>
						<Col>
							<MoveList moveList={props.pokemon.MachineMoves} moveType="TM/HM" />
						</Col>
					</Row>
					
				
				</Container>
			</Modal.Body>
			
		
		</Modal>
			
	
	);
	
	
}



class PokeDex extends React.Component{
	
	// render(){
		// return( 
			
			// );
		
	// }
	
	render(){
		
		return(
			<Container className="border rounded shadow my-3 py-3 px-5">
				<PokemonCardDeck pokemonList={listOfPokemon} />
			</Container>
		);
	}
	
}





ReactDOM.render(<PokeDex />, document.getElementById('root'));
