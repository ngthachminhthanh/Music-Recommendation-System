import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Nav = ({
    setShowNav,
    libraryStatus,
    setLibraryStatus,
    listStatus,
    setListStatus,
    darkThemeHandler,
    back,
    setBack
}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();  

    const handleNavigation = (path) => {
        setShowNav(false);
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    return (
        <nav>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <h1 style={{
                    fontSize: 34,
                    color: '#4501c4',
                    fontFamily: "Playwrite CU",
                }}>Waves</h1>
            </Link>

            {user ? (
                <div style={{display: 'flex'}}>
                    <label style={{
                        border: 'none',
                        color: 'black',
                        marginTop: 10,
                        padding: 10,
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: 10
                    }}>
                        <FaUserCircle style={{margin: 6}}/>
                        {user.username}
                    </label>
                    <button className="b3" style={{
                        padding: 10,
                        margin: 16
                    }} onClick={handleLogout}>
                        Đăng xuất
                    </button>
                </div>
            ) : (
                <div>
                    <button className="b3" style={{
                        border: 'none',
                        padding: 10,
                    }} onClick={() => handleNavigation('/login')}>
                        Đăng nhập
                    </button>
                    <button className="b3" style={{
                        padding: 10,
                        margin: 16
                    }} onClick={() => handleNavigation('/signup')}>
                        Đăng ký
                    </button>
                </div>
            )}
        </nav>
    );
};

export default memo(Nav);
