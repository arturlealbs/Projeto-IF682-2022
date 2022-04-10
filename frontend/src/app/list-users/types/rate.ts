import User from "src/app/shared/types/User";
import Actions from './actions'


interface Rate {
    user?: User,
    action?: string
}

export default Rate