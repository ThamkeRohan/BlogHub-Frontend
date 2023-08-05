import useAuthContext from "../../hooks/useAuthContext";
import Navbar from "../navbar/Navbar";
import "./header.css"
import UserProfileBadge from "../userProfileBadge/UserProfileBadge";
import useUpdateAuthContext from "../../hooks/useUpdateAuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
export default function Header({ isHomePage }){
    const user = useAuthContext()
    const navigate = useNavigate()
    const { removeUser } = useUpdateAuthContext()
    function logout(){
      removeUser()
      navigate("/")
    }

    return (
      <header className="app-header">
        <div>
          <Link to="/">
            <h1 className="app-title">BlogHub</h1>
          </Link>
          <Navbar />
          {user && (
            <div className="profile-container">
              <UserProfileBadge avatarPath={user.avatarPath} name={user.name} />
              <button type="button" onClick={logout} className="action-btn logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>

        {isHomePage && (
          <div className="img-container">
            <img src="imgs/header.jpg" alt="header img" />
          </div>
        )}
      </header>
    );
}