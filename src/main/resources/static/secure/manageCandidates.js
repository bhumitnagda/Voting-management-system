document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/admin/checkLoginStatus')
        .then(response => response.json())
        .then(data => {
            if (!data.loggedIn) {
                window.location.href = "adminlogin/adminlogin.html";
            } else {
                fetchCandidates();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = "adminlogin/adminlogin.html";
        });

    const addCandidateBtn = document.getElementById("addCandidateBtn");
    const candidateNameInput = document.getElementById("candidateName");
    const candidateAgeInput = document.getElementById("candidateAge");
    const candidateList = document.getElementById("candidateList");
    const candidateDetailsInput = document.getElementById("candidateDetails");
    const logoutBtn = document.querySelector(".logout-btn");

    // Add candidate event
    addCandidateBtn.addEventListener("click", () => {
        const candidateName = candidateNameInput.value.trim();
        const candidateAge = parseInt(candidateAgeInput.value.trim());
        const candidateDetails = candidateDetailsInput.value.trim();

        if (candidateName && candidateAge && candidateDetails) {
            addCandidate({ name: candidateName, details: candidateDetails, age: candidateAge });
        } else {
            alert("Please enter candidate name, details and age.");
        }
    });

    // Logout event
    logoutBtn.addEventListener("click", () => {
        fetch('/api/admin/logout', { method: 'POST' })
            .then(() => {
                window.location.href = "/adminlogin/adminlogin.html";
            })
            .catch(error => console.error('Logout error:', error));
    });

    function fetchCandidates() {
        fetch('/candidates')
            .then(response => response.json())
            .then(candidates => {
                candidateList.innerHTML = '';

                // Fetch vote counts and then render candidates with counts
                fetch('/candidates/voteCounts')
                    .then(response => response.json())
                    .then(voteCounts => {
                        candidates.forEach(candidate => {
                            const voteCount = voteCounts[candidate.id] || 0;
                            const listItem = createCandidateElement(candidate, voteCount);
                            candidateList.appendChild(listItem);
                        });
                    })
                    .catch(error => console.error('Error fetching vote counts:', error));
            })
            .catch(error => console.error('Error fetching candidates:', error));
    }

    // Add candidate
    function addCandidate(candidate) {
        fetch('/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidate)
        })
        .then(response => response.json())
        .then(addedCandidate => {
            const listItem = createCandidateElement(addedCandidate, 0);
            candidateList.appendChild(listItem);
            candidateNameInput.value = '';
            candidateAgeInput.value = '';
            candidateDetailsInput.value = '';
        })
        .catch(error => console.error('Error adding candidate:', error));
    }

    // Create a candidate list item
    function createCandidateElement(candidate, voteCount) {
        const listItem = document.createElement("li");
        listItem.className = "candidate-item";
        listItem.innerHTML = `
            <span>Name: ${candidate.name}, Age: ${candidate.age}, Votes: ${voteCount}</span>
            <button class="delete-btn" data-id="${candidate.id}">Delete</button>
        `;
        const deleteButton = listItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            deleteCandidate(candidate.id, listItem);
        });
        return listItem;
    }

    // Delete candidate
    function deleteCandidate(candidateId, listItem) {
        fetch(`/candidates/${candidateId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                listItem.remove();
            } else {
                console.error('Error deleting candidate');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});