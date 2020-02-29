import React from "react";
import "../assets/banner.css";

export interface BannerProps {}

export interface BannerState {}

class Banner extends React.Component<BannerProps, BannerState> {
  render() {
    return (
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            placerat consectetur orci vitae tincidunt. Nulla et elit ac turpis
            facilisis maximus. Aliquam eget metus a tortor elementum sodales.
            Donec non turpis sed mi commodo pretium in nec elit. In hac
            habitasse platea dictumst.
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
