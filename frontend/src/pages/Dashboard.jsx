import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <div className="m-3">
        <AppBar />
        <Balance/>
        <Users />

    </div>
}