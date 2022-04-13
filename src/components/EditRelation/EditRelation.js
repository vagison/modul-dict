import React from "react";
import AsyncSelect from "react-select/async";

import { editRelationLabels } from "../../util/labels/labels";
import "./EditRelation.css";

class EditRelation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: editRelationLabels,
      status: 0,
      comparisonText: this.props.selectedRelation["comparison"]["label"],
      comparisonId: this.props.selectedRelation["comparison"]["value"],
      words: this.props.selectedRelation["relatedWords"]
        ? this.props.selectedRelation["relatedWords"]
        : [],
    };
  }

  // // resetFields
  resetFields = () => {
    this.setState({
      comparisonText: this.props.selectedRelation["comparison"]["label"],
      comparisonId: this.props.selectedRelation["comparison"]["value"],
      words: this.props.selectedRelation["relatedWords"]
        ? this.props.selectedRelation["relatedWords"]
        : [],
    });
  };

  changeSearchedWord = () => {
    this.props.setSearchedWord(this.props.searchedWord);
  };

  // //relation update
  updateRelation = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/update-comparison", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token: document.cookie.split("=", 2)[1],
        language: this.props.direction,
        comparisonId: this.state.comparisonId,
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
        // existing word
        if (this.state.status === 401) {
          alert(
            `${this.state.labels[this.props.interfaceLanguage]["incorrectUser"]
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
            `${this.state.labels[this.props.interfaceLanguage]["incorrectData"]
            }`
          );
        }
        // successfully updated
        else {
          this.props.onRouteChange("home");
          this.changeSearchedWord();
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
    fetch("http://localhost:3000/search-word", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchedWord: inputValue,
        language: this.props.direction,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const tempArray = [];

        if (data) {
          if (
            data["collection"].length &&
            (data["direction"] === this.props.direction ||
              data["direction"] === 100)
          ) {
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
    const { title, comparisonText, relatedWords, updateRelation, resetFields } =
      this.state.labels[this.props.interfaceLanguage];

    return (
      <article className="br3 ba b--black-10 pa3-ns mb4 mv2-ns w-90 w-80-m w-60-l mw7 shadow-5 center editRelationBox">
        <main className="pa3 pt2 pa4-ns pv2-ns center black-60">
          <h1 className="f3 f2-ns fw6"> {title} </h1>{" "}
          <form className="" onSubmit={this.updateRelation}>
            <fieldset className="ba b--transparent ph0 mh0 editRelationFormBox">
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
                {updateRelation}{" "}
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

export default EditRelation;
