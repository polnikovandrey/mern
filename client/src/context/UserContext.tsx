import React, {createContext, useEffect, useState} from "react";
import Axios from "axios";

const UserContext: React.Context<any> = createContext(undefined);

function UserContextProvider(properties: any): JSX.Element {

	const [user, setUser] = useState(undefined);

	async function getUser() {
		const userResponse = await Axios.get("http://localhost:5000/auth/loggedIn/");
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