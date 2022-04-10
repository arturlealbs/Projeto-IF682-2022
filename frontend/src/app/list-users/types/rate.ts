import User from "../types/User";
import Actions from './actions'


interface Rate {
    user?: User,
    action?: string
}

export default Rate