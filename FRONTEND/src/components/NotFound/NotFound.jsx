import React from 'react'
import { Link } from 'react-router-dom'

// NotFound component
const NotFound = () => {
  // Render the NotFound component
  return (
    <>
      <section className='page notfound'>
        <div className="content">
          {/* Image for the not-found page */}
          <img src="/notfound.png" alt="notfound" />
          {/* Link to return to the home page */}
          <Link to={'/'}>RETURN TO HOME PAGE</Link>
        </div>
      </section>
    </>
  )
}

export default NotFound
