
import React from 'react';
import Table from 'react-bootstrap/Table';

// All moves, including all HMs/TMs, of the Pokemon 
export default function MoveList(props){
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



