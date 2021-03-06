import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import regeneratorRuntime from "regenerator-runtime";
import Spinner from 'react-bootstrap/Spinner';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Stats from './Stats';
import TypeBox from './TypeBox';
import PokemonCard from './PokemonCard';
import MoveList from './MoveList';
import PokemonModal from './PokemonModal'
import PokemonCardDeck from './PokemonCardDeck';


//List of the National Dex ids and names of all the pokemon till the 2nd Generation
const nationalDexList={
			bulbasaur:1,
			ivysaur:2,
			venusaur:3,
			charmander:4,
			charmeleon:5,
			charizard:6,
			squirtle:7,
			wartortle:8,
			blastoise:9,
			caterpie:10,
			metapod:11,
			butterfree:12,
			weedle:13,
			kakuna:14,
			beedrill:15,
			pidgey:16,
			pidgeotto:17,
			pidgeot:18,
			rattata:19,
			raticate:20,
			spearow:21,
			fearow:22,
			ekans:23,
			arbok:24,
			pikachu:25,
			raichu:26,
			sandshrew:27,
			sandslash:28,
			"nidoran-f":29,
			nidorina:30,
			nidoqueen:31,
			"nidoran-m":32,
			nidorino:33,
			nidoking:34,
			clefairy:35,
			clefable:36,
			vulpix:37,
			ninetales:38,
			jigglypuff:39,
			wigglytuff:40,
			zubat:41,
			golbat:42,
			oddish:43,
			gloom:44,
			vileplume:45,
			paras:46,
			parasect:47,
			venonat:48,
			venomoth:49,
			diglett:50,
			dugtrio:51,
			meowth:52,
			persian:53,
			psyduck:54,
			golduck:55,
			mankey:56,
			primeape:57,
			growlithe:58,
			arcanine:59,
			poliwag:60,
			poliwhirl:61,
			poliwrath:62,
			abra:63,
			kadabra:64,
			alakazam:65,
			machop:66,
			machoke:67,
			machamp:68,
			bellsprout:69,
			weepinbell:70,
			victreebel:71,
			tentacool:72,
			tentacruel:73,
			geodude:74,
			graveler:75,
			golem:76,
			ponyta:77,
			rapidash:78,
			slowpoke:79,
			slowbro:80,
			magnemite:81,
			magneton:82,
			farfetchd:83,
			doduo:84,
			dodrio:85,
			seel:86,
			dewgong:87,
			grimer:88,
			muk:89,
			shellder:90,
			cloyster:91,
			gastly:92,
			haunter:93,
			gengar:94,
			onix:95,
			drowzee:96,
			hypno:97,
			krabby:98,
			kingler:99,
			voltorb:100,
			electrode:101,
			exeggcute:102,
			exeggutor:103,
			cubone:104,
			marowak:105,
			hitmonlee:106,
			hitmonchan:107,
			lickitung:108,
			koffing:109,
			weezing:110,
			rhyhorn:111,
			rhydon:112,
			chansey:113,
			tangela:114,
			kangaskhan:115,
			horsea:116,
			seadra:117,
			goldeen:118,
			seaking:119,
			staryu:120,
			starmie:121,
			mrmime:122,
			scyther:123,
			jynx:124,
			electabuzz:125,
			magmar:126,
			pinsir:127,
			tauros:128,
			magikarp:129,
			gyarados:130,
			lapras:131,
			ditto:132,
			eevee:133,
			vaporeon:134,
			jolteon:135,
			flareon:136,
			porygon:137,
			omanyte:138,
			omastar:139,
			kabuto:140,
			kabutops:141,
			aerodactyl:142,
			snorlax:143,
			articuno:144,
			zapdos:145,
			moltres:146,
			dratini:147,
			dragonair:148,
			dragonite:149,
			mewtwo:150,
			mew:151,
			chikorita:152,
			bayleef:153,
			meganium:154,
			cyndaquil:155,
			quilava:156,
			typhlosion:157,
			totodile:158,
			croconaw:159,
			feraligatr:160,
			sentret:161,
			furret:162,
			hoothoot:163,
			noctowl:164,
			ledyba:165,
			ledian:166,
			spinarak:167,
			ariados:168,
			crobat:169,
			chinchou:170,
			lanturn:171,
			pichu:172,
			cleffa:173,
			igglybuff:174,
			togepi:175,
			togetic:176,
			natu:177,
			xatu:178,
			mareep:179,
			flaaffy:180,
			ampharos:181,
			bellossom:182,
			marill:183,
			azumarill:184,
			sudowoodo:185,
			politoed:186,
			hoppip:187,
			skiploom:188,
			jumpluff:189,
			aipom:190,
			sunkern:191,
			sunflora:192,
			yanma:193,
			wooper:194,
			quagsire:195,
			espeon:196,
			umbreon:197,
			murkrow:198,
			slowking:199,
			misdreavus:200,
			unown:201,
			wobbuffet:202,
			girafarig:203,
			pineco:204,
			forretress:205,
			dunsparce:206,
			gligar:207,
			steelix:208,
			snubbull:209,
			granbull:210,
			qwilfish:211,
			scizor:212,
			shuckle:213,
			heracross:214,
			sneasel:215,
			teddiursa:216,
			ursaring:217,
			slugma:218,
			magcargo:219,
			swinub:220,
			piloswine:221,
			corsola:222,
			remoraid:223,
			octillery:224,
			delibird:225,
			mantine:226,
			skarmory:227,
			houndour:228,
			houndoom:229,
			kingdra:230,
			phanpy:231,
			donphan:232,
			porygon2:233,
			stantler:234,
			smeargle:235,
			tyrogue:236,
			hitmontop:237,
			smoochum:238,
			elekid:239,
			magby:240,
			miltank:241,
			blissey:242,
			raikou:243,
			entei:244,
			suicune:245,
			larvitar:246,
			pupitar:247,
			tyranitar:248,
			lugia:249,
			"ho-oh":250,
			celebi:251
		}



