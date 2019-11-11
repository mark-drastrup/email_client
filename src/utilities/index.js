export const extractHeader = (headers, type) => {
  let headerValue = "";
  headers.forEach(header => {
    if (header.name === type) {
      headerValue = header.value;
    }
  });
  return headerValue;
};
