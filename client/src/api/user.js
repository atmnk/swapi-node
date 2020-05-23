import { getApiUrl } from "../utils/apiUrls";
import axios from '../axios/index'
import _, { isEmpty } from "underscore";

export default class User {

    async login(data) {
        return await axios.post(getApiUrl("LOGIN"), data);
    }
}