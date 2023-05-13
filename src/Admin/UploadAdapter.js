import {link} from '../Utils/Link';
import axios from 'axios';
// Custom Upload Adapter
export class UploadAdapter {
    constructor(loader) {
      this.loader = loader
    }
    async upload() {
      return this.loader.file.then((file) => {
        const data = new FormData()
        data.append("fileToUpload", file)
        const genericError = `Couldn't upload file : ${file.name}.`

        return axios({
          data,
          method: "POST",
          url: link+"upload.php",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            this.loader.uploadTotal = progressEvent.total
            this.loader.uploaded = progressEvent.loaded
            const uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          },
        })
          .then((response) => ({ default: link+"/uploads/"+response.data.result }))
          .catch(({ error }) => Promise.reject(error?.message ?? genericError));
      })
    }
  
    abort() {
      return Promise.reject()
    }
  }
  export default function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new UploadAdapter( loader );
    };
}
