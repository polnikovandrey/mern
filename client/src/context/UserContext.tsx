import React, {createContext, useEffect, useState} from "react";
import Axios from "axios";
import domain from "../util/domain";

const UserContext: React.Context<any> = createContext(undefined);

function UserContextProvider(properties: any): JSX.Element {

	const [user, setUser] = useState(undefined);

	async function getUser() {
		const userResponse = await Axios.get(`${domain}/auth/loggedIn/`);
		setUser(userResponse.data);
	}

	useEffect(() => {
		getUser();
	}, []);

	return (
		<UserContext.Provider value={ { user, getUser } }>
			{properties.children}
		</UserContext.Provider>
	);
}

export { UserContextProvider };
export default UserContext;