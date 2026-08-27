import * as React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }} title="Page not found" />
      <main className="mx-auto max-w-2xl p-12 text-gray-900">
        <h1 className="mb-8 text-3xl font-bold">Page not found</h1>
        <p className="mb-8">
          Sorry{" "}
          <span role="img" aria-label="Pensive emoji">
            😔
          </span>{" "}
          we couldn’t find what you were looking for.
        </p>
        <p>
          <Link
            to="/"
            className="rounded-sm font-medium text-red-800 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-2"
          >
            Go home
          </Link>
        </p>
      </main>
    </>
  );
};

export default NotFoundPage;
