"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHtmlToPdf = exports.replaceHtml = exports.replaceExcel = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const html_pdf_node_1 = __importDefault(require("html-pdf-node"));
const replaceExcel = (html, outputName) => {
    // Load an XLSX file into memory
    let options = { height: '1700px', width: '1103px', printBackground: true, pageRanges: '1-1' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    // or //
    html_pdf_node_1.default.generatePdf(html, options, function (err, buffer) {
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, `../../public/templates/${outputName}.${'pdf'}`), buffer);
    });
};
exports.replaceExcel = replaceExcel;
const replaceHtml = (replacements) => {
    const file = fs_1.default.readFileSync(path_1.default.resolve(__dirname, `../../public/templates/ipf.html`), 'utf8');
    const template = handlebars_1.default.compile(file);
    return template(replacements);
};
exports.replaceHtml = replaceHtml;
const convertHtmlToPdf = () => { };
exports.convertHtmlToPdf = convertHtmlToPdf;
//# sourceMappingURL=replaceExcel.js.map