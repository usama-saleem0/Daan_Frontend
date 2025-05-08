import React from 'react'
import { Link } from 'react-router-dom';

const BackButtons = () => {
    const currentuserData = JSON.parse(localStorage.getItem("currentuser"));

  return (
    <div className="add-back-batn">
      <Link to={`/chapter/${currentuserData?._id}`}>
        <svg enable-background="new 0 0 256 256" height="512" viewBox="0 0 256 256" width="512" xmlns="http://www.w3.org/2000/svg"><g id="_x34_8_Arrow_Left"><path d="m252.983 53v150c0 27.614-22.386 50-50 50h-149.966c-27.614 0-50-22.386-50-50v-150c0-27.614 22.386-50 50-50h149.965c27.615 0 50.001 22.386 50.001 50z" fill="#f39c12" /><g><path d="m201.622 136.625-71.95 21.9v13.5c0 10.625-12.225 16.5-20.5 10l-56.3-44.05c-6.325-4.925-6.525-14.475-.375-19.65 0 0 .175-.175.4-.35l56.275-44.025c8.325-6.475 20.5-.55 20.5 10v13.525l71.95 21.9c8.5 2.6 8.5 14.65 0 17.25z" fill="#fff" /></g></g></svg>
      </Link>
    </div>
  )
}

export default BackButtons