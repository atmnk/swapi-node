import { getApiUrl } from "../utils/apiUrls";
import axios from '../axios/index'
import _, { isEmpty } from "underscore";

export default class Persona {

    async get_all() {
        return await axios.get(getApiUrl("GET_ALL_PERSONAS"));
    }
}