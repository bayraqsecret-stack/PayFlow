let check = null;

function generateCheck() {
    const id = "PF-" + Math.floor(Math.random() * 1000000);
    const date = new Date().toLocaleString();

    check = {
        id: id,
        date: date
    };

    document.getElementById("checkBox").innerHTML =
        "<b>Цифрлық чек</b><br>" +
        "ID: " + id + "<br>" +
        "Күні: " + date + "<br>" +
        "Статус: Төлем расталды";

    document.getElementById("qrBox").innerHTML = "";
    new QRCode(document.getElementById("qrBox"), id);
}

function downloadPDF() {
    if (!check) {
        alert("Алдымен чек жасаңыз");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.text("PayFlow – Цифрлық чек", 10, 10);
    pdf.text("ID: " + check.id, 10, 20);
    pdf.text("Күні: " + check.date, 10, 30);
    pdf.text("Статус: Төлем расталды", 10, 40);

    pdf.save(check.id + ".pdf");
}

function validateCheck() {
    const input = document.getElementById("checkIdInput").value;
    const result = document.getElementById("validationResult");

    if (!check) {
        result.innerText = "Алдымен чек жасаңыз";
        return;
    }

    if (input === check.id) {
        result.innerText = "✅ Чек дұрыс, расталды";
        result.style.color = "green";
    } else {
        result.innerText = "❌ Чек табылмады";
        result.style.color = "red";
    }
}
