import React, { useState, useEffect } from 'react';
import FilterComponent from './filters/FilterComponent';

const FormFilters = ({filterList, setForm, formState}) => {
	const [filtersState, setFiltersComState] = useState({
		category: null,
		color: null,
		type: null,
	});

    useEffect(() => {
        setForm({...formState, ...filtersState});
    }, [filtersState]);

	const buildList = (arr) => {
		const ret =[];
		filterList.forEach(fil => {
			ret.push(<FilterComponent key={fil.code} {...fil} parSet={setFiltersComState} parState={filtersState} />);
		});

		return ret;
	}

	return(
		<div className="filtersContainer">
			{buildList()}
		</div>
	);

}

export default FormFilters;


