// Show signup form
function openSignup() {
    document.getElementById('login-tab').style.display = 'none';
    document.getElementById('signup-tab').style.display = 'block';
}

// Show login form
function openLogin() {
    document.getElementById('signup-tab').style.display = 'none';
    document.getElementById('login-tab').style.display = 'block';
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('login-mail-id').value;
    const password = document.getElementById('login-password').value;

    try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ email, password })
            });

            const result = await response.text();

            if (response.ok) {
                alert("Login successful!");
                sessionStorage.setItem('loggedInUser', email); // Store user email in session storage
                window.location.href = '/castvotepage/castevote.html';  // Redirect to the dashboard or home page after successful login
            } else {
                alert(result);  // Display the error message returned by the server
            }
    } catch (error) {
        alert("An error occurred. Please try again.");
    }
});

document.getElementById('get-verification-code').addEventListener('click', async function() {
    const email = document.getElementById('signup-mail-id').value;
    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    try {
        const sendVerificationResponse = await fetch(`/sendVerification?email=${encodeURIComponent(email)}`);
        const sendVerificationResult = await sendVerificationResponse.text();

        if (sendVerificationResponse.ok) {
            alert("Verification code sent! Please check your email.");
        } else {
            alert("Failed to send verification email. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    }

    // Disable the button for 1 minute
    document.getElementById('get-verification-code').disabled = true;
    setTimeout(function() {
        document.getElementById('get-verification-code').disabled = false;
    }, 60000);
});

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('signup-mail-id').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const mobile = document.getElementById('mobile').value;
    const verificationCode = document.getElementById('verification-code').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    try {
        // Verify the code
        const verifyCodeResponse = await fetch(`/verifyCode?email=${encodeURIComponent(email)}&code=${encodeURIComponent(verificationCode)}`);
        const verifyCodeResult = await verifyCodeResponse.text();

        if (verifyCodeResponse.ok && verifyCodeResult === "Email verified successfully!") {
            // Proceed with signup
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, mobile })
            });

            const result = await response.text();

            if (response.ok) {
                alert("Sign up successful! You can now log in.");
                openLogin();
            } else {
                alert(result); // Display the error message from the backend
            }
        } else {
            alert("Invalid verification code. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    }
});


