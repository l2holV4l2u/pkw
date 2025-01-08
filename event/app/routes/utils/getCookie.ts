export function getCookie(cookies: string) {
  const match = cookies.match(/(?:^|;\s*)EventManager=([^;]*)/) || "";
  return JSON.parse(decodeURIComponent(match[1]));
}
