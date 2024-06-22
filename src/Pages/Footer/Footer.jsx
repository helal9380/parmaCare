/** @format */

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <aside>
       <img src="https://i.ibb.co/phTgwtM/download-1-removebg-preview.png" alt="logo" />
        <p className="font-semibold">
          Parma Care Ltd.
          <br />
          Providing reliable tech since 2024
        </p>
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
  );
};

export default Footer;
