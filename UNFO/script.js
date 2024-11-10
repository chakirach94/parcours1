let totalUF = 0;
let totalRaces = 0;

function addRaceForm() {
    const animalType = document.getElementById("animalType").value;
    const raceForm = document.createElement("div");
    raceForm.classList.add("race-form");

    // Unique ID for each race form
    const uniqueId = `race-${Date.now()}`;
    raceForm.id = uniqueId;

    raceForm.innerHTML = `
        <h3 id="${uniqueId}-title" class="race-title">
            ${capitalize(animalType)} - <span id="${uniqueId}-raceTypeText">Race Sardi</span>
            <img id="${uniqueId}-image" class="race-image" src="sardi.jpg" alt="Race Image">
            <button class="minimize-btn" onclick="toggleRaceForm('${uniqueId}')">−</button>
        </h3>

        <div class="race-details">
            <label for="${uniqueId}-raceType">Choose Race Type:</label>
            <select id="${uniqueId}-raceType" class="race-type" onchange="updateRaceImage('${uniqueId}'); showDistribution('${uniqueId}')">
                <option value="sardi">Race Sardi</option>
                <option value="timahdite">Race Timahdite</option>
                <option value="beni_guil">Beni Guil</option>
            </select>

            <label>
                <input type="checkbox" class="auto-distribute-checkbox" onchange="toggleAutoDistribute('${uniqueId}', '${animalType}')">
                Automatic Distribution
            </label>

            <div id="${uniqueId}-distribution" class="distribution-info" style="display: none;">
                <h4>Automatic Distribution Percentages:</h4>
                <p><strong>Béliers adultes:</strong> <span id="${uniqueId}-belier-percent">2.5%</span></p>
                <p><strong>Brebis adultes:</strong> <span id="${uniqueId}-brebis-adulte-percent">41%</span></p>
                <p><strong>Brebis gestantes:</strong> <span id="${uniqueId}-brebis-gestante-percent">19%</span></p>
                <p><strong>Brebis allaitantes:</strong> <span id="${uniqueId}-brebis-allaitante-percent">15%</span></p>
                <p><strong>Agneaux (1-30 jours):</strong> <span id="${uniqueId}-agneaux-1-30-percent">11%</span></p>
                <p><strong>Agneaux (30-70 jours):</strong> <span id="${uniqueId}-agneaux-30-70-percent">6%</span></p>
                <p><strong>Agnelles (30-70 jours):</strong> <span id="${uniqueId}-agnelles-30-70-percent">5.5%</span></p>
            </div>

            <div class="manual-inputs">
                <h4>Enter the number of animals by category:</h4>
                <label>Bélier adulte:</label>
                <input type="number" class="animal-count belier-adulte-count" placeholder="Enter number of Bélier adulte">

                <label>Brebis adulte:</label>
                <input type="number" class="animal-count brebis-adulte-count" placeholder="Enter number of Brebis adulte">

                <label>Brebis gestante:</label>
                <input type="number" class="animal-count brebis-gestante-count" placeholder="Enter number of Brebis gestante">

                <label>Brebis allaitante:</label>
                <input type="number" class="animal-count brebis-allaitante-count" placeholder="Enter number of Brebis allaitante">

                <label>Agneaux (1-30 jours):</label>
                <input type="number" class="animal-count agneaux-1-30-count" placeholder="Enter number of Agneaux (1-30 jours)">

                <label>Agneaux (30-70 jours):</label>
                <input type="number" class="animal-count agneaux-30-70-count" placeholder="Enter number of Agneaux (30-70 jours)">

                <label>Agnelles (30-70 jours):</label>
                <input type="number" class="animal-count agnelles-30-70-count" placeholder="Enter number of Agnelles (30-70 jours)">
            </div>

            <div class="auto-input" style="display: none;">
                <label>Total Number of Animals:</label>
                <input type="number" class="total-animals-input" placeholder="Enter total number of animals">
            </div>

            <div class="button-group">
                <button class="update-button" onclick="calculateRaceUF('${uniqueId}', '${animalType}')">Calculate UF</button>
                <button class="delete-button" onclick="deleteRaceForm('${uniqueId}')">Delete</button>
            </div>
            
            <p>UF for this race: <span class="race-uf">0</span></p>
        </div>
    `;

    document.getElementById("raceForms").appendChild(raceForm);
    updateDashboard(1, 0); // Update total races
}

