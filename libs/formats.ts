export function isEmailFormat(email: string) {
  if (!email || typeof email !== "string") return false;
  const splited = email.split("@");
  if (splited.length !== 2) return false;
  const [nameString, mailString] = splited;
  if (nameString.length < 2) return false;
  const mailSplited = mailString.split(".");
  if (mailSplited.length !== 2) return false;
  const [mailName, mailDomain] = mailSplited;
  if (mailName.length < 2 || mailDomain.length < 2) return false;
  return true;
}

export const specials = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "_",
  "+",
  "~",
  "-",
  "=",
  ":",
  ";",
  "?",
  ",",
];

// 특수문자: !@#$%^&*_+~-=:;?,.
// 숫자: 0~9
// 영문: a~z, A~Z
export function isPasswordFormat(password: string) {
  let hasSpecial = false;
  let hasNumber = false;
  let hasLower = false;
  let hasUpper = false;
  for (const char of password) {
    if ("!@#$%^&*_+~-=:;?,.".includes(char)) hasSpecial = true;
    if ("0123456789".includes(char)) hasNumber = true;
    if ("abcdefghijklmnopqrstuvwxyz".includes(char)) hasLower = true;
    if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)) hasUpper = true;
    if (hasSpecial && hasNumber && hasLower && hasUpper) return true;
  }
  return false;
}
