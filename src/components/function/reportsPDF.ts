import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

const generatePDF = async (data: any[]) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  let x = 50;
  let y = page.getHeight() - 50;


  const fontSize = 12;
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  
  page.drawText('Fecha', { x, y, size: fontSize, font });
  x += 100;
  page.drawText('Ruta', { x, y, size: fontSize, font });
  x += 100;
  page.drawText('Código', { x, y, size: fontSize, font });

  
  x = 50;
  y -= 20;


  for (const item of data) {
    page.drawText(item.fecha.toLocaleDateString(), { x, y, size: fontSize, font });
    x += 100;
    page.drawText(item.ruta, { x, y, size: fontSize, font });
    x += 100;
    page.drawText(item.id, { x, y, size: fontSize, font });

    x = 50;
    y -= 20;
  }


  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });


  saveAs(pdfBlob, 'reporte.pdf');
};

export default generatePDF;