function updateRaceImage(raceId) {
    const raceType = document.getElementById(`${raceId}-raceType`).value;
    const imageElement = document.getElementById(`${raceId}-image`);
    const raceTypeText = document.getElementById(`${raceId}-raceTypeText`);

    switch (raceType) {
        case "sardi":
            imageElement.src = "sardi.jpg";
            imageElement.alt = "Race Sardi";
            raceTypeText.textContent = "Race Sardi";
            break;
        case "timahdite":
            imageElement.src = "timhdit.jpeg";
            imageElement.alt = "Race Timahdite";
            raceTypeText.textContent = "Race Timahdite";
            break;
        case "beni_guil":
            imageElement.src = "beniguil.jpg";
            imageElement.alt = "Beni Guil";
            raceTypeText.textContent = "Beni Guil";
            break;
    }
    showDistribution(raceId);
}

function showDistribution(raceId) {
    const raceType = document.getElementById(`${raceId}-raceType`).value;
    const distribution = document.getElementById(`${raceId}-distribution`);

    // Show the distribution info
    distribution.style.display = "block";

    // Get UF values for the selected race type
    const ufValues = getUFPerAnimal(raceType);

    // Update percentages and UF values based on race type
    switch (raceType) {
        case "sardi":
            updateDistributionText(
                raceId,
                "2.5%", ufValues.belier,
                "41%", ufValues.brebisAdulte,
                "19%", ufValues.brebisGestante,
                "15%", ufValues.brebisAllaitante,
                "11%", ufValues.agneaux1_30,
                "6%", ufValues.agneaux30_70,
                "5.5%", ufValues.agnelles30_70
            );
            break;
        case "timahdite":
            updateDistributionText(
                raceId,
                "2.5%", ufValues.belier,
                "39%", ufValues.brebisAdulte,
                "21%", ufValues.brebisGestante,
                "16%", ufValues.brebisAllaitante,
                "10%", ufValues.agneaux1_30,
                "6%", ufValues.agneaux30_70,
                "5.5%", ufValues.agnelles30_70
            );
            break;
        case "beni_guil":
            updateDistributionText(
                raceId,
                "2.5%", ufValues.belier,
                "42%", ufValues.brebisAdulte,
                "18%", ufValues.brebisGestante,
                "14%", ufValues.brebisAllaitante,
                "11.5%", ufValues.agneaux1_30,
                "6%", ufValues.agneaux30_70,
                "6%", ufValues.agnelles30_70
            );
            break;
    }
}


function updateDistributionText(
    raceId,
    belierPercent, belierUF,
    brebisAdultePercent, brebisAdulteUF,
    brebisGestantePercent, brebisGestanteUF,
    brebisAllaitantePercent, brebisAllaitanteUF,
    agneaux1_30Percent, agneaux1_30UF,
    agneaux30_70Percent, agneaux30_70UF,
    agnelles30_70Percent, agnelles30_70UF
) {
    document.getElementById(`${raceId}-belier-percent`).textContent = `${belierPercent} (UF: ${belierUF})`;
    document.getElementById(`${raceId}-brebis-adulte-percent`).textContent = `${brebisAdultePercent} (UF: ${brebisAdulteUF})`;
    document.getElementById(`${raceId}-brebis-gestante-percent`).textContent = `${brebisGestantePercent} (UF: ${brebisGestanteUF})`;
    document.getElementById(`${raceId}-brebis-allaitante-percent`).textContent = `${brebisAllaitantePercent} (UF: ${brebisAllaitanteUF})`;
    document.getElementById(`${raceId}-agneaux-1-30-percent`).textContent = `${agneaux1_30Percent} (UF: ${agneaux1_30UF})`;
    document.getElementById(`${raceId}-agneaux-30-70-percent`).textContent = `${agneaux30_70Percent} (UF: ${agneaux30_70UF})`;
    document.getElementById(`${raceId}-agnelles-30-70-percent`).textContent = `${agnelles30_70Percent} (UF: ${agnelles30_70UF})`;
}


function toggleAutoDistribute(raceId, animalType) {
    const raceForm = document.getElementById(raceId);
    const checkbox = raceForm.querySelector('.auto-distribute-checkbox');
    const manualInputs = raceForm.querySelector('.manual-inputs');
    const autoInput = raceForm.querySelector('.auto-input');
    const distributionInfo = raceForm.querySelector('.distribution-info');

    if (checkbox.checked) {
        manualInputs.style.display = 'none';
        autoInput.style.display = 'block';
        distributionInfo.style.display = 'block';
    } else {
        manualInputs.style.display = 'block';
        autoInput.style.display = 'none';
        distributionInfo.style.display = 'none';
    }
}

