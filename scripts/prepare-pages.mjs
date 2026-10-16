import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

const exportedImage = resolve("out", "opengraph-image");
const publicImage = resolve("out", "opengraph-image.png");

copyFileSync(exportedImage, publicImage);
