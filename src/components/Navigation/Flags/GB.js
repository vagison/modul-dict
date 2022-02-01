import ReactCountryFlag from "react-country-flag";

function GreatBritainFlag() {
  return (
    <div>
      <ReactCountryFlag
        countryCode="GB"
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
        title="GB"
      />
    </div>
  );
}

export default GreatBritainFlag;
