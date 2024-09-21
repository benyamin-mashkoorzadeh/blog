import {Link} from "react-router-dom";

const navbar = () => {
  return (
      <nav>
          <section>
              <h1>وبلاگ شخصی</h1>

              <div className="navContent">
                  <div className="navLinks">
                      <Link to={'/'} style={{textDecoration: 'none'}}>صفحه اصلی</Link>
                      <Link to={'/users'} style={{textDecoration: 'none', marginRight: '10px'}}>نویسندگان</Link>
                  </div>
              </div>
          </section>
      </nav>
  )
}

export default navbar;