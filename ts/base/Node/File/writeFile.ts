import path from 'path'
import { writeFile } from 'fs/promises'

let res = '1'

/**
 * @writefile
 * 
 * flag	行为
 * 'w'覆写（默认），文件不存在则创建
 * 'a'追加，文件不存在则创建
 * 'wx'排他写入，文件已存在则抛出错误
 * 'ax'排他追加，文件已存在则抛出错误
 */
await writeFile('write.md', res, { flag: 'a', encoding: 'utf8' });