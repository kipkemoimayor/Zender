"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceDoc = void 0;
const toPdf_1 = require("./toPdf");
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
const replaceDoc = (replacements, fileName, outputName, fileType = 'docx') => {
    // Load the docx file as binary content
    const content = fs.readFileSync(path.resolve(__dirname, `../../public/templates/${fileName}`), 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
    });
    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render(replacements);
    const buf = doc.getZip().generate({
        type: 'nodebuffer',
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: 'DEFLATE'
    });
    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    fs.writeFileSync(path.resolve(__dirname, `../../public/templates/${outputName}.${fileType}`), buf);
    (0, toPdf_1.convertToPdf)(outputName, outputName);
};
exports.replaceDoc = replaceDoc;
//# sourceMappingURL=replaceDoc.js.map