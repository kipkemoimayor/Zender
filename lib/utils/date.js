"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeDate = exports.addMonth = void 0;
const _1 = __importDefault(require("."));
const addMonth = (date, month) => {
    date = date.split('/').reverse().join('-');
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + month);
    return _1.default.fomartDate(newDate.toLocaleDateString());
};
exports.addMonth = addMonth;
const changeDate = (date, type) => {
    const changeDate = new Date(date);
    if (type == 'endDay') {
        changeDate.setHours(23);
        changeDate.setMinutes(59);
        changeDate.setSeconds(59);
    }
    else {
        changeDate.setHours(0);
        changeDate.setMinutes(0);
        changeDate.setSeconds(0);
    }
    return changeDate;
};
exports.changeDate = changeDate;
//# sourceMappingURL=date.js.map