// create a closure to store user profile data privately
function createUserProfile() {
    let profile = {
        name: "Hira Shakeel",
        email: "shakeelh2@vcu.edu"
    };
    return {
        // return current profile
        getProfile: function() {
            return profile;
        },
        // update user name
        updateName: function(newName) {
            profile.name = newName;
        },
        // update user email
        updateEmail: function(newEmail) {
            profile.email = newEmail;
        }
    };
}
// making the user profile
const user = createUserProfile();
// validates/updates email input
function updateEmail() {
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("message");
    // checks if the email contains "@"
    if (!email.includes("@")) {
        message.textContent = "Please enter a valid email.";
        return;
    }
    // update stored email
    user.updateEmail(email);
    message.textContent = "Email updated successfully!";
}
// stores activities as an array of objects
let activities = [
    {
        date: "2025-07-01",
        activity: "Finished AWS Certification",
    },
    {
        date: "2025-07-02",
        activity: "Completed Capstone Project",
    }
];
// show activities when page loads
function displayActivities() {
    const container = document.getElementById("activityList");
    // clear existing content
    container.innerHTML = "";
    // loop activities, add to page
    activities.forEach(item => {
        container.innerHTML += `
        <div>
            <h3>${item.activity}</h3>
            <p>${item.date}</p>
        </div>
        `;

    });
}
// show activities when page loads
displayActivities();
// sort activities based on the date
activities.sort((a, b) =>
    a.date.localeCompare(b.date)
);
// convert activity data to json string
const savedData = JSON.stringify(activities);
console.log(savedData);
// convert json string to javascript object
const restoredData = JSON.parse(savedData);
console.log(restoredData);
// turn dark mode on or off
function darkMode() {
    document.body.classList.toggle("dark");
}
// fetch user data from the API
async function getUsers() {
    const display = document.getElementById("userDisplay");
    const message = document.getElementById("userMessage");

    // display loading message
    message.textContent = "Loading data...";
    display.innerHTML = "";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // check if the request was successful
        if (!response.ok) {
            throw new Error("The user data could not be loaded.");
        }

        const users = await response.json();

        // check if there are no users to display
        if (users.length === 0) {
            message.textContent = "No results found.";
            return;
        }

        // remove loading message
        message.textContent = "";

        // display each user
        users.forEach(function(user) {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");

            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
                <button class="details-button">
                    See Details
                </button>
                <div class="user-details">
                    <p><strong>Username:</strong> ${user.username}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                </div>
            `;

            const detailsButton =
                userCard.querySelector(".details-button");

            const userDetails =
                userCard.querySelector(".user-details");

            // show or hide additional user information
            detailsButton.addEventListener("click", function() {
                userDetails.classList.toggle("show-details");

                if (userDetails.classList.contains("show-details")) {
                    detailsButton.textContent = "Hide Details";
                }
                else {
                    detailsButton.textContent = "See Details";
                }
            });

            display.appendChild(userCard);
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        message.textContent =
            "Unable to load user data. Please try again.";
    }
}
// clear fetched user data
function clearUsers() {
    document.getElementById("userDisplay").innerHTML = "";
    document.getElementById("userMessage").textContent =
        "User data cleared.";
}
// establish Express activity elements
const activityInput = document.getElementById("activityInput");
const dateInput = document.getElementById("dateInput");
const saveActivityButton =
    document.getElementById("saveActivityButton");
const loadActivitiesButton =
    document.getElementById("loadActivitiesButton");
const activityMessage =
    document.getElementById("activityMessage");
const apiActivityList =
    document.getElementById("apiActivityList");

// load activities from the Express API
async function loadApiActivities() {
    activityMessage.textContent = "Loading activities...";
    apiActivityList.innerHTML = "";

    try {
        const response = await fetch("/api/items");

        if (!response.ok) {
            throw new Error("Activities could not be loaded.");
        }

        const data = await response.json();

        if (data.items.length === 0) {
            activityMessage.textContent = "No results found.";
            return;
        }

        activityMessage.textContent = data.message;

        data.items.forEach(function(item) {
            const activityCard = document.createElement("div");
            activityCard.classList.add("activity-card");

            activityCard.innerHTML = `
                <h3>${item.activity}</h3>
                <p>${item.date}</p>
            `;

            apiActivityList.appendChild(activityCard);
        });
    }
    catch (error) {
        console.error("Error loading activities:", error);
        activityMessage.textContent =
            "Unable to load activities. Please try again.";
    }
}

// save a new activity through the Express API
async function saveApiActivity() {
    const activity = activityInput.value.trim();
    const date = dateInput.value;

    if (activity === "" || date === "") {
        activityMessage.textContent =
            "Please enter an activity and date.";
        return;
    }

    activityMessage.textContent = "Saving activity...";

    try {
        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                activity: activity,
                date: date
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "The activity could not be saved."
            );
        }

        activityMessage.textContent = data.message;

        activityInput.value = "";
        dateInput.value = "";

        // reload the activities
        loadApiActivities();
    }
    catch (error) {
        console.error("Error saving activity:", error);
        activityMessage.textContent =
            "Unable to save the activity. Please try again.";
    }
}

// button events
loadActivitiesButton.addEventListener(
    "click",
    loadApiActivities
);

saveActivityButton.addEventListener(
    "click",
    saveApiActivity
);