import React from "react";
import { footerLabels } from "../../util/labels/labels";
import "./Footer.css";

const Footer = ({
  interfaceLanguage,
}) => {
  const labels = footerLabels;

  const {
    organization,
    rights,
  } = labels[interfaceLanguage];

  return (
    <div className="footer">
      <a
        href="https://modul.am/"
        className="footerContent black-60"
        target="_blank"
      >
        <b>© {new Date().getFullYear()} {organization} | {rights}</b>
      </a>
    </div>
  );
};

export default Footer;
