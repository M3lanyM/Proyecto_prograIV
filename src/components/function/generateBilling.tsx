import { PDFDocument, PDFFont, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

export const generatePDF = async (cod:string,hig:number,wig:number,all:number,date:Date,w:number) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  // Agregar contenido a la página
  page.drawText('Factura', { x: 50, y: height - 50, size: 24, });

  page.drawText(`Número de factura: ${cod}`, { x: 50, y: height - 100, size: 12,  });
  page.drawText(`Fecha: ${date}`, { x: 50, y: height - 120, size: 12,});

  // Agregar detalles de productos
  let y = height - 200;
    page.drawText("Encomienda", { x: 50, y, size: 12,  });
    page.drawText(`Alto: ${hig}`, { x: 150, y, size: 12,});
    page.drawText(`ancho: ${wig}`, { x: 250, y, size: 12, });
    page.drawText(`Peso: ${w}`, { x: 350, y, size: 12, });

    y -= 20;

  page.drawText(`Total de factura: ${all}`, { x: 50, y: y - 20, size: 12, });

  // Guardar el documento PDF en un Blob
  const pdfBytes = await pdfDoc.save();

  // Descargar el archivo PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, 'factura.pdf');
};