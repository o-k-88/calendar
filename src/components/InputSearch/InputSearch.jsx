import React from "react";
import "./InputSearch.scss";

const InputSearch = (props) => {
  const { onChange } = props;
  return <input className="inputSearch" onChange={onChange} type="text" {...props}></input>;
};

export default InputSearch;
