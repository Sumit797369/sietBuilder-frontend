import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { Sandpack } from "@codesandbox/sandpack-react";

const Preview = () => {
const { slug } = useParams();
const [website, setWebsite] = useState(null);

useEffect(() => {
const fetchWebsite = async () => {
try {
const { data } = await axios.get(`${serverUrl}/api/website/${slug}`);
setWebsite(data);
} catch (err) {
console.error(err);
}
};

fetchWebsite();

}, [slug]);

if (!website) {
return ( <div className="h-screen bg-black text-white flex items-center justify-center">
Loading... </div>
);
}

let files = {};

try {
const parsed = JSON.parse(website.latesCode);

parsed.files.forEach((file) => {
  files[`/${file.path}`] = {
    code: file.content,
  };
});

} catch (e) {
console.error(e);
}

return ( <div className="h-screen">
<Sandpack
template="static"
files={files}
options={{
showNavigator: true,
showTabs: true,
showLineNumbers: true,
editorHeight: "100vh",
}}
/> </div>
);
};

export default Preview;
