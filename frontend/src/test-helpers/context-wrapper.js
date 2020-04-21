import React, { useState } from 'react';

const isAuthenticated = false;
const setIsAuthenticated = false;

export const setAuthenticated = (data) => {
  localStorage.setItem("isAuthenticated", data);
  setIsAuthenticated(data);
}

export const setJWTToken = (token) => {
  localStorage.setItem("token", token);
}

export const getJWTToken = () => {
  return localStorage.getItem('token');
}

export const deleteJWTToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAuthenticated');
}
