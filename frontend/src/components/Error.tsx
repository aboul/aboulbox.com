import React from "react";
import {
  ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import NotFoundPage from "../pages/NotFoundPage";
import InvalidPage from "../pages/InvalidPage";

const Error: React.FC = () => {
  const error = useRouteError() as ErrorResponse;
  if (isRouteErrorResponse(error) && error.status == 404) {
    return <NotFoundPage />;
  } else {
    return <InvalidPage />;
  }
};

export default Error;
