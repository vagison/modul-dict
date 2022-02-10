import React, { Component } from "react";

import { appLabels } from "./util/labels/labels";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Search from "./components/Search/Search";
import Translations from "./components/Translations/Translations";
import AddTranslation from "./components/AddTranslation/AddTranslation";
import EditTranslation from "./components/EditTranslation/EditTranslation";
import AboutUs from "./components/AboutUs/AboutUs";
import Footer from "./components/Footer/Footer";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interfaceLanguage:
        JSON.parse(window.localStorage.getItem("interfaceLanguage")) || "ENG",
      labels: appLabels,
      route: "home",
      isSignedIn: !document.cookie ? false : true,
      direction: 0,
      searchBoxState: "",
      searchedWord: {},
      currentTranslation: {},
    };
  }

  componentDidUpdate() {
    if (
      (this.state.isSignedIn === true && this.state.route === "signin") ||
      (this.state.isSignedIn === false && (this.state.route === "addTranslation" || this.state.route === "editTranslation"))
    ) {
      this.onRouteChange("home");
    }
  }

  changeInterfaceLanguage = (language) => {
    window.localStorage.setItem("interfaceLanguage", JSON.stringify(language));
    this.setState({
      interfaceLanguage: JSON.parse(
        window.localStorage.getItem("interfaceLanguage")
      ),
    });
  };

  reset = () => {
    this.setState({
      direction: 0,
      searchBoxState: "",
      searchedWord: {},
      currentTranslation: {},
    });
  };

  setLogIn = (state) => {
    // sign out
    if (state === false) {
      fetch("https://modul-dictionary-api.herokuapp.com/signout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token: document.cookie.split("=", 2)[1],
        }),
      }).then(() => {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.setState({ isSignedIn: state });
        this.onRouteChange("signin");
      });
    }
    // sign in
    else if (state === true) {
      this.setState({ isSignedIn: state });
      this.onRouteChange("home");
    }
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route !== "editTranslation") {
      this.reset();
    }
  };

  setDirection = (direction, cb) => {
    cb
      ? this.setState({ direction: direction }, cb())
      : this.setState({ direction: direction });
  };

  setSearchedWord = (word) => {
    this.setState({ searchedWord: word });
  };

  setSearchBoxState = (state) => {
    this.setState({ searchBoxState: state });
  };

  passTranslation = (translation) => {
    this.setState({ currentTranslation: translation });
  };

  render() {
    // labels
    document.title = this.state.labels[this.state.interfaceLanguage]["title"];

    // generated page
    var page;

    // home page
    if (this.state.route === "home") {
      page = (
        <div>
          <Search
            setDirection={this.setDirection}
            setSearchedWord={this.setSearchedWord}
            setSearchBoxState={this.setSearchBoxState}
            interfaceLanguage={this.state.interfaceLanguage}
            searchBoxState={this.state.searchBoxState}
          />
          <Translations
            onRouteChange={this.onRouteChange}
            setLogIn={this.setLogIn}
            passTranslation={this.passTranslation}
            setDirection={this.setDirection}
            setSearchBoxState={this.setSearchBoxState}
            isSignedIn={this.state.isSignedIn}
            interfaceLanguage={this.state.interfaceLanguage}
            direction={this.state.direction}
            searchedWord={this.state.searchedWord}
          />
        </div>
      );
    }
    // signin page
    if (this.state.route === "signin") {
      page = (
        <Signin
          setLogIn={this.setLogIn}
          interfaceLanguage={this.state.interfaceLanguage}
        />
      );
    }
    // add translation page
    if (this.state.route === "addTranslation") {
      page = (
        <AddTranslation
          onRouteChange={this.onRouteChange}
          setLogIn={this.setLogIn}
          interfaceLanguage={this.state.interfaceLanguage}
        />
      );
    }
    // edit translation page
    if (
      this.state.route === "editTranslation" &&
      this.state.currentTranslation.length !== 0
    ) {
      page = (
        <EditTranslation
          onRouteChange={this.onRouteChange}
          setLogIn={this.setLogIn}
          interfaceLanguage={this.state.interfaceLanguage}
          currentTranslation={this.state.currentTranslation}
        />
      );
    }
    // about us page
    if (this.state.route === "aboutUs") {
      page = <AboutUs interfaceLanguage={this.state.interfaceLanguage} />;
    }

    return (
      <div className="App">
        {/* navigation component */}
        <Navigation
          isSignedIn={this.state.isSignedIn}
          interfaceLanguage={this.state.interfaceLanguage}
          route={this.state.route}
          onRouteChange={this.onRouteChange}
          changeInterfaceLanguage={this.changeInterfaceLanguage}
          // reset={this.reset}
          setLogIn={this.setLogIn}
          setLogOut={this.setLogOut}
        />

        <div style={{ clear: "both" }}></div>

        {/* generated page */}
        <div className="mv2 mv4-ns mt5-l">{page}</div>

        <div style={{ clear: "both" }}></div>

        {/* footer component */}
        <Footer interfaceLanguage={this.state.interfaceLanguage} />
      </div>
    );
  }
}

export default App;
