import ReactCountryFlag from "react-country-flag";

function ArmeniaFlag() {
  return (
    <div>
      <ReactCountryFlag
        countryCode="AM"
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
        title="AM"
      />
    </div>
  );
}

export default ArmeniaFlag;
