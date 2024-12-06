// Function to fetch the data from the JSON file
async function fetchFeeData() {
    try {
        // Fetch the credits.json file
        const response = await fetch('credits.json');
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the JSON data:', error);
    }
}

// Function to calculate the fee based on the selected fund source and encash amount
async function calculateFee() {
    // Fetch the JSON data
    const data = await fetchFeeData();

    if (!data) return;

    // Get the selected fund source and encash amount from the input fields
    const fundSource = document.getElementById("fundSourceSelector").value;
    const encashAmount = parseFloat(document.getElementById("encashAmountInput").value);

    // Check if the input is a valid number
    if (isNaN(encashAmount) || encashAmount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    // Check if a fund source is selected
    if (fundSource === "Fund Source" || !data[fundSource]) {
        alert("Please select a valid fund source");
        return;
    }

    // Retrieve the fee data for the selected fund source
    const fundData = data[fundSource].fees;
    const processingTime = data[fundSource].processingTime;

    // Calculate the fee
    let feePercent = 0;
    let deductionAmount = 0;
    
    // Iterate through the fee tiers to find the correct percentage
    for (let i = 0; i < fundData.length; i++) {
        const feeTier = fundData[i];
        if ((encashAmount >= feeTier.min) && (feeTier.max === null || encashAmount <= feeTier.max)) {
            feePercent = feeTier.percent;
            deductionAmount = encashAmount * feePercent;
            break;
        }
    }

    // Calculate the amount to receive
    const toReceive = encashAmount - deductionAmount;

    // Results
    document.getElementById("encashAmount").textContent = `₱ ${encashAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("conversionFee").textContent = `₱ ${deductionAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${(feePercent * 100).toFixed(2)}%)`; 
    document.getElementById("toReceive").textContent = `₱ ${toReceive.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("processingTime").textContent = processingTime;
    
}
