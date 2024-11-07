// Navigation handling
 // Check if the user is logged in before the site loads
  (function() {
             const loggedInUser = sessionStorage.getItem('loggedInUser');
             if (!loggedInUser) {
                 window.location.href = '/'; // Redirect to login page if not logged in
             }
         })();

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        return; // Stop further execution if not logged in
    }

 // Fetch candidates and populate the vote form with hover tooltips
    fetch('/candidates')
        .then(response => response.json())
        .then(data => {
            const candidatesList = document.getElementById('candidates-list');
            candidatesList.innerHTML = '';
            data.forEach(candidate => {
                const label = document.createElement('label');
                label.setAttribute('for', `candidate-${candidate.id}`);
                label.classList.add('candidate-info');

                // Add candidate radio input with hover effect for bio
                label.innerHTML = `
                    <input type="radio" id="candidate-${candidate.id}" name="candidate" value="${candidate.id}">
                    <span class="tooltip">${candidate.name}
                        <span class="tooltiptext">${candidate.details}</span>
                    </span>
                `;
                candidatesList.appendChild(label);
            });
            attachVoteClickListeners();
        })
        .catch(error => console.error('Error:', error));

    // Handle vote submission
    document.getElementById('vote-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const candidateId = document.querySelector('input[name="candidate"]:checked').value;
        const positionId = document.getElementById('position-id').value;

        try {
            const response = await fetch('/api/castVote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ candidateId, positionId })
            });

            const result = await response.text();
            if (response.ok) {
                alert("Vote cast successfully!");
                displayConfetti();
                document.querySelector('.vote-message').textContent = 'Thank you for voting!';
                document.querySelector('.hidden-message').classList.add('active');
            } else if (response.status === 401) {
                alert(result);
                window.location.href = '/';  // Redirect to the homepage for login
                return;
            } else {
                alert(result);  // Display the error message returned by the server
            }
        } catch (error) {
            console.log("An error occurred. Please report to the authorities." + error);
        }
    });
});

function displayConfetti() {
    const confettiCount = 300;
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container'); // Add the container class for positioning
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        confetti.style.animationDuration = `${Math.random() * 4 + 2}s`; // Random fall duration
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove(); // Remove the confetti container after animation ends
    }, 10000); // 10-second duration
}

// Attach click listeners to radio buttons to handle selection
function attachVoteClickListeners() {
    const labels = document.querySelectorAll('#vote-form label');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            // Remove 'selected' class from all labels
            labels.forEach(l => l.classList.remove('selected'));

            // Add 'selected' class to the clicked label
            this.classList.add('selected');
        });
    });
}
