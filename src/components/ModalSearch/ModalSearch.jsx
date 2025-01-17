import React, { useState } from "react";
import "./ModalSearch.scss";

import Modal from "../Modal/Modal";
import ModalWrapper from "../Modal/ModalWrapper";
import ModalHeader from "../Modal/ModalHeader";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalClose from "../Modal/ModalClose";
import InputSearch from "../InputSearch/InputSearch";

const ModalSearch = (props) => {
  const { handleClose, isOpen, data, children } = props;

  const [inputValue, setInputValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const updatedData = data.map((item) => {
    const curr = item.currentDate;
    const regex = /<time[^>]*>(\d+)<\/time>/;
    const matchData = curr.match(regex)[1];
    return {
      ...item,
      currentDate: new Date(Number(matchData) * 1000),
    };
  });

  console.log(updatedData);

  const handleSearchBtn = () => {
    if (inputValue !== "") {
      const filteredData = updatedData.filter(
        (item) =>
          item.title.toLowerCase().includes(inputValue) ||
          item.category.toLowerCase().includes(inputValue) ||
          item.description.toLowerCase().includes(inputValue)
      );
      setSearchedData(filteredData);
      setInputValue("");
    }
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <ModalWrapper isOpen={isOpen} handleClose={handleClose} isOutside>
      <Modal className={"modal-search"}>
        <ModalHeader>
          <ModalClose onClick={handleClose} />

          <InputSearch
            onChange={handleInputValue}
            placeholder="Search"
            type="text"
            value={inputValue}
          />
        </ModalHeader>
        <ModalBody>
          {searchedData.length > 0 &&
            searchedData.map((item, index) => (
              <div key={index} className="searched-item">
                <div className="searched-date">
                  <span>{item?.currentDate.toDateString()}</span>
                </div>
                <div className="searched-category">{item?.category}</div>
                <div className="searched-details">
                  <span className="searched-time">{item?.time} - </span>
                  <span className="searched-title">{item?.title}</span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: item?.description }} />
              </div>
            ))}
        </ModalBody>
        <ModalFooter
          textFirst={"Search"}
          clickFirst={handleSearchBtn}
          textSecondary={"Close"}
          clickSecondary={handleClose}
        ></ModalFooter>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalSearch;
