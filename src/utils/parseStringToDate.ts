const parseStringToDate = (input: string | undefined) => {
  if (input) {
    const serializedInput = input?.split(/[/-]/gi).map((item) => {
      return Number(item);
    });

    const output = new Date(
      serializedInput[2],
      serializedInput[1] - 1,
      serializedInput[0]
    );

    return output;
  }
};

export default parseStringToDate;
