import React from 'react';

//Construct the Pokemon evolution chain with all pictures and arrows
export default function EvolutionChain(props){
	
	return( <ul className="my-3 pl-0"> 
				{props.evolutionList.map((evolution,index)=>{
					return( 
					<li className="my-2 evolutionList"  key={evolution}>
						<div className="evolution ">
							<img className="w-100" src={"images/"+evolution+".png"}></img>
							
						</div>	
						{(props.renderArrow) &&
							<i className="bi bi-arrow-right pl-5 arrow"></i>

						}

					</li>
					
					);
					
				})}
				
			</ul>);	
	
	
}

