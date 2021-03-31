import { decodeToken, isExpired } from "react-jwt";
import { getAccessToken } from "./session"

const checkAccess = () =>{
	const acs = getAccessToken()
	const tknData = decodeToken(acs);
	const isExp = isExpired(acs);
	return({tknData, isExp})
}

export default checkAccess