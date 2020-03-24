import React from "react";
import "../assets/banner.css";

export interface BannerProps {
  loggedIn: boolean;
  firstName: string;
}

const Banner: React.FC<BannerProps> = ({ loggedIn, firstName }) => {
  var welcomeAddressee = "world";
  var loggedInClass = "";
  if (loggedIn) {
    welcomeAddressee = firstName;
    loggedInClass = "logged-in-class";
  }

  return (
    <React.Fragment>
      <div id="banner-container" className={loggedInClass}>
        <div id="edge-banner"></div>
        <div id="banner">
          <div className={"welcome-text "}>
            <div className="banner-title-text">
              <span
                className="play-font emphasis translu"
                style={{ fontSize: "72px", top: "20px" }}
              >
                &ldquo;
              </span>
              <span className="play-font">
                <span className="line">
                  Hello, <span className="blu">Vancouver</span>.&nbsp;
                </span>
                <span className="line"> Hello, {welcomeAddressee}!</span>
                <span
                  className="play-font emphasis translu"
                  style={{ fontSize: "72px", top: "20px" }}
                >
                  &rdquo;
                </span>
              </span>
            </div>
            <div className="banner-descr-text">
              Did someone say Silicon Valley? Hold on - the fastest growing tech
              hub is actually in Canada! Vancouver is a well-known hub for
              innovation and attracts some of the world’s top tech talent. Here
              on Vancity Tech, we want to inspire the Vancouver software
              development community by fostering an ecosystem for the Vancouver
              tech scene. Find posts written by top tech companies in the area!
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Banner;