function getUFPerAnimal(animalType) {
    // Map the animalType values to the UF keys
    const raceMapping = {
        "sardi": "Race Sardi",
        "timahdite": "Race Timahdite",
        "beni_guil": "Beni Guil",
        "ovin": "Race Sardi" // Default to "Race Sardi" for "ovin" if needed
    };

    // Define the UF values for each race type
    const ufValues = {
        "Race Sardi": {
            belier: 2.30,
            brebisAdulte: 1.25,
            brebisGestante: 1.60,
            brebisAllaitante: 2.10,
            agneaux1_30: 0.70,
            agneaux30_70: 1.10,
            agnelles30_70: 1.00
        },
        "Race Timahdite": {
            belier: 2.40,
            brebisAdulte: 1.30,
            brebisGestante: 1.65,
            brebisAllaitante: 2.20,
            agneaux1_30: 0.75,
            agneaux30_70: 1.20,
            agnelles30_70: 1.10
        },
        "Beni Guil": {
            belier: 2.20,
            brebisAdulte: 1.20,
            brebisGestante: 1.50,
            brebisAllaitante: 2.00,
            agneaux1_30: 0.70,
            agneaux30_70: 1.10,
            agnelles30_70: 1.00
        }
    };

    // Use the raceMapping to get the correct UF values
    const mappedType = raceMapping[animalType];
    return ufValues[mappedType] || {};
}

function calculateRaceUF(raceId, animalType) {
    const raceForm = document.getElementById(raceId);

    if (!raceForm) {
        console.error("Race form not found for ID:", raceId);
        return;
    }

    // Use the mapping to get the correct UF values
    const ufValues = getUFPerAnimal(animalType);

    if (!ufValues || Object.keys(ufValues).length === 0) {
        console.error("UF values not found for animal type:", animalType);
        return;
    }

    const isAutomatic = raceForm.querySelector('.auto-distribute-checkbox').checked;
    let belierCount, brebisAdulteCount, brebisGestanteCount, brebisAllaitanteCount, agneaux1_30Count, agneaux30_70Count, agnelles30_70Count;

    if (isAutomatic) {
        const totalAnimals = parseInt(raceForm.querySelector('.total-animals-input').value) || 0;
        belierCount = Math.round(totalAnimals * 0.025);
        brebisAdulteCount = Math.round(totalAnimals * 0.41);
        brebisGestanteCount = Math.round(totalAnimals * 0.19);
        brebisAllaitanteCount = Math.round(totalAnimals * 0.15);
        agneaux1_30Count = Math.round(totalAnimals * 0.11);
        agneaux30_70Count = Math.round(totalAnimals * 0.06);
        agnelles30_70Count = Math.round(totalAnimals * 0.055);
    } else {
        belierCount = parseInt(raceForm.querySelector('.belier-adulte-count').value) || 0;
        brebisAdulteCount = parseInt(raceForm.querySelector('.brebis-adulte-count').value) || 0;
        brebisGestanteCount = parseInt(raceForm.querySelector('.brebis-gestante-count').value) || 0;
        brebisAllaitanteCount = parseInt(raceForm.querySelector('.brebis-allaitante-count').value) || 0;
        agneaux1_30Count = parseInt(raceForm.querySelector('.agneaux-1-30-count').value) || 0;
        agneaux30_70Count = parseInt(raceForm.querySelector('.agneaux-30-70-count').value) || 0;
        agnelles30_70Count = parseInt(raceForm.querySelector('.agnelles-30-70-count').value) || 0;
    }

    const raceUFValue = (
        belierCount * ufValues.belier +
        brebisAdulteCount * ufValues.brebisAdulte +
        brebisGestanteCount * ufValues.brebisGestante +
        brebisAllaitanteCount * ufValues.brebisAllaitante +
        agneaux1_30Count * ufValues.agneaux1_30 +
        agneaux30_70Count * ufValues.agneaux30_70 +
        agnelles30_70Count * ufValues.agnelles30_70
    );

    if (isNaN(raceUFValue)) {
        console.error("Calculation error: UF value is NaN");
        return;
    }

    const raceUFDisplay = raceForm.querySelector(".race-uf");
    const previousUF = parseFloat(raceUFDisplay.textContent) || 0;
    raceUFDisplay.textContent = raceUFValue.toFixed(2);

    totalUF += raceUFValue - previousUF;
    updateDashboard(0, totalUF);
}

