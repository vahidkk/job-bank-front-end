import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useGlobalContext } from "../context/appContext";

const Navbar = ({ loginPage }) => {
  const { user, logout } = useGlobalContext();
  const [showLogout, setShowLogout] = useState(false);
  console.log(loginPage);
  return (
    <Wrapper p={loginPage}>
      {/* {console.log("p", loginPage)} */}
      <div className="nav-center">
        <h2 className="logo-type">Job Bank</h2>
        {user && (
          <div className="btn-container">
            <button className="btn" onClick={() => setShowLogout(!showLogout)}>
              <FaUserCircle />
              {user}
              <FaCaretDown />
            </button>
            <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
              <button onClick={() => logout()} className="dropdown-btn">
                logout
              </button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(p) =>
    p.p
      ? css`
          background-color: #645cff;
        `
      : css`
          background-image: linear-gradient(to right, #645cff, #e2e0ff);
        `}

  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo-type {
    padding-left: ${(p) => (p.p ? "0.2em" : "0.5em")};
    padding-top: ${(p) => (p.p ? "0" : "0.5em")};
    background: -webkit-radial-gradient(
      circle farthest-corner at center center,
      #fffeed 0%,
      #c1beff 100%
    );
    background: -moz-radial-gradient(
      circle farthest-corner at center center,
      #fffeed 0%,
      #c1beff 100%
    );
    background: radial-gradient(
      circle farthest-corner at center center,
      #fffeed 0%,
      #c1beff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--white);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    transition: var(--transition);
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
`;

export default Navbar;
