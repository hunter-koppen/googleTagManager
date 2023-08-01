import { InitializeGTM } from "./components/InitializeGTM";
import { createElement } from "react";

export function GoogleTagManager({
    gtmId,
    sendCustomProps,
    pageViewEventName,
    sendPageTitle,
    sendModuleLocation,
    sendPageURL,
    sendSessionID,
    sendAdditionalProps,
    additionalProps
}) {
    return (
        <InitializeGTM
            gtmId={gtmId}
            sendCustomProps={sendCustomProps}
            pageViewEventName={pageViewEventName}
            sendPageTitle={sendPageTitle}
            sendModuleLocation={sendModuleLocation}
            sendPageURL={sendPageURL}
            sendSessionID={sendSessionID}
            sendAdditionalProps={sendAdditionalProps}
            additionalProps={additionalProps}
        />
    );
}
