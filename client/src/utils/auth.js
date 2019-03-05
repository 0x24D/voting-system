export function getUserType(userType) {
  return localStorage.type && localStorage.type === userType;
}

export function isUserAuthenticated() {
  return localStorage.token;
}
