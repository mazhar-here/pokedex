import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stats from './Stats';
import MoveList from './MoveList';
import EvolutionChain from './EvolutionChain'

export default function PokemonModal(props){
	return(
		
		<Modal size="lg" show={props.show} onHide={props.handleClose} >
			
			<Modal.Body >
				<Container  >
				
					{/*Pokemon header with name, type and species*/}
					
						<i onClick={props.handleClose} className="close-button bi bi-x-lg"></i>
						<Header pokemon={props.pokemon} />
					
					{/*The image and flavor*/}
					<Row>
						<Col  >
							<img src={"images/"+props.pokemon.id+".png"} width="200" />
						</Col>
						<Col  className="py-5 "  >
							{props.pokemon.flavor}
							
						</Col>
					</Row>
					<Stats pokemon={props.pokemon} />
					<div className="my-3">
						<div className="font-weight-bold my-3">Evolutionary Chain:</div>
						<Row>
							{props.pokemon.evolutions.map((evolutionLine,index)=>{
								
							return(
								<Col key={index} className="evolutionListCol">
									{(index==props.pokemon.evolutions.length-1)&&
										<EvolutionChain renderArrow={false}  evolutionList={evolutionLine} />
									
									
									}
									{(index<props.pokemon.evolutions.length-1)&&
										<EvolutionChain renderArrow={true}  evolutionList={evolutionLine} />
									
									
									}
									
									
								
								</Col>
								);
							})}
						</Row>
						 
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