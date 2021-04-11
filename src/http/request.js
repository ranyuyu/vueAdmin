import axios from './index'

export function  postApi (url, param, callback) {
    console.log(url);
    axios.post(url, param).then(data => {
        callback(data)
    })
}



