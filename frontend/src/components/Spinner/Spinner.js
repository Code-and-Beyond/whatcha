import React from 'react';


import { SpinnerCircularFixed } from 'spinners-react';

const Spinner = ({ loading }) => {
	return (
		loading ?
			<div className="spinner__container">
				<SpinnerCircularFixed size={ 40 } thickness={ 100 } color="#000000" speed={ 100 } enabled={ true } still={ false } />
			</div>
			:
			<div />
	);
};

export default Spinner;
