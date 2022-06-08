import PDFDocument from "pdfkit";
import fs from "fs";

const config = {
  font: 'Times-Roman',
  size: "A4",
  margin: 20
};

export function generateHelloWorldPDF() {
  const doc = new PDFDocument(config);

  doc.fontSize(16);
  doc.text('Hello world!');
  doc.fontSize(12);

  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';
  const bullet = `\n A) Something \n B) Something else \n C) Something else again but in this case this stuff is too large so it can't be shown in a single line \n`;

  doc.moveDown();
  doc.fontSize(12);
  doc.text(`This text is left aligned. ${lorem}`, {
    align: 'left'
  });

  doc.moveDown();
  doc.fontSize(16);
  doc.text('Columns auto-flow');
  doc.fontSize(12);

  doc.moveDown();
  const text = `This text is in two columns. ${lorem} ${lorem} ${lorem} ${bullet} ${lorem} ${bullet} ${bullet} ${bullet} ${bullet}`;
  const columnGap = 25;
  const columns = 2;
  const fullWidth = doc.page.width - doc.page.margins.right;
  const columnWidth = (fullWidth - (columnGap * (columns - 1))) / columns;
  const textHighInOneColumn = doc.heightOfString(text, { width: columnWidth });
  doc.text(text, {
    columns,
    columnGap,
    height: textHighInOneColumn / 2
  });

  doc.moveDown();
  doc.text(`This text is normal. ${lorem} ${bullet}`);

  doc.pipe(fs.createWriteStream('./outputs/hello-world.pdf')); // write to PDF
  doc.end(); // finalize the PDF and end the stream
}
