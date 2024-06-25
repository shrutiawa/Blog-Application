import "../style/header-footer.css"
import "../style/mobile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faEnvelope, faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faBell} from '@fortawesome/free-regular-svg-icons'
export let Footer = () => {
    return <div className="ref">
    <div className="footer-container">
        <div className="ref1">
            <img id="logo" src="../images/mainlogo.png" alt="Logo" />
            <section>
                <div id="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit perspiciatis aut
                    laudantium ipsum suscipit optio fugiat, inventore repellat culpa architecto, quis odit autem
                    praesentium asperiores!</div>
                <div id="subscribe">
                    <form id="sub">

                        <input id="email" type="email" required placeholder="Enter your email address" />
                        <button className="red-btn"><b>Subscribe</b></button>
                    </form>
                    <div className="text2">By subscribing you agree to our <u>Privacy Policy</u></div>
                </div>
            </section>
        </div>
        <hr color="grey" />
        <div className="ref2">
            <div className="ref2-heading">
                Recent post
                <div id="post">
                    <button className="red-btn"> <FontAwesomeIcon icon={faCircle} size="2xs" style={{color: "#f7f7f7",}} /> Business</button>
                    <div>Up-coming business bloggers, you need to watch</div>
                    <div>by Dennis - Apr 06,2022</div>
                </div>
                <div id="post">
                    <button className="red-btn"> <FontAwesomeIcon icon={faCircle} size="2xs" style={{color: "#f7f7f7",}} /> Marketing</button>
                    <div>How did we get here? The history of <br />the business told through tweets</div>
                    <div>by Larry - May 29,2022</div>
                </div>

            </div>
            <div className="ref2-heading">
                Navigation
                <div className="list">
                    <section>
                        <div>Features</div>
                        <div>Style Guide</div>
                        <div>Contact us</div>
                        <div>Get Theme</div>
                        <div>Support</div>
                        <div>Privacy Policy</div>
                        <div>Newsletter</div>
                    </section>
                    <section>
                        <div>News</div>
                        <div>Career <button className="red-btn">2 Job</button></div>
                        <div>Technology</div>
                        <div>Startups</div>
                        <div>Gadgets</div>
                        <div>Inspiration</div>
                    </section>
                </div>
            </div>
            <div className="ref2-heading">
                Get Regular updates
                <div className="list">
                    <section>
                        <div><FontAwesomeIcon icon={faWhatsapp} size="sm" style={{color: "#ffffff",}} /> Whatsapp</div>
                        <div><FontAwesomeIcon icon={faYoutube} size="sm" style={{color: "#ffffff",}} /> YouTube</div>
                        <div><FontAwesomeIcon icon={faBell} size="sm" style={{color: "#ffffff",}} /> Website Notifications
                        </div>
                        <div><FontAwesomeIcon icon={faEnvelope} size="sm" style={{color: "#ffffff",}} /> Newsletters</div>
                        <div><FontAwesomeIcon icon={faHeadphones} size="sm" style={{color: "#ffffff",}} /> Podcasts
                        </div>
                    </section>
                </div>
            </div>
            <div className="ref2-heading">
                Our mobile App
                <div>
                    Download our App and get the latest Breaking News Alerts and latest headlines and daily articles
                    near you.
                </div>
                <div>
                    <img src="images/appstore.png" alt="" />
                    <img src="images/googleplay.png" alt="" />
                </div>
            </div>
        </div>
        <div className="ref3">
            <div className="ref3-heading">Hot Topics</div>
            <div className="topics">
                <div>Covid-19</div>
                <div>Politics</div>
                <div>Entertainment</div>
                <div>Media</div>
                <div>Royalist</div>
                <div>World</div>
                <div>Half full</div>
                <div>Scouted</div>
                <div>Travel</div>
                <div>Beast Inside</div>
                <div>Crossword</div>
                <div>Newsletters</div>
                <div>Podcasts</div>
                <div>Auction 2022</div>
                <div>Protests</div>
                <div>News Cyber</div>
                <div>Education</div>
                <div>Sports</div>
                <div>Tech and Auto</div>
                <div>Option</div>
                <div>Share Market</div>
            </div>
        </div>
    </div>
    {/* <!-- Footer part --> */}
    <footer>
        <div id="footer">
            <div>&copy; 2023,Blogs. All Rights Reserved</div>
            <div id="footer1">
                <div>English Edition</div>
                <div>Terms</div>
                <div>Privacy</div>
                <div>Cookies</div>
            </div>
        </div>
    </footer>
</div>
}