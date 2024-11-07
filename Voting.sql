Create Database voting;
Use Voting;
Select * FROM student;
select * from Candidates;
select * from admin;
insert into admin
values("7759792e-d9d8-49d4-9d25-908c3836c4c2","$2a$12$uF3AFmAfWbesT1/AikdtF.NRzA4fSazYeMZrC7hH6xqTDYPvN2leG");
 -- password noob123

-- manage candidates script
/*
    document.addEventListener("DOMContentLoaded", function() {
        fetch('/api/admin/checkLoginStatus')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.json);
                return response.json();
            })
            .then(data => {
                if (!data.loggedIn) {
                    window.location.href = "adminlogin/adminlogin.html";
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                window.location.href = "adminlogin/adminlogin.html";
            });
    });
    */
select * from votes;
    