//The search form in the navigation bar. 
export default class PokemonForm extends React.Component{
	
	constructor(props){
		super(props);
		
		this.state={
			
			renderTooltip:false
		};
		
		this.handleFormChange=this.handleFormChange.bind(this);
		this.handleFormSubmit=this.handleFormSubmit.bind(this);
		
		this.target = React.createRef();
	}
	
	handleFormChange(e){
		
		this.setState({
			searchValue:e.target.value
		});
		
	}
	
	
	handleFormSubmit(e){
		
		
		e.preventDefault();														//The form submision is only handled on the browser. 
																				//Request to the server is disabled
		
		
		//If the entered pokemon couldnt be found, then show the tooltip
		//Else fetch the pokemon from the PokeApi
		if(nationalDexList[this.state.searchValue.toLowerCase()]==null){
			this.setState({
				renderTooltip:true
			});
			
		}
		else{
			this.setState({
				renderTooltip:false
			});
			console.log(this.state.searchValue);
			this.props.fetchPokemonByName(this.state.searchValue.toLowerCase());
		}
		
		
	}
	
		
	render(){
		
		return(
			<div>
			
				<Form ref={this.target} onSubmit={this.handleFormSubmit}>
								
					<Form.Control onChange={this.handleFormChange} type="text" placeholder="Search Pokemon" />
								
				</Form>
				<Overlay target={this.target.current} show={this.state.renderTooltip} placement="bottom">
					
					  <Tooltip id="overlay-example" >
						Please enter a valid Pokemon name
					  </Tooltip>
					
				</Overlay>
				
			</div>
		
		
		
		
		
		);
	}
	
	
}



//The main app component
class PokeDex extends React.Component{
	
	
	constructor(props){
		super(props);
		
		this.state={
			listOfPokemon:[],
			searchValue:"",
			resetButton:false
			
		};

	
		this.fetchPokemonList=this.fetchPokemonList.bind(this);
		this.handleLoadMore=this.handleLoadMore.bind(this);
		this.fetchPokemonByName=this.fetchPokemonByName.bind(this);
		this.handleReset=this.handleReset.bind(this);
		
		
	}

	
	
	
	
	
	//Fetch the pokemon from PokeApi using the pokemon name
	fetchPokemonByName(pokemonName){
		
		this.setState({
				listOfPokemon:[],
				resetButton:true

			},()=>this.fetchPokemonList(nationalDexList[pokemonName], 
			nationalDexList[pokemonName]+1));
		
		
		
		
	}
	
