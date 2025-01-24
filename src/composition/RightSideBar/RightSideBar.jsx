import React from "react";
import "./RightSideBar.scss";
import image from "./images/01month.jpg";

const RightSideBar = () => {
	return (
		<div className="right-sidebar">
			<div>
				<img className="right-sidebar-img" src={image} alt="alt"/>
			</div>
			<div>
				<h2 className="right-sidebar-title">Ongoing Events for the Month</h2>
				<ul className="right-sidebar-list">
					<li className="list-item">
						<a className="list-item-link" href="#">
							Spring Express Term Two - Registration period.
						</a>
					</li>
					<li className="list-item">
						<a className="list-item-link" href="#">
							Add/Drop period - Spring Full Term & Express Term One.
						</a>
					</li>
					<li className="list-item">
						<a className="list-item-link" href="#">
							Summer Full Term & Express Term One - Registration period.
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default RightSideBar;
