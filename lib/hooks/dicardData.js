"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discardData = void 0;
const discardData = async (context) => {
    const { data, additionalData } = context;
    for (let i in data) {
        if (i in additionalData) {
            delete data[i];
        }
    }
    context.data = data;
};
exports.discardData = discardData;
//# sourceMappingURL=dicardData.js.map