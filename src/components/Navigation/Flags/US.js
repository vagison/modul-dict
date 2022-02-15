import ReactCountryFlag from "react-country-flag";

function USFlag() {
  return (
    <ReactCountryFlag
      countryCode="US"
      svg
      style={{
        width: "1.5em",
        height: "1.5em",
      }}
      title="US"
    />
  );
}

export default USFlag;
