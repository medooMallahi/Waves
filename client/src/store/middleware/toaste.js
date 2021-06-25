const toast = (store) => (next) => (action) => {
  if (action.type === "error") console.log("Error Has occurred");
  else next(action);
};

export default toast;
