import React from 'react'
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
export default function Navbar() {
    return (
        <div className={classes.nav}>
        <Link to="/">
          <div className={classes.ms}>All MayMay</div>
        </Link>
        <Link to="/post">
          <div className={classes.ms}>Post New MayMay</div>
        </Link>
      </div>
    )
}