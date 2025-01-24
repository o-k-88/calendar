import React from "react";
import CreatableSelect from "react-select/creatable";

import "./SelectCustom.scss";

const SelectCustom = (props) => {
	const {data} = props;
	const options = data.map((item) => ({
		value: item,
		label: item,
	}));
	
	return (
		<CreatableSelect
			defaultValue={options[0]}
			options={options}
			isSearchable={data.length > 10}
			{...props}
		/>
	);
};

export default SelectCustom;
