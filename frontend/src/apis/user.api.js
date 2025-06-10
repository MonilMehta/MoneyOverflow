import API from "./server.api.js";

export const register = `${API}/users/register`;
export const login = `${API}/users/login`;
export const currentUser = `${API}/users/current-user`;
export const logout = `${API}/users/logout`;
export const refreshToken = `${API}/users/refresh-token`;
export const changePassword = `${API}/users/change-password`;
export const updateDetails = `${API}/users/update-details`;
export const subscribe = `${API}/users/subscribe`;