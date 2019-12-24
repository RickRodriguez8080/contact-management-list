import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
//import getState from "../store/flux";

export const UpdateContact = props => {
	// allows you to access store and action from flux.js
	const { store, actions } = useContext(Context);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	console.log("id", props.match.params.theid);
	console.log("UpdateContact: ", store.output);

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Update a contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							defaultValue={store.output[props.match.params.index].full_name}
							onChange={e => setName(e.target.value)}
							type="text"
							className="form-control"
							placeholder="Enter Name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							defaultValue={store.output[props.match.params.index].email}
							onChange={e => setEmail(e.target.value)}
							type="email"
							className="form-control"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							defaultValue={store.output[props.match.params.index].phone}
							onChange={e => setPhone(e.target.value)}
							type="phone"
							className="form-control"
							placeholder="Enter phone"
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							defaultValue={store.output[props.match.params.index].address}
							onChange={e => setAddress(e.target.value)}
							type="text"
							className="form-control"
							placeholder="Enter address"
						/>
					</div>
					<button
						onClick={() => actions.updateContact(props.match.params.theid, name, email, address, phone)}
						type="button"
						className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
UpdateContact.propTypes = {
	match: PropTypes.object
};
