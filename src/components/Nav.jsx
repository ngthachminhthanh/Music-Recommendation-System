import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";

const Nav = ({
    libraryStatus,
    setLibraryStatus,
    listStatus,
    setListStatus,
    darkThemeHandler,
    back,
    setBack
}) => {
    const navigate = useNavigate();  
    const [checkManaging, setCheckManging] = useState(false)

    return (
        <nav>
            <h1>Waves</h1>

            { 
                checkManaging ? null : 
                <button
                    onClick={() => {
                        setLibraryStatus(!libraryStatus);
                        setListStatus(false);
                    }}
                    className={libraryStatus ? "active_library_btn" : ""}
                >
                    Library <FontAwesomeIcon icon={faMusic} />
                </button>
            }
            

            <button
                onClick={() => {
                    if (back) {
                        navigate("/manage");
                    } else {
                        navigate("/");
                    }
                    setCheckManging(!checkManaging);
                    setLibraryStatus(false);
                    setListStatus(false);
                    setBack(!back);
                }}
            >
                {
                    back ? "Add / Update / Delete Songs " : "Back to play music! "
                }
                <FontAwesomeIcon icon={faMusic} />
            </button>

            {
                checkManaging ? null : 
                <button
                    onClick={() => {
                        setListStatus(!listStatus);
                        setLibraryStatus(false);
                    }}
                    className={listStatus ? "active_list_btn" : ""}
                >
                    List <FontAwesomeIcon icon={faMusic} />
                </button>
            }

            <div className="switch" id="switch">
                <input
                    type="checkbox"
                    name="switch"
                    className="switch-checkbox"
                    id="myswitch"
                    onChange={darkThemeHandler}
                />
                <label className="switch-label" htmlFor="myswitch">
                    <span className="switch-inner"></span>
                    <span className="switch-switch"></span>
                </label>
            </div>
        </nav>
    );
};

export default memo(Nav);
