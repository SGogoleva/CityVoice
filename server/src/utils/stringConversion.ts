const stringToBoolean = (stringValue: string) => {
  switch (stringValue.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;

    case "false":
    case "no":
    case "0":
      return false;

    default:
      throw new Error(`Invalid string: ${stringValue}`);
  }
};

export default stringToBoolean;
