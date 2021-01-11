const createElementFromString = (string) => {
  const template = document.createElement('div');
  template.insertAdjacentHTML('beforeend', string);
  return template.firstElementChild;
};

export default createElementFromString;
