import React from "react";
import GreatBritainFlag from "./Flags/GB";
import ArmeniaFlag from "./Flags/Armenia";
import { navigationLabels } from "../../util/labels/labels";
import "./Navigation.css";

const Navigation = ({
  interfaceLanguage,
  route,
  changeInterfaceLanguage,
  onRouteChange,
  isSignedIn,
  setLogIn,
}) => {
  const labels = navigationLabels;

  const {
    searchTranslation,
    addTranslation,
    addRelation,
    aboutUs,
    logIn,
    logOut,
  } = labels[interfaceLanguage];

  return (
    <nav className="navigationBarBox">
      <div className="linksBox">
        <p
          onClick={() => {
            onRouteChange("home");
          }}
          className={"f4 f3-ns link black-60 pa2 pa3-ns ma0 pointer".concat(
            route === "home" ? " activePage" : ""
          )}
        >
          {searchTranslation}
        </p>

        {isSignedIn && (
          <p
            onClick={() => onRouteChange("addTranslation")}
            className={"f4 f3-ns link black-60 pa2 pa3-ns ma0 pointer".concat(
              route === "addTranslation" || route === "editTranslation"
                ? " activePage"
                : ""
            )}
          >
            {addTranslation}
          </p>
        )}

        {isSignedIn && (
          <p
            onClick={() => onRouteChange("addRelation")}
            className={"f4 f3-ns link black-60 pa2 pa3-ns ma0 pointer".concat(
              route === "editRelation" || route === "addRelation"
                ? " activePage"
                : ""
            )}
          >
            {addRelation}
          </p>
        )}

        <p
          onClick={() => {
            onRouteChange("aboutUs");
          }}
          className={"f4 f3-ns link black-60 pa2 pa3-ns ma0 pointer".concat(
            route === "aboutUs" ? " activePage" : ""
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
              className={"f4 f3-ns link black-60 pa2 pa3-ns ma0 pointer".concat(
                route === "signin" ? " activePage" : ""
              )}
            >
              {logIn}
            </p>
          ) : (
            <p
              onClick={() => setLogIn(false)}
              className={"f4 f3-ns link black-60 pa2 pa3-ns ma0 pointer"}
            >
              {logOut}
            </p>
          )}
        </div>

        <div className="interfaceLanguageBox">
          <div
            className={"f4 f3-ns link black-60 pa2 ma0 pointer interfaceLanguageEnglish".concat(
              interfaceLanguage === "ENG" ? "" : " interfaceInactiveLanguage"
            )}
            onClick={() => changeInterfaceLanguage("ENG")}
          >
            {GreatBritainFlag()}
          </div>
          <div
            className={"f4 f3-ns link black-60 pa2 ma0 pointer interfaceLanguageArmenian".concat(
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
