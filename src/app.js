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
import Button from 'react-bootstrap/Button'
import regeneratorRuntime from "regenerator-runtime";
import Spinner from 'react-bootstrap/Spinner';
import Navbar from 'react-bootstrap/Navbar';





function Header(props){
	const { pokemon } = props; 
	return( <div className="text-center my-3" id="header"> 
				
				<h4 className="d-inline font-weight-bold">
					{pokemon.name}
				</h4>
				
				<div className="font-weight-bold text-secondary">
					
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

function TypeBox(props){
	
	let listOfColors={
		fire: "ce6718",
		fighting: "d61b1b",
		normal: "6f8462",
		water: "1e70bc",
		grass:"258737",
		electric: "c8ce18",
		ice:"4cd3cc",
		flying:"c278c9",
		poison:"6f22a5",
		ground:"c4813a",
		psychic:"ea4881",
		dark:"2d272d",
		rock:"6b4620",
		bug:"698e2c",
		ghost:"7a6d9e",
		steel:"9e8ccc",
		dragon:"5435a3",
		fairy:"e896b3"

	}
		
	let boxStyle={
		
		backgroundColor:'#'+listOfColors[props.type],
		color:"white",
		padding:"6px 6px 6px 6px",
		borderRadius:"4px",
		display:"inline-block",
		width:"82px",
		textTransform:"uppercase",
		fontSize: "15px",
		fontWeight:"normal"

	}

	return <div className="mx-1" style={boxStyle} >{props.type}</div>	
	
	
}


function PokemonCard(props){
	let cardStyle={
		width: '14rem'
	
	}
	
	return (
			<a className="pokemon-card" onClick={()=>{props.onClick(props.pokemon)}} 
				>
				<Card style={cardStyle} className="text-center my-2">
					<Card.Header as="h5">{props.pokemon.name}</Card.Header>
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





class PokemonCardDeck extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state={
			show:false,
			pokemon:{
					
					evolutions:[]

			},
			loading:true
			
		};
		
		this.handleClose=this.handleClose.bind(this);
		this.handleShow=this.handleShow.bind(this);
		
		
	}
	
	handleClose(){
		this.setState({
			show:false
		});
		
		
	}
	
	async handleShow(currentPokemon){
		this.setState({
			show:true,
			pokemon:currentPokemon
		});
		
		let currentPokemonData=await axios.get("https://pokeapi.co/api/v2/pokemon/"+currentPokemon.name)
		
		for(let item of currentPokemonData.data.moves){
				
					item.version_group_details.map(async moveVersion=>{
						if(moveVersion.version_group.name=="gold-silver"){
							
							if(moveVersion.move_learn_method.name=="level-up"){
								currentPokemon.LearnedMoves[moveVersion.level_learned_at]=item.move.name;
							}
							
							
							if(moveVersion.move_learn_method.name=="machine"){
								let machineMove=await axios.get(item.move.url);
								
								
									machineMove.data.machines.map(async item=>{
									
									if(item.version_group.name=="gold-silver"){
										let machine=await axios.get(item.machine.url);
										currentPokemon.MachineMoves[machine.data.item.name]=machine.data.move.name;
										
										
										this.setState({
											
											pokemon:currentPokemon
										});
									
									}
									})	
									
							}

					}	
					
				})						
					
					
		}
		
	
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
		this.handleLoadMore=this.handleLoadMore.bind(this);
		
	}
	
	async fetchPokemonList(first, last){
		
		let pokemonList=this.state.listOfPokemon;
		this.setState({
			loading:true
		});
	
		for(let id=first;id<last;id++){
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
			
			if(currentPokemonEvolution.evolves_to.length==0){
				
				evolutions.push([currentPokemonEvolution.species.name]);
			}
			else{
			
				currentPokemonEvolution.evolves_to.forEach((firstEvolution)=>{
					let evolutionLine=[currentPokemonEvolution.species.name];
					evolutionLine.push(firstEvolution.species.name);
						
					firstEvolution.evolves_to.forEach((secondEvolution)=>{
						
						evolutionLine.push(secondEvolution.species.name);

					});
					
					evolutions.push(evolutionLine);
				});
			
			}
			
			currentPokemon.evolutions=evolutions;
	
			pokemonList.push(currentPokemon);
			
						
		}

		
		this.setState({
			listOfPokemon:pokemonList,
			loading:false
		});
	}
	
	handleLoadMore(){
		
		if(this.state.listOfPokemon.length>=239)
			this.fetchPokemonList(this.state.listOfPokemon.length+1, this.state.listOfPokemon.length+12);
		else if(this.state.listOfPokemon.length<239)
			this.fetchPokemonList(this.state.listOfPokemon.length+1, this.state.listOfPokemon.length+25);
			
		
		
	}

	
	componentDidMount( ){
		
		this.fetchPokemonList(1,25);
		
	}
	
	render(){
		
		return(
			
			<div>
				<Navbar sticky="top" bg="dark" variant="dark" expand="lg">
						<Container>
							<Navbar.Brand href="#">Pokedex</Navbar.Brand>
							<Navbar.Text>
							The Pokemon Encyclopedia 
							</Navbar.Text>
						</Container>
				</Navbar>
				
				<Container className="border rounded shadow my-3 py-3 px-5">
					
					<PokemonCardDeck pokemonList={this.state.listOfPokemon} />
					{
						(this.state.loading==false && this.state.listOfPokemon.length<251 ) && 
						<div className="text-center">
							<Button variant="primary" onClick={this.handleLoadMore} >Load More Pokemon</Button>
						</div>
					}
					
					{
						
						(this.state.loading==true) && 
						<div className="text-center">
							<Spinner animation="border" variant="primary">
							</Spinner>
						</div>
		
					}
					
		
				</Container>
			</div>
		);
	}
	
}


ReactDOM.render(<PokeDex />, document.getElementById('root'));
