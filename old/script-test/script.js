const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function extrairCampos() {
    // 👇 caminho corrigido
    const pdfBytes = fs.readFileSync("../ficha.pdf");

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    const fields = form.getFields();

    let resultado = "";

    fields.forEach(field => {
        const nome = field.getName();
        resultado += nome + "\n";
    });

    fs.writeFileSync("campos.txt", resultado);

    console.log("Campos extraídos com sucesso!");
}

extrairCampos();