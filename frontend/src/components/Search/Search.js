import React from 'react';
import Input from '../Input/Input';

const Search = ({ prefix, setPrefix }) => {
	return (
		<Input
			value={ prefix }
			handleInput={ (val) => setPrefix(val.toLowerCase()) }
			placeholder="Search..."
			extraStyle="u-fw input--bgdark"
		/>
	);
};

export default Search;
