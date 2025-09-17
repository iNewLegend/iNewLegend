import { fullstackConfig } from "@inewlegend/website/src/configs/fullstack";
import { frontendConfig } from "@inewlegend/website/src/configs/frontend";

type Variant = "fullstack" | "frontend";

function selectVariant(): Variant {
    const v = ( import.meta as unknown as { env: Record<string, string | undefined> } ).env?.VITE_WEBSITE_PROFILE as Variant | undefined;
    if ( v === "frontend" ) return "frontend";
    return "fullstack";
}

const selected = selectVariant();

export const config = selected === "frontend" ? frontendConfig : fullstackConfig;
