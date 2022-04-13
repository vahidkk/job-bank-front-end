import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/briefcase2.png";
import Navbar from "../components/Navbar";
import Jobs from "../components/Jobs";
import { useEffect } from "react";
import { useGlobalContext } from "../context/appContext";

function Home() {
  const { isLoading, showAlert, fetchAllJobs, userId, fetchAllFavorites } =
    useGlobalContext();

  useEffect(() => {
    fetchAllJobs();
    fetchAllFavorites();
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="container page">
          <div className="info">
            <h1>Looking for a job ? </h1>
            <h5>
              {!userId && "Register to "} make one of the available jobs as your
              favorite job
            </h5>
            <br />
            <h1>Got a free position ? </h1>
            <h5>
              {!userId && "Register to"} add/edit/delete a job position to our
              database
            </h5>
            <h5>
              {!userId ? (
                <Link to="/register" className="btn hero-btn">
                  Login / Register
                </Link>
              ) : (
                <Link to="/dashboard" className="btn hero-btn">
                  My Dashboard
                </Link>
              )}
            </h5>
          </div>
          <img src={main} alt="job " className="img main-img" />
        </div>
        <div className="jobs page">
          <Jobs />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
  }
  h1 {
    /* font-weight: 700; */
    font-size: calc(100% + 1vw + 1vh);
  }
  h5 {
    /* font-weight: 700; */
    font-size: calc(20% + 0.5vw + 1.5vh);
  }
  .main-img {
    display: none;
  }
  .jobs {
    margin-bottom: 10em;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 6rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Home;
