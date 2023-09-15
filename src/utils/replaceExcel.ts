import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'

import htmlToPdf from 'html-pdf-node'

export const replaceExcel = (html: { content: string }, outputName: string) => {
  // Load an XLSX file into memory
  let options = { height: '1700px', width: '1103px', printBackground: true, pageRanges: '1-1' }
  // Example of options with args //
  // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

  // or //
  htmlToPdf.generatePdf(html, options, function (err: any, buffer) {
    fs.writeFileSync(path.resolve(__dirname, `../../public/templates/${outputName}.${'pdf'}`), buffer)
  })
}

export const replaceHtml = (replacements: any) => {
  const file = fs.readFileSync(path.resolve(__dirname, `../../public/templates/ipf.html`), 'utf8')
  const template = Handlebars.compile(file)
  return template(replacements)
}

export const convertHtmlToPdf = () => {}