	//Fetch the pokemon from PokeApi using Pokemon id within the range defined by first and last arguments. 
	async fetchPokemonList(first, last){
		
		let pokemonList=this.state.listOfPokemon;
		this.setState({
			loading:true
		});
	
		for(let id=first;id<last;id++){
			let currentPokemon={};
			currentPokemon.MachineMoves={};
			currentPokemon.LearnedMoves={};
			
			//Fetch pokemon using the id
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
			
			//Evolution data is available at the pokemon-species end point
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
			let evolutionLine=[];
			let evolutionLine2=[];
			
			//The pokemon pictures are stored using IDs. However, evolutionChain object doesnt have any pokemonId property.
			//So the id is extracted from the urls using regex. 
			if(nationalDexList.hasOwnProperty(currentPokemonEvolution.species.name))
				evolutions.push([currentPokemonEvolution.species.url.slice(42).match(/[0-9]/g).join("")]);
		
			currentPokemonEvolution.evolves_to.forEach((firstEvolution)=>{
				if(nationalDexList.hasOwnProperty(firstEvolution.species.name))
					evolutionLine.push(firstEvolution.species.url.slice(42).match(/[0-9]/g).join(""));
					
				
				firstEvolution.evolves_to.forEach((secondEvolution)=>{
					
					if(nationalDexList.hasOwnProperty(secondEvolution.species.name))
						evolutionLine2.push(secondEvolution.species.url.slice(42).match(/[0-9]/g).join(""));

				});
				
			});
			
			// Only append to evolutionLine if the pokemon has any evolution
			if(evolutionLine.length!=0)
				evolutions.push(evolutionLine);
			if(evolutionLine2.length!=0)
				evolutions.push(evolutionLine2);
		
			
			currentPokemon.evolutions=evolutions;
	
			pokemonList.push(currentPokemon);
			
						
		}

		
		this.setState({
			listOfPokemon:pokemonList,
			loading:false
		});
	}
	
	//Handle the load more button. Fetch further 25 Pokemon
	handleLoadMore(){
		
		if(this.state.listOfPokemon.length>=239)
			this.fetchPokemonList(this.state.listOfPokemon.length+1, this.state.listOfPokemon.length+12);
		else if(this.state.listOfPokemon.length<239)
			this.fetchPokemonList(this.state.listOfPokemon.length+1, this.state.listOfPokemon.length+25);
	
	}
	
	//Hande the reset button. Returns to the main Pokemon card deck page
	handleReset(){
		this.setState({
			listOfPokemon:[],
			resetButton:false
			
		},()=>this.fetchPokemonList(1,25));
		
		
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
							
								<PokemonForm fetchPokemonByName={this.fetchPokemonByName}/>
						
							
							<Navbar.Text>
							The Pokemon Encyclopedia 
							</Navbar.Text>
						</Container>
				</Navbar>
				
				<Container className="my-3 py-3 px-5">
				
	
					<PokemonCardDeck pokemonList={this.state.listOfPokemon} />
					{
						/*Only show "load more button" when all the pokemon havent already been loaded*/
						(this.state.loading==false && this.state.listOfPokemon.length<251 && !this.state.resetButton) && 
						<div className="text-center">
							<Button variant="primary" onClick={this.handleLoadMore} >Load More Pokemon</Button>
						</div>
						
				
					}
					{
						/*Show the reset button after the searched Pokemon card is being shown*/
						(this.state.loading==false && this.state.resetButton) && 
						<div className="text-center">
							<Button variant="primary" onClick={this.handleReset} >Reset</Button>
						</div>
					}
					
					{
						/*When the pokemon are being fetched, show the loading circle*/
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
