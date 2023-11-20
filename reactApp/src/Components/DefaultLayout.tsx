import { Navigate, Link, Outlet } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";

function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    const onLogOut = (ev: { preventDefault: () => void }) => {
        ev.preventDefault();
    };
    return (
        <div id="defaultLayout" /* id="defaultLayout" */>
            <aside>
                <Link to="/dashboard">DashBoard</Link>
                <Link to="/users">Users</Link>
                <Link to="/typetest">TypeTest</Link>
            </aside>
            <div className="content">
                <header>
                    <div>header</div>
                    <div>
                        {user?.name}
                        <a href="#" onClick={onLogOut} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;
