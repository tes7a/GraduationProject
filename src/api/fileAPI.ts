import {instance} from "./authAPI";

export const fileAPI = {
    uploadPhoto(file:FormData){
        return instance.post('https://dry-forest-56016.herokuapp.com/file', file);
    }
}