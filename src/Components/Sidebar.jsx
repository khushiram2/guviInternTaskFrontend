import "../Styles/sidebar.css"
import { IoAddCircle } from "react-icons/io5";
import PropTypes from "prop-types"
export const Sidebar = ({handleShow}) => {
  return (
    <div className="sidebar">
        <div className="icon-container">
            <IoAddCircle onClick={handleShow}  />
        </div>
    </div>
  )
}

Sidebar.propTypes={
    handleShow:PropTypes.func.isRequired
}