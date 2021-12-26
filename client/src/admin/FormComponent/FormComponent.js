import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormFilters from './FormFilters';

import "./FormComponent.css";

const filterList = [
	{
		code: "cat",
		name: "category",
		url: "http://localhost:7000/adm/category/list",
	},
	{
		code: "col",
		name: "color",
		url: "http://localhost:7000/adm/color/list",
	},
	{
		code: "typ",
		name: "type",
		url: "http://localhost:7000/adm/type/list",
	},
];

const send = () => {
    axios.post()
    .then( res => {
        
    })
    .catch(error => {
        
    });
};


const FormComponent = (props) => {
	const [formState, setFormState] = useState({});

	return(
		<div className="formFiltersContainer">
			<FormFilters filterList={filterList} setForm={setFormState} formState={formState}/>
			<button onClick={e => send()}>Submit</button>
			
		</div>
	);
}

export default FormComponent;
