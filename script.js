function formatCurrency(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function createMoneyFall() {
    const money = document.createElement('div');
    money.classList.add('money');
    money.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(money);

    // Remove the element after animation completes
    setTimeout(() => {
        money.remove();
    }, 3000);
}

function calculateRatios() {
    const decisionMakers = document.getElementById('decision-makers').value;
    const doorsKnocked = document.getElementById('doors-knocked').value;
    const appointmentsSet = document.getElementById('appointments-set').value;
    const dealsClosed = document.getElementById('deals-closed').value;
    const avgCommission = document.getElementById('avg-commission').value;
    const desiredCommission = document.getElementById('desired-commission').value;

    // Check if all values are provided
    if (!decisionMakers || !doorsKnocked || !appointmentsSet || !dealsClosed || !avgCommission || !desiredCommission) {
        alert('Please fill out all fields.');
        return;
    }

    // Convert input values to numbers
    const decisionMakersNum = parseFloat(decisionMakers);
    const doorsKnockedNum = parseFloat(doorsKnocked);
    const appointmentsSetNum = parseFloat(appointmentsSet);
    const dealsClosedNum = parseFloat(dealsClosed);
    const avgCommissionNum = parseFloat(avgCommission);
    const desiredCommissionNum = parseFloat(desiredCommission);

    // Calculate the number of deals required to reach the desired commission
    const desiredDeals = Math.ceil(desiredCommissionNum / avgCommissionNum);

    // Calculate the necessary ratios
    const dmToDealsRatio = dealsClosedNum / decisionMakersNum;
    const doorsToDealsRatio = dealsClosedNum / doorsKnockedNum;
    const apptToDealsRatio = dealsClosedNum / appointmentsSetNum;

    // Calculate the required actions to achieve the desired number of deals
    const requiredDecisionMakers = Math.ceil(desiredDeals / dmToDealsRatio);
    const requiredDoors = Math.ceil(desiredDeals / doorsToDealsRatio);
    const requiredAppointments = Math.ceil(desiredDeals / apptToDealsRatio);

    // Display the results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>To earn a total commission of $${formatCurrency(desiredCommissionNum)}, you need to:</p>
        <ul>
            <li>Close ${desiredDeals} deals</li>
            <li>Speak to ${requiredDecisionMakers} decision makers</li>
            <li>Knock on ${requiredDoors} doors</li>
            <li>Set ${requiredAppointments} appointments</li>
        </ul>
    `;

    // Show results with animation
    resultsDiv.classList.add('visible');
    resultsDiv.scrollIntoView({ behavior: 'smooth' });

    // Create falling money effect
    for (let i = 0; i < 20; i++) {
        setTimeout(createMoneyFall, i * 100);
    }
}