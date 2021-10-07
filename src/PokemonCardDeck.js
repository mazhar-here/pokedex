import React from 'react';
import axios from 'axios';
import CardDeck from 'react-bootstrap/CardDeck';
import PokemonCard from './PokemonCard';
import PokemonModal from './PokemonModal';

//The container for all the Pokemon cards
export default class PokemonCardDeck extends React.Component {
	
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
	
	//Close the Pokemon card and return to the Pokemon Deck
	handleClose(){
		this.setState({
			show:false
		});
		
		
	}
	
	//Show the pokemon Modal. 
	async handleShow(currentPokemon){
		this.setState({
			show:true,
			pokemon:currentPokemon
		});
		
		
		//Fetch the pokemon moves data. All the pokemon moves are only fetched when the Modal is shown
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
