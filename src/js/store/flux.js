const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			output: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			loadContacts() {
				let url = "https://assets.breatheco.de/apis/fake/contact/agenda/downtown_xii";
				fetch(url)
					.then(response => response.json())
					.then(results => {
						// test to see that the contacts were fetched successfully
						//console.log("**loadContacts**", results);
						setStore({
							output: results
						});
					})
					.catch(e => console.error(e));
			}, // end loadContacts()

			addContact(name, email, address, phone) {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST", // or 'PUT'
					body: JSON.stringify({
						full_name: name,
						email: email,
						address: address,
						phone: phone,
						agenda_slug: "downtown_xii"
					}), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					//.then(response => console.log("addContact Success:", JSON.stringify(response)))
					.catch(error => console.error("Error:", error))

					.then(() => {
						getActions().loadContacts();
					});
			},

			updateContact(id, name, email, address, phone) {
				let url = "https://assets.breatheco.de/apis/fake/contact/";
				fetch(url + id, {
					method: "PUT", // or 'POST'
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						email: email,
						address: address,
						phone: phone,
						agenda_slug: "downtown_xii"
					}) // data can be `string` or {object}!
				}).then(() => {
					fetch(url + "agenda/downtown_xii")
						.then(response => response.json())
						.then(result => {
							console.log("UC results: ", result),
								setStore({
									output: result
								});
						});
				});
			}
		}
	};
};

export default getState;
