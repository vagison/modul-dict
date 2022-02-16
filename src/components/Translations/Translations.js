import React from "react";

import {
  translationsLabels,
  posLabels,
  fieldLabels,
} from "../../util/labels/labels";
import "./Translations.css";

const initialState = {
  labels: translationsLabels,
  posLabels: posLabels,
  fieldLabels: fieldLabels,
  status: 0,
  translations: [],
  type: "",
};

class Translations extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.searchedWord !== prevProps.searchedWord &&
      Object.keys(this.props.searchedWord).length !== 0
    ) {
      // calculating actual direction
      const engChars = new RegExp("[\u0041-\u005a\u0061-\u007a]");
      const actualDirection = engChars.test(this.props.searchedWord["label"])
        ? 1
        : 0;
      
      // searching for translations
      fetch("https://modul-dictionary-api.herokuapp.com/search-translation", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedWord: this.props.searchedWord,
          direction: actualDirection,
        }),
      })
      .then((response) => response.json())
      // grouping translations
      .then((responseJSON) => {
        this.props.setDirection(actualDirection);
        this.setSearchedWordType(responseJSON["type"]);
        this.loadTranslations(
          this.groupTranslations(
            responseJSON["translations"],
            this.props.searchedWord["label"],
            this.props.direction
          )
        );
      })
      // catching errors
      .catch((error) => {
        console.log(error, "error occurred");
      });
    }

    else if (this.props.searchedWord !== prevProps.searchedWord && Object.keys(this.props.searchedWord).length === 0) {
      this.setState(initialState);
    }
  }

  setSearchedWordType = (type) => {
    this.setState({ type: type });
  };

  loadTranslations = (translations) => {
    this.setState({ translations: translations });
  };

  groupTranslations = (data, word, direction) => {
    var column = direction === 1 ? "englishWord" : "armenianWord";
    var exact = [];
    var startingWith = [];
    var containing = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i][column].toLowerCase() === word.toLowerCase()) {
        exact.push(data[i]);
      } else if (data[i][column].indexOf(word) === 0) {
        startingWith.push(data[i]);
      } else {
        containing.push(data[i]);
      }
    }

    exact.sort();
    startingWith.sort();
    containing.sort();

    return exact.concat(startingWith, containing);
  };

  deleteTranslation = (deleteFunction) => {
    deleteFunction();
  };

  filterTranslation = (id) => {
    this.setState({
      translations: this.state.translations.filter(
        (translation) => translation["translationId"] !== id
      ),
    });
  };

  render() {
    // labels
    const {
      translations,
      partOfSpeech,
      english,
      englishAbbreviation,
      armenian,
      armenianAbbreviation,
      fields,
      pronunciation,
      examples,
      editTranslation,
      deleteTranslation,
    } = this.state.labels[this.props.interfaceLanguage];

    return this.state.translations.length !== 0 ? (
      <article className="br3 ba b--black-10 pa2 pa3-ns mb4 mv2-ns w-90 w-80-m w-60-l mw7 shadow-5 center translationsBox">
        <main className="pa2 mw6 center black-60">
          <h1 className="f3 f2-ns fw6">{translations}</h1>
          {this.state.translations.map((eachTranslation, index) => (
            <div className="eachTranslationBox" key={index}>
              <hr />

              {/* part of speech */}
              {eachTranslation.pos["label"] !== "none" ? (
                <p>
                  <b>{partOfSpeech}</b>{" "}
                  {
                    this.state.posLabels[this.props.interfaceLanguage][eachTranslation.pos["value"]]
                  }
                </p>
              ) : ("")}

              {/* word and abbreviation */}
              {this.props.direction === 0 ? (
                <div>
                  {this.state.type === "word" ? (
                    <div>
                      <p>
                        <b>{armenian}</b> {eachTranslation["armenianWord"]}
                      </p>

                      {eachTranslation["abbreviationArm"] ? (
                        <p>
                          <b>{armenianAbbreviation}</b>{" "}
                          {eachTranslation["abbreviationArm"]}
                        </p>
                      ) : (
                        ""
                      )}

                      <p>
                        <b>{english}</b>
                        {eachTranslation.pos["label"] === "verb"
                          ? "(to) ".concat(eachTranslation["englishWord"])
                          : eachTranslation["englishWord"]}
                      </p>

                      {eachTranslation["abbreviationEng"] ? (
                        <p>
                          <b>{englishAbbreviation}</b>{" "}
                          {eachTranslation["abbreviationEng"]}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div>
                      {eachTranslation["abbreviationArm"] ? (
                        <p>
                          <b>{armenianAbbreviation}</b>{" "}
                          {eachTranslation["abbreviationArm"]}
                        </p>
                      ) : (
                        ""
                      )}

                      <p>
                        <b>{armenian}</b> {eachTranslation["armenianWord"]}
                      </p>

                      {eachTranslation["abbreviationEng"] ? (
                        <p>
                          <b>{englishAbbreviation}</b>{" "}
                          {eachTranslation["abbreviationEng"]}
                        </p>
                      ) : (
                        ""
                      )}

                      <p>
                        <b>{english}</b>
                        {eachTranslation.pos["label"] === "verb"
                          ? "(to) ".concat(eachTranslation["englishWord"])
                          : eachTranslation["englishWord"]}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {this.state.type === "word" ? (
                    <div>
                      <p>
                        <b>{english}</b>
                        {eachTranslation.pos["label"] === "verb"
                          ? "(to) ".concat(eachTranslation["englishWord"])
                          : eachTranslation["englishWord"]}
                      </p>

                      {eachTranslation["abbreviationEng"] ? (
                        <p>
                          <b>{englishAbbreviation}</b>{" "}
                          {eachTranslation["abbreviationEng"]}
                        </p>
                      ) : (
                        ""
                      )}

                      <p>
                        <b>{armenian}</b> {eachTranslation["armenianWord"]}
                      </p>

                      {eachTranslation["abbreviationArm"] ? (
                        <p>
                          <b>{armenianAbbreviation}</b>{" "}
                          {eachTranslation["abbreviationArm"]}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div>
                      {eachTranslation["abbreviationEng"] ? (
                        <p>
                          <b>{englishAbbreviation}</b>{" "}
                          {eachTranslation["abbreviationEng"]}
                        </p>
                      ) : (
                        ""
                      )}

                      <p>
                        <b>{english}</b>
                        {eachTranslation.pos["label"] === "verb"
                          ? "(to) ".concat(eachTranslation["englishWord"])
                          : eachTranslation["englishWord"]}
                      </p>

                      {eachTranslation["abbreviationArm"] ? (
                        <p>
                          <b>{armenianAbbreviation}</b>{" "}
                          {eachTranslation["abbreviationArm"]}
                        </p>
                      ) : (
                        ""
                      )}

                      <p>
                        <b>{armenian}</b> {eachTranslation["armenianWord"]}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* pronunciation */}
              {eachTranslation["pronunciation"] ? (
                <p>
                  <b>{pronunciation}</b>
                  {eachTranslation["pronunciation"]}
                </p>
              ) : (
                ""
              )}
              
              {/* fields */}
              {eachTranslation["fields"] ? (
                <p>
                  <b>{fields}</b>{" "}
                  {eachTranslation["fields"].map((field) =>
                    eachTranslation["fields"][
                      eachTranslation["fields"].length - 1
                    ]["label"] !== field["label"]
                      ? fieldLabels[this.props.interfaceLanguage][
                          field["value"]
                        ].concat(", ")
                      : fieldLabels[this.props.interfaceLanguage][
                          field["value"]
                        ]
                  )}
                </p>
              ) : (
                <p>
                  <b>{fields}</b>
                  {fieldLabels[this.props.interfaceLanguage][1]}
                </p>
              )}
              
              {/* examples */}
              {eachTranslation["examples"] ? (
                <div className="examplesBox">
                  <p>
                    <b>{examples}</b>
                  </p>
                  <div className="examples">
                    {eachTranslation["examples"].map((example, eidx) =>
                      this.props.direction === 1 ? (
                        <div
                          className="eachExample bg-washed-yellow"
                          key={eidx}
                        >
                          {example["englishExample"] ? (
                            <p className="eachExampleText">
                              {example["englishExample"]}
                            </p>
                          ) : (
                            ""
                          )}
                          {example["armenianExample"] ? (
                            <p className="eachExampleText">
                              {example["armenianExample"]}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        <div
                          className="eachExample bg-washed-yellow"
                          key={eidx}
                        >
                          {example["armenianExample"] ? (
                            <p className="eachExampleText">
                              {example["armenianExample"]}
                            </p>
                          ) : (
                            ""
                          )}
                          {example["englishExample"] ? (
                            <p className="eachExampleText">
                              {example["englishExample"]}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* edit or remove buttons */}
              {this.props.isSignedIn ? (
                <div className="buttonBox">
                  {/* edit button */}
                  <button
                    className="b ph3 pv2 mr1 ba b--black-10 bg-light-green grow pointer f5"
                    type="button"
                    onClick={() => {
                      this.props.setSelectedTranslation(eachTranslation);
                      this.props.onRouteChange("editTranslation");
                    }}
                  >
                    {editTranslation}
                  </button>
                  {/* remove button */}
                  <button
                    className="b ph3 pv2 ml1 ba b--black-10 bg-light-red grow pointer f5 dib"
                    type="button"
                    onClick={() => {
                      this.deleteTranslation(() => {
                        fetch(
                          "https://modul-dictionary-api.herokuapp.com/delete-translation",
                          {
                            method: "post",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify({
                              token: document.cookie.split("=", 2)[1],
                              translationId: eachTranslation["translationId"],
                            }),
                          }
                        )
                        // setting fetch status                          
                        .then((res) => {
                          this.setState({ status: res["status"] });
                        })
                        // handling cases
                        .then(() => {
                          // deleting error
                          if (this.state.status === 500) {
                            alert(
                              `${
                                this.state.labels[
                                  this.props.interfaceLanguage
                                ]["deletingError"]
                              }`
                            );
                          }
                          // incorrect user
                          else if (this.state.status === 401) {
                            alert(
                              `${
                                this.state.labels[
                                  this.props.interfaceLanguage
                                ]["incorrectUser"]
                              }`
                            );
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            this.props.setLogIn(false);
                            this.props.onRouteChange("signin")
                          } 
                          // successfully deleted
                          else {
                            this.filterTranslation(
                              eachTranslation["translationId"]
                            );
                          }
                        })
                        // catching errors
                        .catch((error) => {
                          console.log(error, "error occurred");
                        });
                      });
                    }}
                  >
                    {deleteTranslation}
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </main>
      </article>
    ) : (
      ""
    );
  }
}

export default Translations;
