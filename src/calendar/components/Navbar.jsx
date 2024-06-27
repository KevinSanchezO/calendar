import { useAuthStore } from "../../hooks"

/**
 * header bar which shows the user and an option to logout
 */
export const Navbar = () => {
    const {startLogOut, user} = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt">
            &nbsp; {/* separation */}
            {user.name}
            </i>
        </span>

        <button className="btn btn-outline-danger" onClick={startLogOut}>
            <i className="fas fa-sign-out-alt"></i>
            <span>
                Salir
            </span>
        </button>
    </div>
  )
}
