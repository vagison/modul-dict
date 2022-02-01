import React from "react";
import USFlag from "./Flags/US";
import GreatBritainFlag from "./Flags/GB";
import ArmeniaFlag from "./Flags/Armenia";
import { navigationLabels } from "../../util/labels/labels";
import "./Navigation.css";

const Navigation = ({
  interfaceLanguage,
  route,
  changeInterfaceLanguage,
  onRouteChange,
  // reset,
  isSignedIn,
  setLogIn,
}) => {
  const labels = navigationLabels;
  
  const {
    searchTranslation,
    addATranslation,
    aboutUs,
    logIn,
    logOut,
    // editWord,
  } = labels[interfaceLanguage];

  return (
    <nav className="navigationBarBox">
      <div className="linksBox">
        <p
          onClick={() => {
            // reset();
            onRouteChange("home");
          }}
          className={"f3 link dim black-60 pa3 ma0 pointer".concat(
            route === "home" ? " bg-navy white" : ""
          )}
        >
          {searchTranslation}
        </p>

        {isSignedIn ? (
          <p
            onClick={() => onRouteChange("addTranslation")}
            className={"f3 link dim black-60 pa3 ma0 pointer".concat(
              route === "addTranslation" || route === "editTranslation"
                ? " bg-navy white white"
                : ""
            )}
          >
            {addATranslation}
          </p>
        ) : (
          ""
        )}

        <p
          onClick={() => {
            // reset();
            onRouteChange("aboutUs");
          }}
          className={"f3 link dim black-60 pa3 ma0 pointer".concat(
            route === "aboutUs" ? " bg-navy white" : ""
          )}
        >
          {aboutUs}
        </p>
      </div>

      <div className="interfaceOptionsBox">
        <div className="signinOptionsBox">
          {isSignedIn === false ? (
            <p
              onClick={() => onRouteChange("signin")}
              className={"f3 link dim black-60 pa3 ma0 pointer".concat(
                route === "signin" ? " bg-navy white" : ""
              )}
            >
              {logIn}
            </p>
          ) : (
            <p
              onClick={() => setLogIn(false)}
              className={"f3 link dim black-60 pa3 ma0 pointer"}
            >
              {logOut}
            </p>
          )}
        </div>

        <div className="interfaceLanguageBox">
          <div
            className={"f3 link dim black-60 pa2 ma0 pointer interfaceLanguageEnglish".concat(
              interfaceLanguage === "ENG" ? "" : " interfaceInactiveLanguage"
            )}
            onClick={() => changeInterfaceLanguage("ENG")}
          >
            {USFlag()} / {GreatBritainFlag()}
          </div>
          <div
            className={"f3 link dim black-6 pa2 ma0 pointer interfaceLanguageArmenian".concat(
              interfaceLanguage === "ARM" ? "" : " interfaceInactiveLanguage"
            )}
            onClick={() => changeInterfaceLanguage("ARM")}
          >
            {ArmeniaFlag()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
