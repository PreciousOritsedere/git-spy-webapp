import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ReactComponent as LeftArrow } from "../assets/Icons/LeftArrow.svg";
import { ReactComponent as Fork } from "../assets/Icons/Fork.svg";
import { ReactComponent as Language } from "../assets/Icons/Language.svg";
import { ReactComponent as Eye } from "../assets/Icons/Eye.svg";
import { ReactComponent as Folder } from "../assets/Icons/Folder.svg";
import { ReactComponent as Network } from "../assets/Icons/Network.svg";
import { ReactComponent as Subscribers } from "../assets/Icons/Subscribers.svg";
import { ReactComponent as Github } from "../assets/Icons/Github.svg";
import Spinner from "../Components/Spinner";

function RepoDetails() {
  const [repo, setRepo] = useState({});
  const [loading, setLoading] = useState(true);
  const { reponame } = useParams();

  useEffect(() => {
    getRepoDetails();
  }, [reponame]);

  const api = "https://api.github.com";
  const token = process.env.REACT_APP_GIT_TOKEN;

  const getRepoDetails = async () => {
    const response = await fetch(
      `${api}/repos/PreciousOritsedere/${reponame}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setRepo(data);
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Single Repo Details | Git Spy</title>
        <meta name="description" content="Here you can view the details of the repo you clicked on" />
        <link rel="canonical" href="/repodetails" />
      </Helmet>
      <div className="repoContainer">
        <Link to="/">
          <button className="back">
            <LeftArrow />
            <p> Back to Home </p>
          </button>
        </Link>
        <div className="proj_Name">
          <div className="repoDetails">
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <p> Visibility: {repo.visibility}</p>
            <p>Created @: {repo.created_at}</p>
          </div>
          <button className="back view">
            <a target="_blank" rel="noreferrer" href={repo.html_url}>
              <p>View on</p>
            </a>
            <Github />
          </button>
        </div>
        <h2 className="stats">Stats</h2>
        <div className="statsContainer">
          <div className="statsBox">
            <Fork />
            <p>
              {repo.forks} <span>Forks</span>
            </p>
          </div>
          <div className="statsBox">
            <Language />
            <p>{repo.language}</p>
          </div>
          <div className="statsBox">
            <Eye />
            <p>
              {repo.watchers} <span>view</span>
            </p>
          </div>
          <div className="statsBox">
            <Folder />
            <p>{repo.size} mb </p>
          </div>
          <div className="statsBox">
            <Network />
            <p>{repo.network_count} count </p>
          </div>
          <div className="statsBox">
            <Subscribers />
            <p>
              {repo.subscribers_count} <span>subs</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RepoDetails;
