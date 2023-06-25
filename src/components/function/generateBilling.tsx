import { PDFDocument, PDFFont, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

export const generatePDF = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  // Agregar contenido a la página
  page.drawText('Factura', { x: 50, y: height - 50, size: 24, });

  page.drawText(`Número de factura: ${datosFactura.numeroFactura}`, { x: 50, y: height - 100, size: 12,  });
  page.drawText(`Fecha: ${datosFactura.fecha}`, { x: 50, y: height - 120, size: 12,});

  // Agregar detalles de productos
  let y = height - 200;
  for (const producto of datosFactura.productos) {
    page.drawText(producto.nombre, { x: 50, y, size: 12,  });
    page.drawText(`Precio: ${producto.precio}`, { x: 150, y, size: 12,});
    page.drawText(`Cantidad: ${producto.cantidad}`, { x: 250, y, size: 12, });
    page.drawText(`Total: ${producto.total}`, { x: 350, y, size: 12, });

    y -= 20;
  }

  page.drawText(`Total factura: ${datosFactura.totalFactura}`, { x: 50, y: y - 20, size: 12, });

  // Guardar el documento PDF en un Blob
  const pdfBytes = await pdfDoc.save();

  // Descargar el archivo PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, 'factura.pdf');
};

// Datos de ejemplo para la factura
const datosFactura = {
  numeroFactura: '001',
  fecha: '2023-06-24',
  productos: [
    { nombre: 'Producto 1', precio: 10, cantidad: 2, total: 20 },
    { nombre: 'Producto 2', precio: 15, cantidad: 3, total: 45 },
    { nombre: 'Producto 3', precio: 8, cantidad: 1, total: 8 },
  ],
  totalFactura: 73,
};