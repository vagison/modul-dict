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
      searchedWord: {},
      currentTranslation: {},
    };
  }

  // checking for route and logged-in status changes
  componentDidUpdate() {
    if (
      (this.state.isSignedIn === true && this.state.route === "signin") ||
      (this.state.isSignedIn === false && (this.state.route === "addTranslation" || this.state.route === "editTranslation"))
    ) {
      this.onRouteChange("home");
    }
  }

  // changing interface language
  changeInterfaceLanguage = (language) => {
    window.localStorage.setItem("interfaceLanguage", JSON.stringify(language));
    this.setState({
      interfaceLanguage: JSON.parse(
        window.localStorage.getItem("interfaceLanguage")
      ),
    });
  };

  // reseting component attributes to initial ones
  reset = () => {
    this.setState({
      direction: 0,
      searchedWord: {},
      currentTranslation: {},
    });
  };

  // handling log-in and log-out
  setLogIn = (state) => {
    // sign out
    if (state === false) {
      // signing out from back-end
      fetch("https://modul-dictionary-api.herokuapp.com/signout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token: document.cookie.split("=", 2)[1],
        }),
      })
      // destroying cookies and redirecting to signin page
      .then(() => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.setState({ isSignedIn: state });
        this.onRouteChange("signin");
      })      
      // catching errors
      .catch((error) => {
        console.log(error, "error occurred");
      });
    }
    // sign in
    else if (state === true) {
      this.setState({ isSignedIn: state });
      this.onRouteChange("home");
    }
  };

  // hangling route changes
  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route !== "editTranslation") {
      this.reset();
    }
  };

  // setting translation's direction
  setDirection = (direction) => {
    this.setState({ direction: direction });
  };

  // setting searched word
  setSearchedWord = (word) => {
    this.setState({ searchedWord: word });
  };

  // setting selected translation
  setSelectedTranslation = (translation) => {
    this.setState({ currentTranslation: translation });
  };

  render() {
    // labels
    document.title = this.state.labels[this.state.interfaceLanguage]["title"];

    // page component
    var page;

    // home page
    if (this.state.route === "home") {
      page = (
        <div>
          <Search
            interfaceLanguage={this.state.interfaceLanguage}
            setDirection={this.setDirection}
            setSearchedWord={this.setSearchedWord}
          />
          <Translations
            interfaceLanguage={this.state.interfaceLanguage}
            isSignedIn={this.state.isSignedIn}
            direction={this.state.direction}
            searchedWord={this.state.searchedWord}
            onRouteChange={this.onRouteChange}
            setLogIn={this.setLogIn}
            setDirection={this.setDirection}
            setSelectedTranslation={this.setSelectedTranslation}
          />
        </div>
      );
    }
    // signin page
    if (this.state.route === "signin") {
      page = (
        <Signin
          interfaceLanguage={this.state.interfaceLanguage}
          setLogIn={this.setLogIn}
        />
      );
    }
    // add translation page
    if (this.state.route === "addTranslation") {
      page = (
        <AddTranslation
          interfaceLanguage={this.state.interfaceLanguage}
          onRouteChange={this.onRouteChange}
          setLogIn={this.setLogIn}
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
          interfaceLanguage={this.state.interfaceLanguage}
          currentTranslation={this.state.currentTranslation}
          onRouteChange={this.onRouteChange}
          setLogIn={this.setLogIn}
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

        {/* page component */}
        <div className="mv2 mv4-ns mt5-l">{page}</div>

        <div style={{ clear: "both" }}></div>

        {/* footer component */}
        <Footer interfaceLanguage={this.state.interfaceLanguage} />
      </div>
    );
  }
}

export default App;
