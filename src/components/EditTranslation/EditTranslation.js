import React from "react";
import update from "react-addons-update";
import AsyncSelect from "react-select/async";

import { editTranslationLabels } from "../../util/labels/labels";
import "./EditTranslation.css";

class EditTranslation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: editTranslationLabels,
      translationId: this.props.currentTranslation["translationId"],
      oldEnglishWordId: this.props.currentTranslation["englishWordId"],
      oldArmenianWordId: this.props.currentTranslation["armenianWordId"],
      englishWord: this.props.currentTranslation["englishWord"],
      armenianWord: this.props.currentTranslation["armenianWord"],
      pos: this.props.currentTranslation["pos"],
      qualityEngArm: this.props.currentTranslation["qualityEngArm"],
      qualityArmEng: this.props.currentTranslation["qualityArmEng"],
      fields: this.props.currentTranslation["fields"]
        ? this.props.currentTranslation["fields"]
        : [],
      pronunciation: this.props.currentTranslation["pronunciation"]
        ? this.props.currentTranslation["pronunciation"]
        : "",
      abbreviationEng: this.props.currentTranslation["abbreviationEng"]
        ? this.props.currentTranslation["abbreviationEng"]
        : "",
      abbreviationArm: this.props.currentTranslation["abbreviationArm"]
        ? this.props.currentTranslation["abbreviationArm"]
        : "",
      examples: this.props.currentTranslation["examples"]
        ? this.props.currentTranslation["examples"]
        : [],
    };
  }

  // // resetFields
  resetFields = () => {
    this.setState({
      translationId: this.props.currentTranslation["translationId"],
      oldEnglishWordId: this.props.currentTranslation["englishWordId"],
      oldArmenianWordId: this.props.currentTranslation["armenianWordId"],
      englishWord: this.props.currentTranslation["englishWord"],
      armenianWord: this.props.currentTranslation["armenianWord"],
      pos: this.props.currentTranslation["pos"],
      qualityEngArm: this.props.currentTranslation["qualityEngArm"],
      qualityArmEng: this.props.currentTranslation["qualityArmEng"],
      fields: this.props.currentTranslation["fields"]
        ? this.props.currentTranslation["fields"]
        : [],
      pronunciation: this.props.currentTranslation["pronunciation"]
        ? this.props.currentTranslation["pronunciation"]
        : "",
      abbreviationEng: this.props.currentTranslation["abbreviationEng"]
        ? this.props.currentTranslation["abbreviationEng"]
        : "",
      abbreviationArm: this.props.currentTranslation["abbreviationArm"]
        ? this.props.currentTranslation["abbreviationArm"]
        : "",
      examples: this.props.currentTranslation["examples"]
        ? this.props.currentTranslation["examples"]
        : [],
    });
  };

  // // parameter change
  onParamChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // // part of speech
  // search part of speech
  searchPOS = (inputValue, callback) => {
    fetch("https://modul-dictionary-api.herokuapp.com/search-pos", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchedPOS: inputValue,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const tempArray = [];
        if (data) {
          if (data.length) {
            data.forEach((element) => {
              tempArray.push({
                label: element.pos,
                value: element.id,
              });
            });
          }
        }
        callback(tempArray);
      })
      .catch((error) => {
        console.log(error, "error occurred");
      });
  };
  // change part of speech
  onPOSChange = (selectedPOS) => {
    if (selectedPOS) {
      this.setState({
        pos: selectedPOS,
      });
    }
  };

  // // field
  // search field
  searchField = (inputValue, callback) => {
    fetch("https://modul-dictionary-api.herokuapp.com/search-field", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchedField: inputValue,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const tempArray = [];
        if (data) {
          if (data.length) {
            data.forEach((element) => {
              tempArray.push({
                label: element.field,
                value: element.id,
              });
            });
          }
        }
        callback(tempArray);
      })
      .catch((error) => {
        console.log(error, "error occurred");
      });
  };
  // change field
  onFieldChange = (selectedFields) => {
    if (selectedFields) {
      this.setState({
        fields: selectedFields,
      });
    }
  };

  // // examples
  // append examples
  appendExamples = () => {
    this.setState({
      examples: this.state.examples.concat({
        englishExample: "",
        armenianExample: "",
      }),
    });
  };
  // armenian example change
  onArmenianExampleChange = (event) => {
    this.setState({
      examples: update(this.state.examples, {
        [event.target.name]: { armenianExample: { $set: event.target.value } },
      }),
    });
  };
  // english example change
  onEnglishExampleChange = (event) => {
    this.setState({
      examples: update(this.state.examples, {
        [event.target.name]: { englishExample: { $set: event.target.value } },
      }),
    });
  };

  // //translation update
  updateTranslation = (event) => {
    event.preventDefault();
    fetch("https://modul-dictionary-api.herokuapp.com/update-translation", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token: document.cookie.split("=", 2)[1],
        translationId: this.state.translationId,
        oldEnglishWordId: this.state.oldEnglishWordId,
        oldArmenianWordId: this.state.oldArmenianWordId,
        englishWord: this.state.englishWord,
        armenianWord: this.state.armenianWord,
        pos: this.state.pos["value"],
        qualityEngArm: Number(this.state.qualityEngArm),
        qualityArmEng: Number(this.state.qualityArmEng),
        fields: this.state.fields,
        pronunciation: this.state.pronunciation,
        abbreviationEng: this.state.abbreviationEng,
        abbreviationArm: this.state.abbreviationArm,
        examples: this.state.examples,
      }),
    })
    // setting fetch status
    .then((res) => {
      this.setState({ status: res["status"] });
    })
    // handling cases
    .then(() => {
      // existing word
      if (this.state.status === 304) {
        alert(
          `${this.state.labels[this.props.interfaceLanguage]["existingWord"]}`
        );
      }
      // incorrect user
      else if (this.state.status === 401) {
        alert(
          `${
            this.state.labels[this.props.interfaceLanguage]["incorrectUser"]
          }`
        );
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.props.setLogIn(false);
        this.props.onRouteChange("signin")
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

  render() {
    // labels
    const {
      title,
      englishWord,
      armenianWord,
      partOfSpeech,
      englishArmenianQuality,
      armenianEnglishQuality,
      fields,
      pronunciation,
      englishAbbreviation,
      armenianAbbreviation,
      englishExampleNo,
      armenianExampleNo,
      addExamples,
      resetFields,
      updateTranslation,
    } = this.state.labels[this.props.interfaceLanguage];

    return (
      <article className="br3 ba b--black-10 pa3-ns mb4 mv2-ns w-90 w-80-m w-60-l mw7 shadow-5 center editTranslationBox">
        <main className="pa3 pv2 pa4-ns pv2-ns center black-60">
          <h1 className="f3 f1-ns fw6">{title}</h1>
          <form className="" onSubmit={this.updateTranslation}>
            {/* translation fields */}
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              {/* english word */}
              <div className="mb3">
                <label className="db fw6 lh-copy f6">{englishWord}</label>
                <input
                  value={this.state.englishWord}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="text"
                  name="englishWord"
                  id="englishWord"
                  required
                  onChange={this.onParamChange}
                />
              </div>

              {/* armenian word */}
              <div className="mb3">
                <label className="db fw6 lh-copy f6">{armenianWord}</label>
                <input
                  value={this.state.armenianWord}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="text"
                  name="armenianWord"
                  id="armenianWord"
                  required
                  onChange={this.onParamChange}
                />
              </div>

              {/* part of speech */}
              <div className="mb3 posBox">
                <label className="db fw6 lh-copy f6">{partOfSpeech}</label>
                <AsyncSelect
                  className="input-reset ba bg-transparent w-100 asyncSelectField"
                  value={this.state.pos}
                  loadOptions={this.searchPOS}
                  onChange={(changedPOS) => {
                    this.onPOSChange(changedPOS);
                  }}
                  defaultOptions={true}
                />
              </div>

              {/* english->armenian quality */}
              <div className="mb3">
                <label className="db fw6 lh-copy f6">
                  {englishArmenianQuality}
                </label>
                <input
                  value={this.state.qualityEngArm}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="number"
                  name="qualityEngArm"
                  min="1"
                  max="10"
                  id="qualityEngArm"
                  onChange={this.onParamChange}
                />
              </div>

              {/* armenian->english quality */}
              <div className="mb3">
                <label className="db fw6 lh-copy f6">
                  {armenianEnglishQuality}
                </label>
                <input
                  value={this.state.qualityArmEng}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="number"
                  name="qualityArmEng"
                  min="1"
                  max="10"
                  id="qualityArmEng"
                  onChange={this.onParamChange}
                />
              </div>

              {/* fields */}
              <div className="mb3">
                <label className="db fw6 lh-copy f6">{fields}</label>
                <AsyncSelect
                  isMulti
                  className="input-reset ba bg-transparent w-100 asyncSelectField"
                  value={this.state.fields}
                  loadOptions={this.searchField}
                  onChange={(fields) => {
                    this.onFieldChange(fields);
                  }}
                  defaultOptions={true}
                />
              </div>

              {/* pronunciation */}
              <div className="mb3">
                <label className="db fw6 lh-copy f6">{pronunciation}</label>
                <input
                  value={this.state.pronunciation}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="text"
                  name="pronunciation"
                  id="pronunciation"
                  onChange={this.onParamChange}
                />
              </div>

              {/* abbreviation english */}
              <div className="mb3">
                <label className="db fw6 lh-copy f6">
                  {englishAbbreviation}
                </label>
                <input
                  value={this.state.abbreviationEng}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="text"
                  name="abbreviationEng"
                  id="abbreviationEng"
                  onChange={this.onParamChange}
                />
              </div>

              {/* abbreviation armenian */}
              <div className="mb3">
                <label className="db fw6 lh-copy f6">
                  {armenianAbbreviation}
                </label>
                <input
                  value={this.state.abbreviationArm}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="text"
                  name="abbreviationArm"
                  id="abbreviationArm"
                  onChange={this.onParamChange}
                />
              </div>

              {/* existing examples */}
              {this.state.examples.map((example, idx) => (
                <div key={idx}>
                  <div className="mb3">
                    <label className="db fw6 lh-copy f6">
                      {englishExampleNo} {idx + 1}
                    </label>
                    <input
                      value={example["englishExample"]}
                      className="pa2 input-reset ba bg-transparent w-100"
                      type="text"
                      name={idx}
                      other="englishExample"
                      id={"englishExampleNo".concat(idx)}
                      onChange={this.onEnglishExampleChange}
                    />
                  </div>
                  <div className="mb3">
                    <label className="db fw6 lh-copy f6">
                      {armenianExampleNo} {idx + 1}
                    </label>
                    <input
                      value={example["armenianExample"]}
                      className="pa2 input-reset ba bg-transparent w-100"
                      type="text"
                      name={idx}
                      other="armenianExample"
                      id={"armenianExampleNo".concat(idx)}
                      onChange={this.onArmenianExampleChange}
                    />
                  </div>
                </div>
              ))}

              {/* append examples */}
              <button
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib ma2"
                type="button"
                onClick={this.appendExamples}
              >
                {addExamples}
              </button>
            </fieldset>

            {/* reset fields and update translation buttons */}
            <div className="buttonBox">
              {/* reset fields */}
              <button
                className="b ph3 mr1 pv2 input-reset ba b--black-10 bg-transparent bg-light-yellow grow pointer f5 dib"
                type="button"
                onClick={this.resetFields}
              >
                {resetFields}
              </button>
              {/* update translation */}
              <button
                className="b ph3 ml1 pv2 input-reset ba b--black-10 bg-transparent bg-light-blue grow pointer f5 dib"
                type="submit"
              >
                {updateTranslation}
              </button>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default EditTranslation;
