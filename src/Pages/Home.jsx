import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ReactComponent as Email } from "../assets/Icons/Message.svg";
import { ReactComponent as Location } from "../assets/Icons/Location.svg";
import { ReactComponent as User } from "../assets/Icons/User.svg";
import { ReactComponent as Gist } from "../assets/Icons/Edit.svg";
import { ReactComponent as Message } from "../assets/Icons/Document.svg";
import { ReactComponent as RepoLink } from "../assets/Icons/external-link.svg";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Components/ErrorFallback";
import Pagination from "../Components/Pagination";
import Spinner from "../Components/Spinner";
// import {ReactComponent as Email} from "../assets/Icons/Email.svg";

function Home() {
  const [users, setUsers] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [repoPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
    getRepos();
  }, []);

  const api = "https://api.github.com";
  const token = process.env.REACT_APP_GIT_TOKEN;
  const location = useLocation();

  const getUser = async () => {
    const response = await fetch(`${api}/users/PreciousOritsedere`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  const getRepos = async () => {
    const response = await fetch(`${api}/users/PreciousOritsedere/repos`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await response.json();
    setRepos(data);
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const indexOfLastRepo = currPage * repoPerPage;
  const indexOfFirstRepo = indexOfLastRepo - repoPerPage;
  const currRepo = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  const numberOfPages = Math.ceil(repos.length / repoPerPage);

  return (
    <>
      {location.pathname === "/" ? (
        <div className="Container">
          <aside>
            <div className="asideContent">
              <div className="profileImg">
                <img src={users.avatar_url} alt="Profile" />
              </div>
              <h1>{users.name}</h1>
              <p className="bio">{users.bio}</p>
              <div className="email">
                <Email />
                <p>{users.email}</p>
              </div>
              <div className="location">
                <Location />
                <p>{users.location}</p>
              </div>
              <div className="Followers">
                <div>
                  <h3>Followers</h3>
                  <br></br> <p>{users.followers}</p>
                </div>

                <User />
              </div>
              <div className="Gists">
                <div>
                  <h3>Gist</h3>
                  <br></br> <p>{users.public_gists}</p>
                </div>

                <Gist />
              </div>
              <div className="publicRepo">
                <div>
                  <h3>Public Repo</h3>
                  <br></br> <p>{users.public_repos}</p>
                </div>

                <Message />
              </div>
            </div>
          </aside>

          <section className="bottom">
            <div className="Right">
              {currRepo.map((repo) => (
                <Link
                  to={`repo/${repo.name}`}
                  key={repo.name}
                  className="repoBox"
                >
                  <div>
                    <div className="repoIcon">
                      <div>
                        <h3>{repo.name}</h3>
                      </div>
                      <div>
                        <RepoLink />
                      </div>
                    </div>
                    <p>{repo.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mobilePagination">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Pagination
                  numberOfPages={numberOfPages}
                  currPage={currPage}
                  setCurrPage={setCurrPage}
                />
              </ErrorBoundary>
            </div>
          </section>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Home;
