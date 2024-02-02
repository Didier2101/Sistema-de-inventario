import { validacionFormLogin } from "./validacionFormularios.js";
import { manipulacionDom } from "./manipulacionDom.js";
import { global } from "./global.js";


document.addEventListener("DOMContentLoaded",() =>{
  validacionFormLogin();
  manipulacionDom();
  global();
});