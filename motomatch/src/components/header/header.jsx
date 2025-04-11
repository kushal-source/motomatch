import './header.css'

function Header(){
    return(<>
        <section class="header">
     <div class="title">
        <h1>MotoMatch</h1>
        <p>Find the best bike for you</p>
     <nav className="navbar">
      <ul className='nav-links'>
        <li>
          <a href="#home">Home</a>
          </li>
        <li>
          <a href="#bike">Search Bike</a>
          </li>
        <li>
          <a href="#about">About Us </a>
          </li>
        <li>
          <a href="#contact">Contact Us</a>
          </li>
      </ul>
     </nav>
     </div>
    </section>
    </>)
}

export default Header;