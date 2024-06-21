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
