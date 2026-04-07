// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 5000);

// Quiz Logic
let currentTab = 0;
const questions = [
    { q: "What is your full name?", type: "text", name: "name" },
    { q: "What is your WhatsApp number?", type: "tel", name: "phone" },
    { q: "Primary Travel Goal?", type: "select", name: "goal", options: ["Tourist/Leisure", "Yacht Crew - Joining", "Yacht Crew - Dockwalking", "H-2A Agricultural", "Business/Nomad"] },
    { q: "Desired Destination?", type: "select", name: "dest", options: ["USA", "UK", "Schengen/Europe", "Australia", "Other"] },
    { q: "Passport Status?", type: "select", name: "passport", options: ["Valid SA Passport", "Needs Renewal", "Foreign Passport"] },
    { q: "Visa History?", type: "select", name: "history", options: ["No previous denials", "One previous denial", "Multiple/Recent denials"] },
    { q: "Criminal Background?", type: "select", name: "record", options: ["No record", "Minor/Traffic offense", "Serious/Pending case"] },
    { q: "Professional Status?", type: "select", name: "job", options: ["Employed", "Business Owner", "Student", "Unemployed/Freelancer"] },
    { q: "Financial Readiness?", type: "select", name: "funds", options: ["I have sufficient personal funds", "I have a financial sponsor", "I am currently saving"] },
    { q: "Travel Timeline?", type: "select", name: "time", options: ["Urgent <30 days", "1-3 months", "Just planning"] }
];

function showTab(n) {
    const quizSteps = document.getElementById("quiz-steps");
    const q = questions[n];
    let html = `<h3>${q.q}</h3>`;
    
    if (q.type === "select") {
        html += `<select id="ans-${n}">`;
        q.options.forEach(opt => html += `<option value="${opt}">${opt}</option>`);
        html += `</select>`;
    } else {
        html += `<input type="${q.type}" id="ans-${n}" placeholder="Your answer here...">`;
    }
    
    quizSteps.innerHTML = html;
    document.getElementById("prevBtn").style.display = n == 0 ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML = n == (questions.length - 1) ? "Submit Assessment" : "Next";
}

function nextPrev(n) {
    if (n == 1 && !validateForm()) return false;
    currentTab = currentTab + n;
    if (currentTab >= questions.length) {
        submitForm();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    const val = document.getElementById(`ans-${currentTab}`).value;
    if (val == "") return false;
    return true;
}

function submitForm() {
    let summary = "";
    questions.forEach((q, i) => {
        summary += `${q.q}: ${document.getElementById(`ans-${i}`).value}%0A`;
    });

    const name = document.getElementById("ans-0").value;
    const dest = document.getElementById("ans-3").value;
    
    // WhatsApp Redirect
    const waUrl = `https://wa.me/27794748331?text=Hi Rowan, my name is ${name}. I just finished the Vantage Visas assessment for ${dest}.%0A%0AFull Details:%0A${summary}`;
    
    window.open(waUrl, '_blank');
    document.getElementById("quiz-box").innerHTML = "<h3>Assessment Received!</h3><p>We are opening WhatsApp to connect you with an expert.</p>";
}

function scrollToQuiz() {
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
}

showTab(currentTab);
