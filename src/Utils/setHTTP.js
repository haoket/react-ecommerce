import { link } from './Link';
export default function SetHTTP(urlImage) {
    if (urlImage.includes('http')) {
        return urlImage
    } else {
        return link + urlImage
    }
}

