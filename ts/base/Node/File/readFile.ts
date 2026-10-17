import { readFile } from 'fs/promises'
import path from 'path'


/**
 * @base64
 * 只适合小图，打包随html一起，体积比img大
 * 
 */
if (process.argv[2] === 'image') {
    let image1 = await readFile(path.join(import.meta.dirname, '/image/image.png'), 'base64url')
    console.log(image1)
}

/**
 * @utf8
 */
let code = await readFile(hostjs_path, 'utf8')
code = JSON.stringify(code)

