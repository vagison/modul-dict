import React from "react";

import { resultsLabels, posLabels, fieldLabels } from "../../util/labels/labels";
import "./Results.css";

const initialState = {
  labels: resultsLabels,
  posLabels: posLabels,
  fieldLabels: fieldLabels,
  status: 0,
  translations: [],
  relatedTerms: [],
  seeAlsoWords: [],
  type: "",
};

class Results extends React.Component {
  // initializing object
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // app
  async componentDidUpdate(prevProps) {
    if (
      this.props.searchedWord !== prevProps.searchedWord &&
      Object.keys(this.props.searchedWord).length !== 0
    ) {
      // calculating actual direction
      const engChars = new RegExp("[\u0041-\u005a\u0061-\u007a]");
      const actualDirection = engChars.test(this.props.searchedWord["label"])
        ? 1
        : 0;

      // fetching translations
      await this.fetchingTranslations(this.props.searchedWord, actualDirection);

      // fetching relatedTerms
      await this.fetchingRelatedTerms([this.props.searchedWord["value"][0]]);
    } else if (
      this.props.searchedWord !== prevProps.searchedWord &&
      Object.keys(this.props.searchedWord).length === 0
    ) {
      this.setState(initialState);
    }
  }

  setSearchedWordType = (type) => {
    this.setState({ type: type });
  };

  changeSearchedWord = (word) => {
    this.props.setSearchedWord({
      label: word["label"],
      type: "word",
      value: [word["value"]],
    });
  };

