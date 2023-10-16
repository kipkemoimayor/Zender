"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToPdf = void 0;
const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
const convertToPdf = (fileName, fileId, extn = 'docx') => {
    async function main() {
        const ext = '.pdf';
        const inputPath = path.resolve(__dirname, `../../public/templates/${fileName}.${extn}`);
        const outputPath = path.resolve(__dirname, `../../public/templates/${fileId}${ext}`);
        // Read file
        const docxBuf = await fs.readFile(inputPath);
        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
        // Here in done you have pdf file which you can save or transfer in another stream
        await fs.writeFile(outputPath, pdfBuf);
    }
    main().catch(function (err) {
        console.log(`Error converting file: ${err}`);
    });
};
exports.convertToPdf = convertToPdf;
//# sourceMappingURL=toPdf.js.map