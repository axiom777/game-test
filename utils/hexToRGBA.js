export function hexToRGBA(hex, alpha) {
  hex = ("" + hex).trim().replace(/#/g, ""); //trim and remove any leading # if there (supports number values as well)
  if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) throw "not a valid hex string"; //Regex Validator
  if (hex.length == 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  } //support short form
  var b_int = parseInt(hex, 16);
  return (
    "rgba(" +
    [
      (b_int >> 16) & 255, //R
      (b_int >> 8) & 255, //G
      b_int & 255, //B
      alpha ?? 1, //add alpha if is set
    ].join(",") +
    ")"
  );
}

