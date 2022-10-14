import { Box } from "@mui/system";
import { Grid, Paper } from "@mui/material";

import React from "react";
import images from "../images";

const Footer = () => {
  return (
    <>
      <footer className="Footer">
        <ul className="footer ">
          <li>
            ABOUT
            <li className="para">
              Bloowatch is specalised software for watrersports
              schools(surfing,kitesurfing, sailing, and diivng) and outdoor
              activity providers(skilling, climbing)
            </li>
          </li>
          <li className="flist">
            CONTACT
            <li>156-677-124-442-2887</li>
            <li>wave@bloowatch.com</li>
            <li>wave@bloowatch.com</li>
          </li>
          <li className="flist">
            USEFUL LINKS
            <li>About us</li>
            <li>History</li>
            <li>Contact us</li>
          </li>
          <li className="flist">
            INSTAGRAM
            <ul className="instagram">
              <li>
                <img src={images.img1} alt="Image-1" />
              </li>
              <li>
                <img src={images.img2} alt="Image-2" />
              </li>
              <li>
                <img src={images.img3} alt="Image-3" />
              </li>
              <li>
                <img src={images.img4} alt="Image-4" />
              </li>
              <li>
                <img src={images.img5} alt="Image-5" />
              </li>
            </ul>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
