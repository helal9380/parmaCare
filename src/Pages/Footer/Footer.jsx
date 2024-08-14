/** @format */
import { Link } from "react-router-dom";
import logo from "../../assets/caduceus-medical-logo-design-vector-44577052.jpg";
const Footer = () => {
  return (
    <section className="bg-[#66BC89] text-white pt-10">
      <div className="text-center text-3xl font-semibold">
        <h2>Parma Care</h2>
      </div>
      <footer className="footer p-10">
      
      <aside>
        
       <img className="w-40 rounded-full" src={logo} alt="logo" />
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Menu</h6>
        <Link to={'/'} className="link link-hover">Home</Link>
        <Link to={'/login'} className="link link-hover">Login</Link>
        <Link to={'/register'} className="link link-hover">Register</Link>
      </nav>
    </footer>
    </section>
  );
};

export default Footer;
