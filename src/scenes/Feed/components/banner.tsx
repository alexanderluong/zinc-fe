import React from "react";
import "../assets/banner.css";

export interface BannerProps {}

export interface BannerState {}

class Banner extends React.Component<BannerProps, BannerState> {
  render() {
    return (
      <React.Fragment>
        <div id="edge-banner"></div>
        <div id="banner-container"></div>
        <div id="banner">
          <div className="welcome-text">
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
                <span className="line"> Hello, world!</span>
                <span
                  className="play-font emphasis translu"
                  style={{ fontSize: "72px", top: "20px" }}
                >
                  &rdquo;
                </span>
              </span>
            </div>
            <div className="banner-descr-text">
              Did someone say Silicon Valley? Hold on - the fasted growing tech
              hub is actually in Canada! Vancouver is a well-known hub for
              innovation and attracts some of the world’s top tech talent. Here
              on Vancity Tech, we want to inspire the Vancouver software
              development community by fostering an ecosystem for the Vancouver
              tech scene. Find posts written by top tech companies in the area!
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Banner;
