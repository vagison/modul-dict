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
        rel="noreferrer"
        className="f6 f4-ns black-60 footerContent "
        target="_blank"
      >
        <b>© {new Date().getFullYear()} {organization} | {rights}</b>
      </a>
    </div>
  );
};

export default Footer;
