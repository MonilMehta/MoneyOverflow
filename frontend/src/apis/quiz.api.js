import { axiosInstance } from "./server.api.js";

export const getQuestion = async (data) => {
  return await axiosInstance.post('/quiz/getQuestion', data);
};

export const checkAnswer = async (data) => {
  return await axiosInstance.post('/quiz/checkAnswer', data);
};