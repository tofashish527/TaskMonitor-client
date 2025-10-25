
import axios from 'axios';
import React from 'react';

const axiosInstance= axios.create({
  baseURL: `https://b11a12-server-side-tofashish527.vercel.app/`,
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;