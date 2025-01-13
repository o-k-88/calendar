import React from 'react'
import {Formik, Form, Field} from "formik";
import Button from "../../components/Button/Button.jsx"
import {object} from "prop-types";


export const FormCreateEvent = () => {
	return (
		<Formik
			initialValues={{type:"calendar_event"}}
			onSubmit={(values, actions) => {
				console.log(values);
				const newObject = {
					...values,
					field_start_date: new Date(`${values.field_start_date}T${values["start-time"]}:00`).toISOString(),
					field_end_date: new Date(`${values.field_end_date}T${values["end-time"]}:00`).toISOString(),
				}
				// "field_end_date":{"value":"2024-01-12T17:00:00Z"}
				const newData = Object.keys(newObject).map((key) => {
					if (key !== "end-time" && key !== "start-time") {
						return {
							[key]: {value: `${newObject[key]}`}
						}
					}
				})
				
				console.log(newData.reduce((acc, obj) => ({ ...acc, ...obj }), {}));
				
			}}
		>
			{() => (
				<Form>
					<input type="hidden" id="title" name="asdasdsa" value="calendar_event" />
					{/*<Field type="hidden" name="token" value="asflsfkasopkfpoaskfp"  />*/}
					<label>
						<p>Title</p>
						<Field type="text" id="title" name="title"/>
					</label>
					<label>
						<p>Description</p>
						<Field type="text" id="description" name="field_description"/>
					</label>
					<label>
						<p>Location</p>
						<Field type="text" id="location" name="field_location"/>
					</label>
					<label>
						<p>Category</p>
						<Field as="select" name="field_category">
							<option value="All Categories">All Categories</option>
							<option value="Work">Work</option>
							<option value="Personal">Personal</option>
							<option value="Family">Family</option>
							<option value="Friends">Friends</option>
						</Field>
					</label>
					
					<div className="date-time-group">
						<label>
							<p>Start Date</p>
							<Field type="date" id="start-date" name="field_start_date"/>
						</label>
						<label>
							<p>Time</p>
							<Field type="time" id="start-time" name="start-time"/>
						</label>
					</div>
					<hr/>
					<div className="date-time-group">
						<label>
							<p>End Date</p>
							<Field type="date" id="end-date" name="field_end_date"/>
						</label>
						<label>
							<p>Time</p>
							<Field type="time" id="end-time" name="end-time"/>
						</label>
					</div>
					<div>
						<Button type="submit">submit</Button>
					</div>
				</Form>
			)}
		</Formik>
	)
}
