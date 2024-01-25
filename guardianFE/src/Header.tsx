import {Link} from 'react-router-dom'
function Header() {

  return (
    <>
    <header>
      <h1>DePaul Guardian</h1>
      <div className='NavBar'>
      <Link to="/">Home</Link>
      <Link to= "/apply">Apply</Link>
      <Link to="/about">About</Link>
      <Link to="/dashboard">Dashboard</Link>
      </div>
    </header>
    </>
  )
}

export default Header
