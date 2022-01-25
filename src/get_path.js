import path from "path"
import url from "url"

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);
export { __filename };
export default __dirname;

