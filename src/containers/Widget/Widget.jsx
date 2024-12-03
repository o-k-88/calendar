import React from 'react'
import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import PropTypes from 'prop-types'

import './Widget.scss'
const Widget = ({children}) => {
	return (
		<div className="g-widget">
			{children}
		</div>
	)
}

Widget.propTypes = {}
export default Widget
