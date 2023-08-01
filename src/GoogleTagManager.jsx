import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/GoogleTagManager.css";

export function GoogleTagManager({ sampleText }) {
    return <HelloWorldSample sampleText={sampleText} />;
}
