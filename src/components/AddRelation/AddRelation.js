import React from "react";
import AsyncSelect from "react-select/async";

import { addRelationLabels } from "../../util/labels/labels";
import "./AddRelation.css";

class AddRelation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: addRelationLabels,
      status: 0,
      language: 1,
      comparisonText: "",
      words: [],
    };
  }

  // // resetFields
  resetFields = () => {
    this.setState({
      comparisonText: "",
      words: [],
    });
  };

  changeLanguage = (language) => {
    this.resetFields();
    this.setState({ language: language });
  };

  // //register relation
  registerRelation = (event) => {
    event.preventDefault();
    fetch("https://modul-dictionary-api.herokuapp.com/register-comparison", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token: document.cookie.split("=", 2)[1],
        language: this.state.language,
        comparisonText: this.state.comparisonText,
        words: this.state.words,
      }),
    })
      // setting fetch status
      .then((res) => {
        this.setState({ status: res["status"] });
      })
      // handling cases
      .then(() => {
        if (this.state.status === 401) {
          alert(
            `${
              this.state.labels[this.props.interfaceLanguage]["incorrectUser"]
            }`
          );
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          this.props.setLogIn(false);
          this.props.onRouteChange("signin");
        }
        // incorrect data
        else if (this.state.status === 500) {
          alert(
            `${
              this.state.labels[this.props.interfaceLanguage]["incorrectData"]
            }`
          );
        }
        // successfully updated
        else {
          this.props.onRouteChange("home");
        }
      })
      // catching errors
      .catch((error) => {
        console.log(error, "error occurred");
      });
  };

  // // word
  // search word
  searchWord = (inputValue, callback) => {
    fetch("https://modul-dictionary-api.herokuapp.com/search-word", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchedWord: inputValue,
        language: this.state.language,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const tempArray = [];

        if (data) {
          if (data["collection"].length) {
            data["collection"].forEach((element) => {
              if (element["type"] === "word") {
                tempArray.push({ label: element.label, value: element.ids[0] });
              }
            });
          }
        }
        callback(tempArray);
      })
      .catch((error) => {
        console.log(error, "error occurred");
      });
  };

  // // comparison text change
  onComparisonTextChange = (event) => {
    this.setState({ comparisonText: event.target.value });
  };

  // change field
  onWordChange = (selectedWord) => {
    if (selectedWord) {
      this.setState({
        words: selectedWord,
      });
    }
  };

  render() {
    // labels
    const {
      title,
      selectLanguage,
      languageENG,
      languageARM,
      comparisonText,
      relatedWords,
      registerRelation,
      resetFields,
    } = this.state.labels[this.props.interfaceLanguage];

    return (
      <article className="br3 ba b--black-10 pa3-ns mb4 mv2-ns w-90 w-80-m w-60-l mw7 shadow-5 center addRelationBox">
        <main className="pa3 pt2 pa4-ns pv2-ns center black-60">
          <h1 className="f3 f2-ns fw6"> {title} </h1>{" "}
          <form className="" onSubmit={this.registerRelation}>
            <fieldset className="ba b--transparent ph0 mh0 addRelationFormBox">
              <div className="mb3 languagesBox">
                <label className="db fw6 lh-copy f6"> {selectLanguage} </label>{" "}
                <div className="mt2 languages">
                  <div
                    className={"black-60 pa2 pointer languageEnglish".concat(
                      this.state.language === 1 ? " activeLanguage" : ""
                    )}
                    onClick={() => {
                      this.changeLanguage(1);
                    }}
                  >
                    {languageENG}{" "}
                  </div>{" "}
                  <div
                    className={"black-60 pa2 pointer languageArmenian".concat(
                      this.state.language === 0 ? " activeLanguage" : ""
                    )}
                    onClick={() => {
                      this.changeLanguage(0);
                    }}
                  >
                    {languageARM}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="mb3 comparisonBox">
                <label className="db fw6 lh-copy f6"> {comparisonText} </label>{" "}
                <input
                  value={this.state.comparisonText}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="text"
                  name="comparisonText"
                  id="comparisonText"
                  required
                  onChange={this.onComparisonTextChange}
                />{" "}
              </div>{" "}
              <div className="mb3 relatedWordsBox">
                <label className="db fw6 lh-copy f6"> {relatedWords} </label>{" "}
                <AsyncSelect
                  isMulti
                  className="input-reset ba bg-transparent w-100 asyncSelectField"
                  value={this.state.words}
                  loadOptions={this.searchWord}
                  onChange={(word) => {
                    this.onWordChange(word);
                  }}
                  defaultOptions={true}
                />{" "}
              </div>{" "}
            </fieldset>
            {/* reset fields and update translation buttons */}{" "}
            <div className="buttonBox">
              {" "}
              {/* update translation */}{" "}
              <button
                className="fw5 ph2 ph3-ns pv1 pv2-ns mr1 ba b--black-10 grow pointer f5 updateButton"
                type="submit"
              >
                {registerRelation}{" "}
              </button>
              {/* reset fields */}{" "}
              <button
                className="fw5 ph2 ph3-ns pv1 pv2-ns ba b--black-10 grow pointer f5 resetButtton"
                type="button"
                onClick={this.resetFields}
              >
                {resetFields}{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </main>{" "}
      </article>
    );
  }
}

export default AddRelation;
