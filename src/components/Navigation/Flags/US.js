import ReactCountryFlag from "react-country-flag";

function USFlag() {
  return (
    <div>
      <ReactCountryFlag
        countryCode="US"
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
        title="US"
      />
    </div>
  );
}

export default USFlag;
