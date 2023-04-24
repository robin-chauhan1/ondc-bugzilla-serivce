"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
console.log(process.env.BUGZILLA_BASE_URI);
const axiosInstance = axios_1.default.create({
    baseURL: process.env.BUGZILLA_BASE_URI, headers: { "X-BUGZILLA-API-KEY": process.env.API_KEY, "Content-Type": "application/json" }
});
exports.default = axiosInstance;