import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import PacmanLoader from 'react-spinners/PacmanLoader'

import {FaUserPlus} from "react-icons/fa"
import {RiLogoutCircleRLine} from "react-icons/ri"
import {HiUsers} from "react-icons/hi"
import {BsCardChecklist} from "react-icons/bs"
import {VscNewFile} from "react-icons/vsc"


const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { 
    isLoading, 
    isSuccess, 
    isError, 
    error 
}] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");

  const onLogoutClicked = () => sendLogout(); // optional

   let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
      class="text-5xl text-yellow-300 hover:text-green-500 hover:scale-125"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <VscNewFile/>
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
      class="text-5xl text-yellow-300 hover:text-green-500 hover:scale-125"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FaUserPlus />
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button 
        class="text-5xl text-yellow-300 hover:text-green-500 hover:scale-125"
        title="Users" 
        onClick={onUsersClicked}>
          <HiUsers />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button
      class="text-5xl text-yellow-300 hover:text-green-500 hover:scale-125"
       title="Notes"
       onClick={onNotesClicked}
       >
        <BsCardChecklist />
      </button>
    );
  }

  const logoutButton = (
    <button
    class="text-5xl text-yellow-300 hover:text-green-500 hover:scale-125"
     title="Logout" 
     onClick={onLogoutClicked}
     >
      <RiLogoutCircleRLine />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent
    if (isLoading) {
      buttonContent = <PacmanLoader   color="#ed043a"
      loading
      size={49}
      speedMultiplier={-6}
    />
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      
      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 class="text-yellow-300 text-5xl py-2 mt-2 mx-2" >Spectrum Maintenance Menu📋</h1>
          </Link>
          <nav className="dash-header__nav">           
                {buttonContent}
          </nav>
        </div>
      </header>
      
    </>
    
  );

  return content;
  
};
export default DashHeader;