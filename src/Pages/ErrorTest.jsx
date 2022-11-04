import { ErrorBoundary } from "react-error-boundary";
import Pagination from "../Components/Pagination";
import ErrorFallback from "../Components/ErrorFallback";
import { Link } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/Icons/LeftArrow.svg";

function ErrorTest() {
  return (
    <>
      <Link to="/">
        <button className="back backTwo">
          <LeftArrow />
          <p> Back to Home </p>
        </button>
      </Link>
      <div className="errorContainer">
        <div className="errorBox">
          <h1>Test for Error Boundary</h1>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Pagination />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default ErrorTest;
