import ReactCountryFlag from "react-country-flag";

function GreatBritainFlag() {
  return (
    <ReactCountryFlag
      countryCode="GB"
      svg
      style={{
        width: "1.5em",
        height: "1.5em",
      }}
      title="GB"
    />
  );
}

export default GreatBritainFlag;
