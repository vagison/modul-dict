import React from "react";
import AsyncSelect from "react-select/async";

import Logo from "../Logo/Logo";
import { searchLabels } from "../../util/labels/labels";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: searchLabels,
      selectedWord: "",
    };
  }

  searchWord = (inputValue, callback) => {
    if (inputValue) {
      fetch("https://modul-dictionary-api.herokuapp.com/search-word", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchedWord: inputValue,
        }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          this.props.setDirection(data["direction"]);
          return data;
        })
        .then((data) => {
          const tempArray = [];
          if (data["collection"]) {
            if (data["collection"].length !== 0) {
              data["collection"].forEach((element) => {
                tempArray.push({
                  type: element.type,
                  label: element.label,
                  value: element.ids,
                });
              });
            }
          }
          callback(tempArray);
        })
        .catch((error) => {
          console.log(error, "error occurred");
        });
    }
  };

  onWordSelect = (selectedWord) => {
    if (selectedWord !== "") {
      this.setState({ selectedWord });
      this.props.setSearchedWord(selectedWord);
    }
  };

  render() {
    // labels
    const { title, searchPlaceholder } =
      this.state.labels[this.props.interfaceLanguage];

    // word type coloring style (word and abbreviation)
    const wordTypeStyles = {
      control: (styles) => ({ ...styles, backgroundColor: "green" }),
      option: (styles, { data, isFocused }) => {
        const color = "#ffffff00";
        return {
          ...styles,
          backgroundColor: isFocused
            ? "powderblue"
            : data["type"] === "abbreviation"
            ? "lightgray"
            : color,
        };
      },
    };

    return (
      <article className="br3 ba b--black-10 pa3-ns mv2 w-90 w-80-m w-60-l mw7 shadow-5 center searchBox">
        <div className="pt4 pb2 ph5 ph6-ns mw6 center">
          <Logo />
        </div>
        <main className="pa3 mw6 center black-60">
          {/* <h1 className="f3 f1-ns fw6">{title}</h1> */}
          <AsyncSelect
            components={{
              LoadingIndicator: null,
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            className="input-reset ba bg-transparent w-100 asyncSelectField"
            value={""}
            loadOptions={this.searchWord}
            styles={wordTypeStyles}
            placeholder={searchPlaceholder}
            onChange={(selectedWord) => {
              this.onWordSelect(selectedWord);
            }}
            defaultOptions={true}
          />
        </main>
      </article>
    );
  }
}

export default Search;
