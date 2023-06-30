import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

export const generatePDF = async (cod: string, hig: number, wig: number, all: number, date: Date,
  w: number, rd: number, rm: string) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  // Cargar la fuente estándar
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Agregar contenido a la página con estilos
  page.drawText('Factura de encomienda', { x: 50, y: height - 50, size: 24, font });

  page.drawText(`Número de factura: ${cod}`, { x: 50, y: height - 100, size: 12, font });
  page.drawText(`Fecha: ${date}`, { x: 50, y: height - 120, size: 12, font });

  // Agregar detalles de productos con estilos
  let y = height - 200;

  if (rd <= 100) {
    page.drawText("Encomienda", { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    page.drawText(`Alto precio: ${hig * 2 + 220} colones`, { x: 75, y: y - 20, size: 12, font });
    page.drawText(`Ancho precio: ${wig * 3 + 750} colones`, { x: 75, y: y - 40, size: 12, font });
    page.drawText(`Peso precio: ${w * 3 + 300} colones`, { x: 75, y: y - 60, size: 12, font });
    page.drawText(`Ruta ${rm} precio: ${100} colones`, { x: 75, y: y - 80, size: 12, font });
  } else if (rd > 100 && rd <= 299) {
    page.drawText("Encomienda", { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    page.drawText(`Alto precio: ${hig * 2 + 220} colones`, { x: 75, y: y - 20, size: 12, font });
    page.drawText(`Ancho precio: ${wig * 3 + 750} colones`, { x: 75, y: y - 40, size: 12, font });
    page.drawText(`Peso precio: ${w * 3 + 300} colones`, { x: 75, y: y - 60, size: 12, font });
    page.drawText(`Ruta ${rm} precio: ${400} colones`, { x: 75, y: y - 80, size: 12, font });
  } else if (rd >= 300) {
    page.drawText("Encomienda", { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    page.drawText(`Alto precio: ${hig * 2 + 220} colones`, { x: 75, y: y - 20, size: 12, font });
    page.drawText(`Ancho precio: ${wig * 3 + 750} colones`, { x: 75, y: y - 40, size: 12, font });
    page.drawText(`Peso precio: ${w * 3 + 300} colones`, { x: 75, y: y - 60, size: 12, font });
    page.drawText(`Ruta ${rm} precio: ${800} colones`, { x: 75, y: y - 80, size: 12, font });
  }

  y -= 120;

  page.drawText(`Total de factura: ${all} colones`, { x: 50, y, size: 12, font });

  // Guardar el documento PDF en un Blob
  const pdfBytes = await pdfDoc.save();

  // Descargar el archivo PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, 'factura.pdf');
  alert("Se registro la encomienda")
  window.location.reload();
};



