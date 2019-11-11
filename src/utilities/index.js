export const extractHeader = (headers, type) => {
  let headerValue = "";
  headers.forEach(header => {
    if (header.name === type) {
      headerValue = header.value;
    }
  });
  return headerValue;
};

export const decodeMessageBody = message => {
  let encodedBody = "";
  if (message.result.payload.parts === undefined) {
    encodedBody = message.result.payload.body.data;
  } else {
    encodedBody = extractHTMLPart(message.result.payload.parts);
  }

  encodedBody = encodedBody
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/\s/g, "");
  return decodeURIComponent(escape(window.atob(encodedBody)));
};

const extractHTMLPart = arr => {
  for (var x = 0; x <= arr.length; x++) {
    if (typeof arr[x].parts === "undefined") {
      if (arr[x].mimeType === "text/html") {
        return arr[x].body.data;
      }
    } else {
      return extractHTMLPart(arr[x].parts);
    }
  }
  return "";
};
