function calculateBill() {

    let unitsInput = document.getElementById("units").value;
    let units = Number(unitsInput);

    let error = document.getElementById("error");
    let summary = document.getElementById("billSummary");

    error.innerHTML = "";
    summary.style.display = "none";

    if (unitsInput === "") {
        error.innerHTML = "⚠️ Please enter the number of units.";
        return;
    }

    if (units < 0) {
        error.innerHTML = "⚠️ Units cannot be negative.";
        return;
    }

    let bill = 0;

    if (units <= 100) {
        bill = 0;
    }
    else if (units <= 200) {
        bill = (units - 100) * 2.35;
    }
    else if (units <= 400) {
        bill = (100 * 2.35) + (units - 200) * 4.70;
    }
    else {
        bill = (100 * 2.35) +
               (200 * 4.70) +
               (units - 400) * 6.00;
    }

    document.getElementById("summaryUnits").innerHTML = units;

    document.getElementById("summaryBill").innerHTML =
        "₹" + bill.toFixed(2);

    document.getElementById("result").innerHTML =
        "Estimated Electricity Bill: ₹" + bill.toFixed(2);

    summary.style.display = "block";

    drawGraph();
}


// Appliance-wise Calculator

function calculateAppliance() {

    let appliance = document.getElementById("appliance");
    let hoursInput = document.getElementById("hours").value;
    let result = document.getElementById("applianceResult");

    if (hoursInput === "") {
        result.innerHTML =
            "⚠️ Please enter the number of hours.";
        return;
    }

    let hours = Number(hoursInput);

    if (hours < 0 || hours > 24) {
        result.innerHTML =
            "⚠️ Hours must be between 0 and 24.";
        return;
    }

    let power = Number(appliance.value);

    let dailyUnits = (power * hours) / 1000;

    let monthlyUnits = dailyUnits * 30;

    result.innerHTML =
        "⚡ Daily Usage: " +
        dailyUnits.toFixed(2) +
        " units<br>" +

        "📅 Monthly Usage: " +
        monthlyUnits.toFixed(2) +
        " units";
}


// Bill vs Units Graph

function drawGraph() {

    let canvas = document.getElementById("billChart");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let units = [100, 200, 300, 400, 500];

    let bills = [
        0,
        235,
        705,
        1175,
        1775
    ];

    let maxBill = 1775;

    // Title

    ctx.font = "bold 16px Arial";

    ctx.fillText(
        "Electricity Bill vs Units",
        150,
        25
    );


    let startX = 55;
    let bottomY = 250;
    let graphHeight = 190;
    let barWidth = 60;
    let gap = 25;


    for (let i = 0; i < units.length; i++) {

        let barHeight =
            (bills[i] / maxBill) * graphHeight;

        let x =
            startX + i * (barWidth + gap);

        let y =
            bottomY - barHeight;


        // Bar

        ctx.fillStyle = "#2196F3";

        ctx.fillRect(
            x,
            y,
            barWidth,
            barHeight
        );


        // Bill value

        ctx.fillStyle = "#000";

        ctx.font = "12px Arial";

        ctx.fillText(
            "₹" + bills[i],
            x + 5,
            y - 5
        );


        // Units value

        ctx.fillText(
            units[i] + " units",
            x,
            bottomY + 20
        );

    }


    // X-axis

    ctx.beginPath();

    ctx.moveTo(40, bottomY);

    ctx.lineTo(480, bottomY);

    ctx.stroke();

}


// Reset Calculator

function resetCalculator() {

    document.getElementById("units").value = "";

    document.getElementById("error").innerHTML = "";

    document.getElementById("billSummary").style.display =
        "none";

    document.getElementById("summaryUnits").innerHTML =
        "-";

    document.getElementById("summaryBill").innerHTML =
        "-";

    document.getElementById("result").innerHTML =
        "";

    document.getElementById("hours").value =
        "";

    document.getElementById("applianceResult").innerHTML =
        "";

}