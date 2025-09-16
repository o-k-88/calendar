import React from "react";
import CreatableSelect from "react-select/creatable";
import cn from "classnames";

import "./SelectCustom.scss";

const SelectCustom = (props) => {
  const { data, className } = props;
  const options = data.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <CreatableSelect
      className={cn("date-picker-select", className)}
      classNamePrefix="date-picker"
      defaultValue={options[0]}
      options={options}
      isSearchable={data.length > 10}
      {...props}
    />
  );
};

export default SelectCustom;
