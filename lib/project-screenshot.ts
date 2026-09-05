export function resolveProjectScreenshot(screenshotUrl: string) {
  if (/^(https?:\/\/|\/)/.test(screenshotUrl)) return screenshotUrl;

  const localPath = screenshotUrl.replace(/^\.\//, "");
  return `/api/project-screenshot?path=${encodeURIComponent(localPath)}`;
}
