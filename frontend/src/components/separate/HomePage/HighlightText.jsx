// import React from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

const HighlightText = ({ text }) => {
  return (
    <span className='font-bold text-richblue-200 gradient_color'>
      {" "}
      {text}
    </span>
  );
};

// Add PropTypes validation for the 'text' prop
HighlightText.propTypes = {
  text: PropTypes.string.isRequired,  // Ensure 'text' is a string and is required
};

export default HighlightText;
