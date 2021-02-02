import express from 'express';
import httpStatus from 'http-status';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

export {
    express,
    httpStatus,
    validator,
    jwt,
    moment,
    uuid
};
