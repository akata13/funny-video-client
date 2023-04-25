import React from "react";
import PropTypes from "prop-types";

const Forbidden = ({ location }) => (
  <div className="forbidden-page text-center">
    Your don't have access to URL <code>{location.pathname}</code>
  </div>
);

Forbidden.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Forbidden;
