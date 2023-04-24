import axios from "axios";
import { API_URL } from "../configs/constants";

console.log(API_URL);

/* This code exports an instance of the Axios library with a base URL set to the value of the `API_URL`
constant. This allows other modules in the application to import and use this instance to make HTTP
requests to the API server. The `export default` statement makes this instance the default export of
the module, so it can be imported using the `import` statement in other modules. */
export default axios.create({
  baseURL: API_URL,
});

//make a private axios instance here for protected api calls.
