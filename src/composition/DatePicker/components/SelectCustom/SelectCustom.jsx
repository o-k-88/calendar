import React from "react";
import CreatableSelect from "react-select/creatable";
import cn from "classnames";

import { useGetCategories } from "../../../../hooks/useGetCategories.js";

import "./SelectCustom.scss";

const SelectCustom = (props) => {
  const categories = useGetCategories();

  const { className } = props;

  return (
    <CreatableSelect
      className={cn("date-picker-select", className)}
      classNamePrefix="date-picker"
      defaultValue={categories[0] || []}
      options={categories || []}
      isSearchable={categories.length > 10}
      {...props}
    />
  );
};

export default SelectCustom;
