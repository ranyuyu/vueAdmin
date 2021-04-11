import axios from './index'

export function  postApi (url, param, callback) {
    console.log(url);
    axios.post(url, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}



