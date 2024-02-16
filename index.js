import { getF1Data } from "./api.js";
// import { setDOM } from "./dom";

getF1Data
  .then((res) => {
    // mapping of results
    console.log(res);
    // setDOM(res);
  })
  .catch(console.error)
  .finally(() => {
    // cleanup
  });
