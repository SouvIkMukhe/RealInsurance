// Import necessary dependencies
import React from 'react'
import { Link } from 'react-router-dom'

// NotFound component
const NotFound = () => {
  return (
    <>
      {/* Not Found Page */}
      <section className='page notfound'>
        <div className="content">
          {/* Image for Not Found */}
          <img src="/notfound.png" alt="notfound" />

          {/* Link to Return to Home Page */}
          <Link to={'/'}>RETURN TO HOME PAGE</Link>
        </div>
      </section>
    </>
  )
}

export default NotFound;
