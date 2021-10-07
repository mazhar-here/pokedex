
import React from 'react';
// import ReactDOM from 'react-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';

//The stat progress bars in the Pokemon modal
export default function Stats(props){
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
