import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({
    libraryStatus,
    setLibraryStatus,
    listStatus,
    setListStatus,
    darkThemeHandler,
}) => {
    return (
        <nav>
            <h1>Waves</h1>

            <button
                onClick={() => {
                    setLibraryStatus(!libraryStatus)
                    setListStatus(false)
                }}
                className={libraryStatus ? "active_library_btn" : ""}
            >
                Library <FontAwesomeIcon icon={faMusic} />
            </button>

            <button
                onClick={() => {
                    setListStatus(!listStatus)
                    setLibraryStatus(false)
                }}
                className={listStatus ? "active_list_btn" : ""}
            >
                List <FontAwesomeIcon icon={faMusic} />
            </button>

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
}

export default memo(Nav);