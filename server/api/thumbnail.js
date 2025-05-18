import { getImageSrc } from "../actions/scrapper";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const pageUrl = body.link;
    const src = await getImageSrc(pageUrl);
    return {
        link: src
    };
})