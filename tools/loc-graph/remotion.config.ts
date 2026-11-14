import { Config } from '@remotion/cli/config';

// 输出设置
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(4);

// 本机没有 Remotion 自带的 Chrome Headless Shell 时，
// 可以直接指定一个已存在的 Chromium：
//   Config.setBrowserExecutable('/usr/bin/chromium');
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
