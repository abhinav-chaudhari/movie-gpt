export const LOGO = "https://imgs.search.brave.com/n3sLYiMh3B3K2yWETMHO_QUUmaDnDfidiPyu03vr5q8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1Mjku/cG5n";

export const PHOTOURL = "https://nextflix-azure.vercel.app/assets/avatar.png";

export const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
        "Bearer "+ process.env.REACT_APP_TMDB_KEY
    }

}

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BG_IMG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/d253acf4-a1e2-4462-a416-f78802dc2d85/f04bf88c-f71c-4d02-82ed-adb870b8f8db/IN-en-20240429-POP_SIGNUP_TWO_WEEKS-perspective_WEB_658a042e-62cf-473d-8da0-7b875f23e2ef_small.jpg";

export const SUPPORTED_LANGUAGES = [
    {identifier: "en", name: "English"},
    {identifier: "marathi", name: "Marathi"},
    {identifier: "hindi", name: "Hindi"},
    {identifier: "spanish", name: "Spanish"}
]

export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;