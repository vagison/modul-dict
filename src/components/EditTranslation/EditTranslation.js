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

  // // change part of speech
  onPOSChange = (currentlySelectedPOS) => {
    if (currentlySelectedPOS) {
      this.setState({
        pos: currentlySelectedPOS,
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
  onFieldChange = (fields) => {
    if (fields) {
      this.setState({
        fields,
      });
    }
  };

  // // examples
  // append examples
  appendExamples = (fnc) => {
    fnc();
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
      .then((res) => {
        this.setState({ status: res["status"] });
      })
      .then(() => {
        if (this.state.status === 304) {
          alert(
            `${this.state.labels[this.props.interfaceLanguage]["existingWord"]}`
          );
        } else if (this.state.status === 401) {
          alert(
            `${
              this.state.labels[this.props.interfaceLanguage]["incorrectUser"]
            }`
          );
        } else if (this.state.status === 500) {
          alert(
            `${
              this.state.labels[this.props.interfaceLanguage]["incorrectData"]
            }`
          );
        } else {
          this.props.onRouteChange("home");
        }
      })
      .catch((error) => {
        console.log(error, "error occurred");
      });
  };

  render() {
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
      <article className="br3 ba b--black-10 pa2 pa3-ns mb4 mv2-ns w-90 w-80-m w-60-l mw7 shadow-5 center editTranslationBox">
        <main className="pa4 pb0 mw7 center black-60">
          <h1 className="f4 f2-m f1-l fw6">{title}</h1>
          <form className="" onSubmit={this.updateTranslation}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              {/* english word */}
              <div className="mt3">
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
              <div className="mt3">
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
              <div className="mt3 posBox">
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
              <div className="mt3">
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
              <div className="mt3">
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
              <div className="mt3">
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
              <div className="mt3">
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
              <div className="mt3">
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
              <div className="mt3">
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

              {/* examples */}
              {this.state.examples.map((example, idx) => (
                <div key={idx}>
                  <div className="mt3">
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
                  <div className="mt3">
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

              {/* append example */}
              <button
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib ma2"
                type="button"
                onClick={() => {
                  this.appendExamples(() => {
                    this.setState({
                      examples: this.state.examples.concat({
                        englishExample: "",
                        armenianExample: "",
                      }),
                    });
                  });
                }}
              >
                {addExamples}
              </button>
            </fieldset>

            <div className="buttonBox">
              <button
                className="b ph3 mr1 pv2 input-reset ba b--black-10 bg-transparent bg-light-yellow grow pointer f5 dib"
                type="button"
                onClick={this.resetFields}
              >
                {resetFields}
              </button>

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
