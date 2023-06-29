import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

const generatePDF = async (data: any[]) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const titleFontSize = 20;
  const subtitleFontSize = 16;
  const columnFontSize = 12;
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const title = 'Reportes de Buses Universidad Nacional';
  const subtitle = 'Cierre de ventas';


  const titleWidth = fontBold.widthOfTextAtSize(title, titleFontSize);
  const titleX = (page.getWidth() - titleWidth) / 2;
  let titleY = page.getHeight() - 50;
  page.drawText(title, { x: titleX, y: titleY, size: titleFontSize, font: fontBold });


  const spaceAfterTitle = 15;
  titleY -= spaceAfterTitle;


  const subtitleColor = rgb(0, 0, 1);
  const subtitleX = 50;
  const subtitleY = titleY - 2 * titleFontSize;
  page.drawText(subtitle, { x: subtitleX, y: subtitleY, size: subtitleFontSize, font: fontRegular, color: subtitleColor });

  let x = 50;
  let y = subtitleY - 20;

  const spaceAfterSubtitle = 15;
  y -= spaceAfterSubtitle;

  const columnSpacing = 117;

  page.drawText('Fecha', { x, y, size: columnFontSize, font: fontBold });
  x += columnSpacing;
  page.drawText('Ruta', { x, y, size: columnFontSize, font: fontBold });
  x += columnSpacing;
  page.drawText('Destinatario', { x, y, size: columnFontSize, font: fontBold });
  x += columnSpacing;
  page.drawText('Código', { x, y, size: columnFontSize, font: fontBold });

  x = 50;
  y -= 20;


  for (const item of data) {
    page.drawText(item.fecha.toLocaleDateString(), { x, y, size: columnFontSize, font: fontRegular });
    x += columnSpacing;
    page.drawText(item.ruta, { x, y, size: columnFontSize, font: fontRegular });
    x += columnSpacing;
    page.drawText(item.destinatario, { x, y, size: columnFontSize, font: fontRegular });
    x += columnSpacing;
    page.drawText(item.id, { x, y, size: columnFontSize, font: fontRegular });

    x = 50;
    y -= 20;
  }

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

  saveAs(pdfBlob, 'reporte.pdf');
};

export default generatePDF;
