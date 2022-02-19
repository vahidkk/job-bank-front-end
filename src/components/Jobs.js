import { useGlobalContext } from "../context/appContext";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import moment from "moment";
import JobColumns from "./JobColumns";
import { useLocation, useHistory } from "react-router-dom";

const Jobs = () => {
  const {
    jobs,
    user,
    userId,
    allJobs,
    isLoading,
    deleteJob,
    favorites,
    createFavorite,
    deleteFavorite,
  } = useGlobalContext();
  const location = useLocation();
  let navigate = useHistory();

  console.log("userid:", userId);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (
    (location.pathname == !"/" && jobs.length < 1) ||
    (location.pathname === "/" && allJobs.length < 1)
  ) {
    return (
      <EmptyContainer>
        <h5>
          Currently, you have no <span>JOBS </span>
          to display
        </h5>
      </EmptyContainer>
    );
  }
  let currentJobs = location.pathname === "/" ? allJobs : jobs;
  const allFavorites = favorites.map((i) => {
    return i.jobId;
  });

  return (
    <>
      <JobColumns />
      <Container>
        {currentJobs.map((item) => {
          const {
            _id: id,
            company,
            position,
            status,
            createdAt,
            createdBy,
          } = item;
          let date = moment(createdAt);
          date = date.format("MMMM Do, YYYY");
          return (
            <article key={id} className="job">
              <span className="icon">{company.charAt(0)}</span>
              <span className="position">{position.toLowerCase()}</span>
              <span className="company">{company}</span>
              <span className="date">{date}</span>
              <StatusContainer className="status" status={status}>
                {status === "under45k"
                  ? "< 45K"
                  : status === "between45k-70k"
                  ? "45K-70k"
                  : "> 70K"}
              </StatusContainer>
              <div className="action-div">
                {allFavorites.includes(id) ? (
                  <FaStar
                    className="favorite-btn"
                    onClick={() => deleteFavorite(id)}
                  />
                ) : (
                  <FaStar
                    className="not-favorite-btn"
                    onClick={() => {
                      userId ? createFavorite(id) : navigate.push("/register");
                    }}
                  />
                )}
                {console.log("createdBy: ", createdBy, " userId: ", userId)}
                {createdBy === userId && (
                  <>
                    <Link to={`/edit/${id}`} className="edit-btn" type="button">
                      <FaEdit />
                    </Link>

                    <button
                      className=" delete-btn"
                      type="button"
                      onClick={() => deleteJob(id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </Container>
    </>
  );
};
const EmptyContainer = styled.section`
  text-align: center;
  h5 {
    text-transform: none;
  }
  span {
    color: var(--primary-500);
  }
`;
const Container = styled.section`
  .job {
    background: var(--white);
    border-radius: var(--borderRadius);
    margin-bottom: 2rem;
    display: grid;
    padding: 2rem 0;
    justify-content: center;
    text-align: center;
  }
  .icon {
    background: var(--primary-500);
    display: block;
    border-radius: var(--borderRadius);
    color: var(--white);
    font-size: 2rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  span {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .position {
    font-weight: 600;
  }
  .date {
    color: var(--grey-500);
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    margin: 0.75rem auto;
    width: 100px;
  }
  .edit-btn {
    color: var(--green-dark);
    border-color: transparent;
    background: transparent !important;
    outline: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    display: inline-block;
    appearance: none;
  }
  .not-favorite-btn {
    color: var(--grey-400);
    border-color: transparent;
    background: transparent !important;
    outline: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    display: inline-block;
    appearance: none;
  }
  .favorite-btn {
    color: var(--golden-light);
    border-color: transparent;
    background: transparent !important;
    outline: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    display: inline-block;
    appearance: none;
  }
  .delete-btn {
    color: var(--red-dark);
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    background: transparent;
  }
  .edit-btn,
  .delete-btn {
    font-size: 1rem;
    line-height: 1.15;
    margin-bottom: -3px;
  }

  .action-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr;
    .icon {
      display: none;
    }
    background: var(--white);
    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);

    .job {
      border-radius: 0;
      justify-content: left;
      text-align: left;
      border-bottom: 1px solid var(--grey-200);
      grid-template-columns: 1fr 1fr 150px 100px 100px;
      align-items: center;
      padding: 1rem 1.5rem;
      column-gap: 1rem;
      margin-bottom: 0;
    }
    .job:last-child {
      border-bottom: none;
    }
    span {
      font-size: var(--small-text);
    }
    .company,
    .position {
      font-weight: 400;
      text-transform: capitalize;
    }
    .date {
      font-weight: 400;
      color: var(--grey-500);
    }

    .status {
      font-size: var(--smallText);
    }

    .action-div {
      margin-left: 1rem;
      justify-content: left;
    }
  }
`;
const setStatusColor = (status) => {
  if (status === "morethan70k") return "#0f5132";
  if (status === "under45k") return "#842029";
  return "#927238";
};
const setStatusBackground = (status) => {
  if (status === "morethan70k") return "#d1e7dd";
  if (status === "under45k") return "#f8d7da";
  return "#f7f3d7";
};

const StatusContainer = styled.span`
  border-radius: var(--borderRadius);
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  color: ${(props) => setStatusColor(props.status)};
  background: ${(props) => setStatusBackground(props.status)};
`;
export default Jobs;
