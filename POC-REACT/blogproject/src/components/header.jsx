import "../style/header-footer.css"
import "../style/mobile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons'

import React ,{ useState }from "react"
import { HambergerComp } from "./hambergerComp"
import { Link } from "react-router-dom"
function Header(){
    const [isvisible,setisvisible] = useState(false);


    const hambegerclose =()=>{
        setisvisible(false);

    }
    return <div className="main-container">
    <header className="header">
        <Link to="/"><img id="logo" src="../images/headerlogo.png" alt="" /></Link>
        <div>
            <button className="red-btn"><b>Subscribe!</b></button>
            <button className="search-landing">
            <FontAwesaomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#000000",}} />
            </button>
            <button onClick={()=>setisvisible(true)} className="hamburger">
            <FontAwesomeIcon  icon={faBars} size="2xl" style={{color: "#000000",}} />
            </button>
        </div>
        
    </header>
        {isvisible && <HambergerComp isOpen={{isvisible}} handleClose={hambegerclose} />}
        
    </div>
}
export {Header}
