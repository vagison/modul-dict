import React from "react";
import AsyncSelect from "react-select/async";
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
          this.props.setDirection(data["direction"], () => {
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
          });
        })
        .catch((error) => {
          console.log(error, "error occurred");
        });
    }
  };

  onWordSelect = (selectedWord) => {
    if (selectedWord !== "") {
      this.setState(
        {
          selectedWord,
        },
      );
      this.props.setSearchedWord(selectedWord);
    }
  };

  render() {
    const { title, searchPlaceholder } =
      this.state.labels[this.props.interfaceLanguage];

    const colourStyles = {
      control: (styles) => ({ ...styles, backgroundColor: "green" }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
      <article className="br3 ba b--black-10 pa0 pa3-ns mv2 w-90 w-80-m w-60-l mw7 shadow-5 center searchBox">
        <main className="pa3 pa4-ns mw6 center black-60">
          <h1 className="f3 f1-ns fw6">{title}</h1>
          <AsyncSelect
            className="input-reset ba bg-transparent w-100 asyncSelectField"
            value={this.state.selectedWord}
            loadOptions={this.searchWord}
            styles={colourStyles}
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