  // translations
  async fetchingTranslations(word, direction) {
    // searching for translations
    return (
      fetch("https://modul-dictionary-api.herokuapp.com/search-translation", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedWord: word,
          direction: direction,
        }),
      })
        .then((response) => response.json())
        // setting direction and word type
        .then((responseJSON) => {
          this.props.setDirection(direction);
          this.setSearchedWordType(responseJSON["type"]);
          return responseJSON;
        })
        // loading translations and see also words
        .then((responseJSON) => {
          this.loadTranslations(
            this.groupTranslations(
              responseJSON["translations"],
              this.props.searchedWord["label"],
              this.props.direction,
              this.state.type
            )
          );
          this.loadSeeAlsoWords(
            this.groupSeeAlsoWords(
              responseJSON["translations"],
              this.props.searchedWord["label"],
              this.props.direction,
              this.state.type
            )
          );
        })
        // catching errors
        .catch((error) => {
          console.log(error, "error occurred");
        })
    );
  }

  groupTranslations = (data, word, direction, type) => {
    if (type === "word") {
      let column = direction === 1 ? "englishWord" : "armenianWord";

      let exact = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i][column] === word) {
          exact.push(data[i]);
        }
      }

      exact.sort();

      return exact;
    } else if (type === "abbreviation") {
      return data;
    } else {
      return [];
    }
  };

  loadTranslations = (translations) => {
    this.setState({ translations: translations });
  };

  removeTranslation = (translationId) => {
    fetch("https://modul-dictionary-api.herokuapp.com/delete-translation", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token: document.cookie.split("=", 2)[1],
        translationId: translationId,
      }),
    })
      // setting fetch status
      .then((res) => {
        this.setState({ status: res["status"] });
      })
      // handling cases
      .then(() => {
        // deleting error
        if (this.state.status === 500) {
          alert(
            `${this.state.labels[this.props.interfaceLanguage]["deletingError"]
            }`
          );
        }
        // incorrect user
        else if (this.state.status === 401) {
          alert(
            `${this.state.labels[this.props.interfaceLanguage]["incorrectUser"]
            }`
          );
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          this.props.setLogIn(false);
          this.props.onRouteChange("signin");
        }
        // successfully removed
        else {
          this.filterTranslation(translationId);
        }
      })
      // catching errors
      .catch((error) => {
        console.log(error, "error occurred");
      });
  };

  filterTranslation = (translationId) => {
    this.setState({
      translations: this.state.translations.filter(
        (translation) => translation["translationId"] !== translationId
      ),
    });
  };

  // related terms
  async fetchingRelatedTerms() {
    // searching for relatedTerms
    return (
      fetch("https://modul-dictionary-api.herokuapp.com/search-comparison", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wordIds: this.props.searchedWord["value"],
          language: this.props.direction,
        }),
      })
        .then((response) => response.json())
        // loading relatedTerms
        .then((responseJSON) => {
          this.setState({ relatedTerms: responseJSON["comparisons"] });
        })
    );
  }

  removeComparison = (comparisonId) => {
    fetch("https://modul-dictionary-api.herokuapp.com/delete-comparison", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token: document.cookie.split("=", 2)[1],
        comparisonId: comparisonId,
        language: this.props.direction,
      }),
    })
      // setting fetch status
      .then((res) => {
        this.setState({ status: res["status"] });
      })
      // handling cases
      .then(() => {
        // deleting error
        if (this.state.status === 500) {
          alert(
            `${this.state.labels[this.props.interfaceLanguage]["deletingError"]
            }`
          );
        }
        // incorrect user
        else if (this.state.status === 401) {
          alert(
            `${this.state.labels[this.props.interfaceLanguage]["incorrectUser"]
            }`
          );

          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          this.props.setLogIn(false);
          this.props.onRouteChange("signin");
        }
        // successfully removed
        else {
          this.fetchingRelatedTerms();
        }
      })
      // catching errors
      .catch((error) => {
        console.log(error, "error occurred");
      });
  };

  // see also
  groupSeeAlsoWords = (data, word, direction, type) => {
    if (type === "abbreviation") {
      return [];
    } else {
      let column = direction === 1 ? "englishWord" : "armenianWord";
      let otherWords = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i][column] === word) {
        } else {
          if (
            otherWords.filter((element) => element["label"] === data[i][column])
              .length === 0
          ) {
            otherWords.push({
              label: data[i][column],
              type: type,
              value: [
                data[i][direction === 1 ? "englishWordId" : "armenianWordId"],
              ],
            });
          }
        }
      }

      otherWords.sort();

      return otherWords;
    }
  };

  loadSeeAlsoWords = (words) => {
    this.setState({ seeAlsoWords: words });
  };

  // rendering
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
      definitions,
      editTranslation,
      removeTranslation,
      seeAlso,
      realatedTerms,
      editRelation,
      removeRelation,
    } = this.state.labels[this.props.interfaceLanguage];

    return (
      this.state.translations.length !== 0 &&
      (
        <article className="br3 ba b--black-10 pa2 pa3-ns mb4 mv2-ns w-90 w-80-m w-60-l mw7 shadow-5 center allResultsBox">
          <main className="pa2 mw6 center black-60 allResults">
            <div className="translationsBox">
              <h1 className="f3 f2-ns fw6 translationsTitle">{translations}</h1>
              <div className="translations">
                {this.state.translations.map(
                  (eachTranslation, eachTranslationIndex) => (
                    <div
                      className="eachTranslationBox"
                      key={eachTranslationIndex}
                    >
                      <div className="wordsBox">
                        {this.props.direction === 0 ? (
                          this.state.type === "word" ? (
                            <div>
                              <p>
                                <b>{armenian}</b>
                                {eachTranslation["armenianWord"]}
                              </p>

                              {eachTranslation["abbreviationArm"] && (
                                <p>
                                  <b>{armenianAbbreviation}</b>
                                  {eachTranslation["abbreviationArm"]}
                                </p>
                              )}

                              <p>
                                <b>{english}</b>
                                {eachTranslation.pos["label"] === "verb"
                                  ? "(to) ".concat(
                                    eachTranslation["englishWord"]
                                  )
                                  : eachTranslation["englishWord"]}
                              </p>

                              {eachTranslation["abbreviationEng"] && (
                                <p>
                                  <b>{englishAbbreviation}</b>
                                  {eachTranslation["abbreviationEng"]}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div>
                              {eachTranslation["abbreviationArm"] && (
                                <p>
                                  <b>{armenianAbbreviation}</b>
                                  {eachTranslation["abbreviationArm"]}
                                </p>
                              )}

                              <p>
                                <b>{armenian}</b>
                                {eachTranslation["armenianWord"]}
                              </p>

                              {eachTranslation["abbreviationEng"] && (
                                <p>
                                  <b>{englishAbbreviation}</b>
                                  {eachTranslation["abbreviationEng"]}
                                </p>
                              )}

                              <p>
                                <b>{english}</b>
                                {eachTranslation.pos["label"] === "verb"
                                  ? "(to) ".concat(
                                    eachTranslation["englishWord"]
                                  )
                                  : eachTranslation["englishWord"]}
                              </p>
                            </div>
                          )
                        ) : this.state.type === "word" ? (
                          <div>
                            <p>
                              <b>{english}</b>
                              {eachTranslation.pos["label"] === "verb"
                                ? "(to) ".concat(eachTranslation["englishWord"])
                                : eachTranslation["englishWord"]}
                            </p>

                            {eachTranslation["abbreviationEng"] && (
                              <p>
                                <b>{englishAbbreviation}</b>
                                {eachTranslation["abbreviationEng"]}
                              </p>
                            )}

                            <p>
                              <b>{armenian}</b>
                              {eachTranslation["armenianWord"]}
                            </p>

                            {eachTranslation["abbreviationArm"] && (
                              <p>
                                <b>{armenianAbbreviation}</b>
                                {eachTranslation["abbreviationArm"]}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            {eachTranslation["abbreviationEng"] && (
                              <p>
                                <b>{englishAbbreviation}</b>
                                {eachTranslation["abbreviationEng"]}
                              </p>
                            )}

                            <p>
                              <b>{english}</b>
                              {eachTranslation.pos["label"] === "verb"
                                ? "(to) ".concat(eachTranslation["englishWord"])
                                : eachTranslation["englishWord"]}
                            </p>

                            {eachTranslation["abbreviationArm"] && (
                              <p>
                                <b>{armenianAbbreviation}</b>
                                {eachTranslation["abbreviationArm"]}
                              </p>
                            )}

                            <p>
                              <b>{armenian}</b>
                              {eachTranslation["armenianWord"]}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="posBox">
                        {eachTranslation.pos["label"] !== "none" && (
                          <p>
                            <b>{partOfSpeech}</b>{" "}
                            {
                              this.state.posLabels[
                              this.props.interfaceLanguage
                              ][eachTranslation.pos["value"]]
                            }
                          </p>
                        )}
                      </div>

                      <div className="pronunciationBox">
                        {eachTranslation["pronunciation"] && (
                          <p>
                            <b>{pronunciation}</b>
                            {eachTranslation["pronunciation"]}
                          </p>
                        )}
                      </div>

                      <div className="fieldsBox">
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
                      </div>

                      <div className="definitionsBox">
                        {eachTranslation["definitions"] && (
                          <div>
                            <p className="definitionsTitle">
                              <b>{definitions}</b>
                            </p>
                            <div className="allDefinitions">
                              {eachTranslation["definitions"].map(
                                (definition, didx) =>
                                  this.props.direction === 1 ? (
                                    <div
                                      className="eachDefinitionBox ph2 pv1 mv2"
                                      key={didx}
                                    >
                                      {definition["englishDefinition"] && (
                                        <p className="eachDefinitionEnglishText">
                                          {definition["englishDefinition"]}
                                        </p>
                                      )}
                                      {definition["armenianDefinition"] && (
                                        <p className="eachDefinitionArmenianText">
                                          {definition["armenianDefinition"]}
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      className="eachDefinitionBox ph2 pv1 mv2"
                                      key={didx}
                                    >
                                      {definition["armenianDefinition"] && (
                                        <p className="eachDefinitionArmenianText">
                                          {definition["armenianDefinition"]}
                                        </p>
                                      )}
                                      {definition["englishDefinition"] && (
                                        <p className="eachDefinitionEnglishText">
                                          {definition["englishDefinition"]}
                                        </p>
                                      )}
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="examplesBox">
                        {eachTranslation["examples"] && (
                          <div>
                            <p className="examplesTitle">
                              <b>{examples}</b>
                            </p>
                            <div className="allExamples">
                              {eachTranslation["examples"].map(
                                (example, eidx) =>
                                  this.props.direction === 1 ? (
                                    <div
                                      className="eachExampleBox ph2 pv1 mv2"
                                      key={eidx}
                                    >
                                      {example["englishExample"] && (
                                        <p className="eachExampleEnglishText">
                                          {example["englishExample"]}
                                        </p>
                                      )}
                                      {example["armenianExample"] && (
                                        <p className="eachExampleArmenianText">
                                          {example["armenianExample"]}
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      className="eachExampleBox ph2 pv1 mv2"
                                      key={eidx}
                                    >
                                      {example["armenianExample"] && (
                                        <p className="eachExampleArmenianText">
                                          {example["armenianExample"]}
                                        </p>
                                      )}
                                      {example["englishExample"] && (
                                        <p className="eachExampleEnglishText">
                                          {example["englishExample"]}
                                        </p>
                                      )}
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="butons">
                        {this.props.isSignedIn && (
                          <div className="mt3 buttonsBox">
                            {/* edit button */}
                            <button
                              className="fw5 ph2 ph3-ns pv1 pv2-ns mr1 ba b--black-10 grow pointer f5 editButton"
                              type="button"
                              onClick={() => {
                                this.props.setSelectedTranslation(
                                  eachTranslation
                                );
                                this.props.onRouteChange("editTranslation");
                              }}
                            >
                              {editTranslation}
                            </button>
                            {/* remove button */}
                            <button
                              className="fw5 ph2 ph3-ns pv1 pv2-ns ml1 ba b--black-10 grow pointer f5 removeButton"
                              type="button"
                              onClick={() =>
                                this.removeTranslation(
                                  eachTranslation["translationId"]
                                )
                              }
                            >
                              {removeTranslation}
                            </button>
                          </div>
                        )}
                      </div>

                      {eachTranslationIndex <
                        this.state.translations.length - 1 ? (
                        <hr />
                      ) : (
                        ""
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="relatedTermsBox">
              {this.state.relatedTerms.length !== 0 && (<h1 className="f3 f2-ns fw6 mb0 relatedTermsTitle">{realatedTerms}</h1>)}
              {this.state.relatedTerms.length !== 0 &&
                (
                  <div className="allRelatedTerms">
                    {this.state.relatedTerms.map(
                      (relationsForWord, baseWordIndex) => {
                        return (
                          <div className="eachBaseWordBox" key={baseWordIndex}>
                            <p
                              className="f4"
                            >
                              <span
                                className="eachBaseWordTitle"
                                onClick={() => {
                                  this.changeSearchedWord(
                                    relationsForWord["baseWord"]
                                  );
                                }}>
                                {relationsForWord["baseWord"]["label"]}
                              </span>
                              <b>{" vs."}</b>
                            </p>

                            {relationsForWord["comparisonsPerWord"].map(
                              (comparison, comparisonIndex) => {
                                return (
                                  <div
                                    className="eachComparisonBox ph2 mb2"
                                    key={comparisonIndex}
                                  >
                                    <p className="eachComparisonVersusWords">
                                      {comparison["relatedWords"].map(
                                        (word, relatedWordIndex) => {
                                          if (
                                            word["label"] !==
                                            relationsForWord["baseWord"]["label"]
                                          ) {
                                            return (
                                              <span
                                                className="eachVersusWord"
                                                key={relatedWordIndex}
                                              >
                                                <b className="versusPrefix">vs. </b>
                                                <b
                                                  className="versusWord"
                                                  onClick={() => {
                                                    this.changeSearchedWord(word);
                                                  }}
                                                >
                                                  {word["label"]}
                                                </b>
                                                <b className="versusPostfix"> </b>
                                              </span>
                                            );
                                          }
                                          return "";
                                        }
                                      )}
                                    </p>

                                    <p className="eachComparisonText">
                                      {comparison["comparison"]["label"]}
                                    </p>

                                    {this.props.isSignedIn && (
                                      <div className="mv2 buttonsBox">
                                        {/* edit button */}
                                        <button
                                          className="fw5 ph2 ph3-ns pv1 pv2-ns mr1 ba b--black-10 grow pointer f5 editButton"
                                          type="button"
                                          onClick={() => {
                                            this.props.setSelectedRelation(
                                              comparison
                                            );
                                            this.props.onRouteChange(
                                              "editRelation"
                                            );
                                          }}
                                        >
                                          {editRelation}
                                        </button>

                                        {/* remove button */}
                                        <button
                                          className="fw5 ph2 ph3-ns pv1 pv2-ns ml1 ba b--black-10 grow pointer f5 removeButton"
                                          type="button"
                                          onClick={() => {
                                            this.removeComparison(
                                              comparison["comparison"]["value"]
                                            );
                                          }}
                                        >
                                          {removeRelation}
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                            {baseWordIndex <
                              this.state.relatedTerms.length - 1 ? (
                              <hr />
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )
              }
            </div>

            <div className="seeAlsoBox">
              {this.state.seeAlsoWords.length !== 0 && <hr />}
              {this.state.seeAlsoWords.length !== 0 &&
                (
                  <div className="seeAlsoWordsBox mt3">
                    <b>{seeAlso}</b>
                    {this.state.seeAlsoWords.map((eachWord, eachWordIndex) => (
                      <span
                        className="seeAlsoWord"
                        onClick={() => this.changeSearchedWord(eachWord)}
                        key={eachWordIndex}
                      >
                        {eachWord["label"] +
                          (eachWordIndex !== this.state.seeAlsoWords.length - 1
                            ? ", "
                            : ""
                          )
                        }
                      </span>
                    ))}
                  </div>
                )
              }
            </div>
          </main>
        </article>
      )
    );
  }
}

export default Results;
