import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[14px] px-8 py-4 rounded-md font-semibold
        ${active ? "bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-white" : "bg-richblack-900 text-gray-300"}
        hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform
        border-2 ${active ? "border-transparent" : "border-gray-600"}`}
        
      >
        {children}
      </div>
    </Link>
  )
}

// Prop validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  linkto: PropTypes.string.isRequired
}

export default Button
