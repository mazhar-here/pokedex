import React from 'react';


//Colored box component which contains the type of Pokemon
export default function TypeBox(props){
	
	
	//List of the colors of all the types in hex
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
	
	//CSS style object.  The reason for using object/inline CSS is 
	//to dynamically change the color w.r.t the type of Pokemon	
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
