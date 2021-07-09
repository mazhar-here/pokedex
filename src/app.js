import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import axios from 'axios';
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
import regeneratorRuntime from "regenerator-runtime";




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
	
	
	return( <ListGroup className="my-3" horizontal> 
				{props.evolutionList.map((evolution)=>{
					return <ListGroup.Item key={evolution} variant="primary">
						{evolution}
					</ListGroup.Item>
					
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
				<Card  style={{ width: '13rem' }} className="text-center my-2">
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
			pokemon:{
					
					evolutions:[]
				
				
			}
			
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
						
						{props.pokemon.evolutions.map((evolutionLine,index)=>{
							
							 	
							return <EvolutionList key={index} evolutionList={evolutionLine} />
							
						})}
						 
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
	
	
	constructor(props){
		super(props);
		
		this.state={
			listOfPokemon:[]
			
		};
		
	
		this.fetchPokemonList=this.fetchPokemonList.bind(this);
		
	}
	
	async fetchPokemonList(){
		
		let pokemonList=[];
	
	
		for(let id=1;id<25;id++){
			let currentPokemon={};
			currentPokemon.MachineMoves={};
			currentPokemon.LearnedMoves={};
			
			let pokemon=await axios.get('https://pokeapi.co/api/v2/pokemon/'+id);
			
			currentPokemon.id=pokemon.data.id;
			currentPokemon.name=pokemon.data.name;
			currentPokemon.types=[];
			pokemon.data.types.map(item=>{
				currentPokemon.types.push(item.type.name);
				
			});
			currentPokemon.height=(pokemon.data.height*0.1).toFixed(2)+"m";
			currentPokemon.weight=(pokemon.data.weight*0.1).toFixed(2)+"kg";
			currentPokemon.hp=pokemon.data.stats[0].base_stat;
			currentPokemon.attack=pokemon.data.stats[1].base_stat;
			currentPokemon.defense=pokemon.data.stats[2].base_stat;
			currentPokemon.spAttack=pokemon.data.stats[3].base_stat;
			currentPokemon.spDefense=pokemon.data.stats[4].base_stat;
			currentPokemon.speed=pokemon.data.stats[5].base_stat;
			
			
			
				
			pokemon.data.moves.forEach((item)=>{
				item.version_group_details.forEach(async moveVersion=>{
					if(moveVersion.version_group.name=="gold-silver"){
						
						if(moveVersion.move_learn_method.name=="level-up"){
							currentPokemon.LearnedMoves[moveVersion.level_learned_at]=item.move.name;
						}
						
						
						if(moveVersion.move_learn_method.name=="machine"){
							let machineMove=await axios.get(item.move.url);
							// console.log(move.data);
							machineMove.data.machines.forEach(async item=>{
								
								if(item.version_group.name=="gold-silver"){
									let machine=await axios.get(item.machine.url);
									currentPokemon.MachineMoves[machine.data.item.name]=machine.data.move.name;
								}
								
								
							});
							
						}
					}
							
				});
			});
			
			
			let resp=await axios.get('https://pokeapi.co/api/v2/pokemon-species/'+id);
			
			let currentPokemonSpecies=resp.data;
			currentPokemon.species=currentPokemonSpecies.genera[7].genus;
			currentPokemonSpecies.flavor_text_entries.map((entry)=>{
				if(entry.version.name=="gold"){
					currentPokemon.flavor=entry.flavor_text;
				}
			});
			
			let resp2=await axios.get(currentPokemonSpecies.evolution_chain.url);
			let currentPokemonEvolution=resp2.data.chain;
			let evolutions=[];
			
			currentPokemonEvolution.evolves_to.forEach((firstEvolution)=>{
				let evolutionLine=[];
				evolutionLine.push(firstEvolution.species.name);
					
				firstEvolution.evolves_to.forEach((secondEvolution)=>{
					
					evolutionLine.push(secondEvolution.species.name);

				});
				
				evolutions.push(evolutionLine);
			});
			
			currentPokemon.evolutions=evolutions;
				
		
			
			
			// console.log(currentPokemon);
			pokemonList.push(currentPokemon);
			
						
		}

		this.setState({
			listOfPokemon:pokemonList
		});
	}

	
	componentDidMount( ){
		
		this.fetchPokemonList();
		
	}
	
	render(){
		
		return(
			<Container className="border rounded shadow my-3 py-3 px-5">
				<PokemonCardDeck pokemonList={this.state.listOfPokemon} />
			</Container>
		);
	}
	
}





ReactDOM.render(<PokeDex />, document.getElementById('root'));
