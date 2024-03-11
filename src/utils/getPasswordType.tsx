export const getPasswordType = (length: number): string => {
  let html = <></>;
  for (let index = 0; index < length; index++) {
    html += <span className="w-4 h-4 rounded-full bg-white"></span>;
  }

  return html;
};