function calculateRaceUF(raceId) {
    const raceForm = document.getElementById(raceId);
    const raceType = document.getElementById(`${raceId}-raceType`).value;

    // Get UF values for each category based on the race type
    const ufValues = getUFPerAnimal(raceType);

    if (!ufValues || Object.keys(ufValues).length === 0) {
        console.error("UF values not found for animal type:", raceType);
        return;
    }

    const isAutomatic = raceForm.querySelector('.auto-distribute-checkbox').checked;
    let belierCount, brebisAdulteCount, brebisGestanteCount, brebisAllaitanteCount, agneaux1_30Count, agneaux30_70Count, agnelles30_70Count;

    if (isAutomatic) {
        // Get total number of animals and apply automatic distribution percentages
        const totalAnimals = parseInt(raceForm.querySelector('.total-animals-input').value) || 0;

        // Define the percentages based on the selected race type
        let belierPercent, brebisAdultePercent, brebisGestantePercent, brebisAllaitantePercent, agneaux1_30Percent, agneaux30_70Percent, agnelles30_70Percent;

        switch (raceType) {
            case "sardi":
                belierPercent = 0.025;
                brebisAdultePercent = 0.41;
                brebisGestantePercent = 0.19;
                brebisAllaitantePercent = 0.15;
                agneaux1_30Percent = 0.11;
                agneaux30_70Percent = 0.06;
                agnelles30_70Percent = 0.055;
                break;
            case "timahdite":
                belierPercent = 0.025;
                brebisAdultePercent = 0.39;
                brebisGestantePercent = 0.21;
                brebisAllaitantePercent = 0.16;
                agneaux1_30Percent = 0.10;
                agneaux30_70Percent = 0.06;
                agnelles30_70Percent = 0.055;
                break;
            case "beni_guil":
                belierPercent = 0.025;
                brebisAdultePercent = 0.42;
                brebisGestantePercent = 0.18;
                brebisAllaitantePercent = 0.14;
                agneaux1_30Percent = 0.115;
                agneaux30_70Percent = 0.06;
                agnelles30_70Percent = 0.06;
                break;
        }

        // Calculate the counts using the percentages
        belierCount = Math.round(totalAnimals * belierPercent);
        brebisAdulteCount = Math.round(totalAnimals * brebisAdultePercent);
        brebisGestanteCount = Math.round(totalAnimals * brebisGestantePercent);
        brebisAllaitanteCount = Math.round(totalAnimals * brebisAllaitantePercent);
        agneaux1_30Count = Math.round(totalAnimals * agneaux1_30Percent);
        agneaux30_70Count = Math.round(totalAnimals * agneaux30_70Percent);
        agnelles30_70Count = Math.round(totalAnimals * agnelles30_70Percent);
    } else {
        // Get the number of animals from input fields and parse them as integers (manual input)
        belierCount = parseInt(raceForm.querySelector('.belier-adulte-count').value) || 0;
        brebisAdulteCount = parseInt(raceForm.querySelector('.brebis-adulte-count').value) || 0;
        brebisGestanteCount = parseInt(raceForm.querySelector('.brebis-gestante-count').value) || 0;
        brebisAllaitanteCount = parseInt(raceForm.querySelector('.brebis-allaitante-count').value) || 0;
        agneaux1_30Count = parseInt(raceForm.querySelector('.agneaux-1-30-count').value) || 0;
        agneaux30_70Count = parseInt(raceForm.querySelector('.agneaux-30-70-count').value) || 0;
        agnelles30_70Count = parseInt(raceForm.querySelector('.agnelles-30-70-count').value) || 0;
    }

    // Calculate total UF for this race
    const raceUFValue = (
        belierCount * ufValues.belier +
        brebisAdulteCount * ufValues.brebisAdulte +
        brebisGestanteCount * ufValues.brebisGestante +
        brebisAllaitanteCount * ufValues.brebisAllaitante +
        agneaux1_30Count * ufValues.agneaux1_30 +
        agneaux30_70Count * ufValues.agneaux30_70 +
        agnelles30_70Count * ufValues.agnelles30_70
    );

    if (isNaN(raceUFValue)) {
        console.error("Calculation error: UF value is NaN");
        return;
    }

    // Update the displayed UF value for this race
    const raceUFDisplay = raceForm.querySelector(".race-uf");
    const previousUF = parseFloat(raceUFDisplay.textContent) || 0;
    raceUFDisplay.textContent = raceUFValue.toFixed(2);

    // Update the overall total UF
    totalUF += raceUFValue - previousUF;
    updateDashboard(0, totalUF);
}

function toggleRaceForm(raceId) {
    const raceForm = document.getElementById(raceId);
    const raceDetails = raceForm.querySelector(".race-details");
    const minimizeBtn = raceForm.querySelector(".minimize-btn");

    if (raceDetails.style.display === "none") {
        raceDetails.style.display = "block";
        minimizeBtn.textContent = "−";
    } else {
        raceDetails.style.display = "none";
        minimizeBtn.textContent = "+";
    }
}

function deleteRaceForm(raceId) {
    const raceForm = document.getElementById(raceId);
    const raceUFValue = parseFloat(raceForm.querySelector(".race-uf").textContent) || 0;

    totalUF -= raceUFValue;
    raceForm.remove();
    updateDashboard(-1, totalUF);
}

function updateDashboard(raceChange, ufValue) {
    totalRaces += raceChange;
    document.getElementById("totalRaces").textContent = totalRaces;
    document.getElementById("ufResult").textContent = ufValue.toFixed(2);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
