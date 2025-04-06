document.addEventListener("DOMContentLoaded", function () {
    let menu = document.querySelector("#menu-bar i");
    let navbar = document.querySelector(".navbar");
    let userData = {};
    let accountNumber = "";

    menu.onclick = () => {
        menu.classList.toggle("fa-times");
        navbar.classList.toggle("active");
    };

    window.onscroll = () => {
        menu.classList.remove("fa-times");
        navbar.classList.remove("active");
    };

    // --- Registration ---
    const registerBtn = document.getElementById("register");
    const registerModal = document.getElementById("registerModal");
    const closeBtn = document.querySelector(".close");
    const registerForm = document.getElementById("registerForm");

    registerBtn.addEventListener("click", function () {
        registerModal.style.display = "block";
    });

    function closeModal() {
        registerModal.style.display = "none";
    }

    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === registerModal) {
            closeModal();
        }
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const age = document.getElementById("age").value;
        const address = document.getElementById("address").value;
        const password = document.getElementById("password").value;

        accountNumber = generateAccountNumber();

        userData = {
            name,
            email,
            age,
            address,
            password,
            accountNumber,
            balance: 0
        };

        console.log("✅ User Registered:", userData);

       
        const successMessage = document.createElement("p");
        successMessage.id = "successMessage";
        successMessage.textContent = "✅ Registration Successful!";
        successMessage.style.color = "green";
        successMessage.style.textAlign = "center";
        successMessage.style.fontWeight = "bold";
        successMessage.style.marginTop = "20px";

        registerForm.parentNode.insertBefore(successMessage, registerForm);
        registerForm.reset();

        setTimeout(() => {
            successMessage.remove();
            closeModal();
        }, 3000);
    });

    window.closeModal = closeModal;

    // --- Login ---
    const loginLink = document.getElementById("loginLink");
    const loginModal = document.getElementById("loginModal");
    const closeLoginBtn = loginModal.querySelector(".close");
    const loginForm = document.getElementById("loginForm");

    loginLink.addEventListener("click", function () {
        loginModal.style.display = "block";
    });

    function closeLoginModal() {
        loginModal.style.display = "none";
    }

    closeLoginBtn.addEventListener("click", closeLoginModal);

    window.addEventListener("click", function (event) {
        if (event.target === loginModal) {
            closeLoginModal();
        }
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;

        if (loginEmail === userData.email && loginPassword === userData.password) {
            alert(`Login successful!\nYour account number is: ${userData.accountNumber}`);
            console.log("✅ User Logged In:", { email: loginEmail, accountNumber: userData.accountNumber });

            const loginSuccessMessage = document.createElement("p");
            loginSuccessMessage.id = "loginSuccessMessage";
            loginSuccessMessage.textContent = "✅ Login Successful!";
            loginSuccessMessage.style.color = "green";
            loginSuccessMessage.style.textAlign = "center";
            loginSuccessMessage.style.fontWeight = "bold";
            loginSuccessMessage.style.marginTop = "20px";

            loginForm.parentNode.insertBefore(loginSuccessMessage, loginForm);

            setTimeout(() => {
                loginSuccessMessage.remove();
                closeLoginModal();
            }, 3000);
        } else {
            alert("Login failed! Please check your email and password.");
            console.warn("❌ Login Failed for:", loginEmail);
        }

        loginForm.reset();
    });

    function generateAccountNumber() {
        return Math.floor(100 + Math.random() * 900).toString();
    }

    // --- Check Balance ---
    const checkBtn = document.getElementById("check");
    const checkBalanceSection = document.getElementById("checkBalanceSection");
   
    const checkBalanceForm = document.getElementById("checkBalanceForm");
    const balanceResult = document.getElementById("balanceResult");

    checkBtn.addEventListener("click", () => {
        checkBalanceSection.style.display = "flex";
        balanceResult.textContent = "";
    });

    
    checkBalanceForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("balanceEmail").value.trim();
        const name = document.getElementById("balanceName").value.trim();
        const accNo = document.getElementById("balanceAccNo").value.trim();

        console.log("🔍 Checking balance for:", { email, name, accNo });

        if (
            email === userData.email &&
            name.toLowerCase() === userData.name.toLowerCase() &&
            accNo === userData.accountNumber
        ) {
            balanceResult.style.color = "green";
            balanceResult.textContent = `Your balance is ₹${userData.balance}`;
            console.log("✅ Balance Match: ₹" + userData.balance);
        } else {
            balanceResult.style.color = "red";
            balanceResult.textContent = "Account not found or information incorrect.";
            console.warn("❌ Balance Check Failed: User not found or info mismatch");
        }
    });
    
   // --- Deposit Money ---
const depositBtn = document.getElementById("deposit");
const depositBalanceSection = document.getElementById("depositBalanceSection");
const depositBalanceForm = document.getElementById("depositBalanceForm");
const depositResult = depositBalanceSection.querySelector("#depositResult");

depositBtn.addEventListener("click", () => {
    depositBalanceSection.style.display = "flex";
    checkBalanceSection.style.display = "none";
    depositResult.textContent = "";
});

depositBalanceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("depositEmail").value.trim();
    const name = document.getElementById("depositName").value.trim();
    const accNo = document.getElementById("depositAccNo").value.trim();
    const amount = parseFloat(document.getElementById("depositAmount").value);

    if (
        email === userData.email &&
        name.toLowerCase() === userData.name.toLowerCase() &&
        accNo === userData.accountNumber
    ) {
        if (!isNaN(amount) && amount > 0) {
            userData.balance += amount;

            console.log(`💰 ₹${amount} deposited successfully.`);
            console.log(`📊 Updated Balance: ₹${userData.balance}`);

            depositResult.style.color = "green";
            depositResult.textContent = `₹${amount} deposited successfully. New Balance: ₹${userData.balance}`;
        } else {
            alert("❌ Please enter a valid deposit amount.");
        }
    } else {
        depositResult.style.color = "red";
        depositResult.textContent = "Account not found or incorrect information.";
        console.warn("❌ Deposit Failed: Info mismatch.");
    }

    depositBalanceForm.reset();
})
 // --- Withdraw Money ---
 const withdrawBtn = document.getElementById("withdraw");
 const withdrawBalanceSection = document.getElementById("withdrawBalanceSection");
 const withdrawBalanceForm = document.getElementById("withdrawBalanceForm");
 const withdrawResult = document.querySelector("#withdrawResult");
 
 withdrawBtn.addEventListener("click", () => {
     withdrawBalanceSection.style.display = "flex";
     checkBalanceSection.style.display = "none";
     withdrawResult.textContent = "";
 });
 
 withdrawBalanceForm.addEventListener("submit", (e) => {
     e.preventDefault();
 
     const email = document.getElementById("withdrawEmail").value.trim();
     const name = document.getElementById("withdrawName").value.trim();
     const accNo = document.getElementById("withdrawAccNo").value.trim();
     const amount = parseFloat(document.getElementById("withdrawAmount").value);
 
     if (
         email === userData.email &&
         name.toLowerCase() === userData.name.toLowerCase() &&
         accNo === userData.accountNumber
     ) {
         if (!isNaN(amount) && amount > 0) {
            if (amount > userData.balance) {
                 withdrawResult.style.color = "red";
                withdrawResult.textContent = "❌ Insufficient funds."
             }else{
                 userData.balance -= amount;
                 console.log(`💰 ₹${amount} withdraw successfully.`);
                 console.log(`📊 Updated Balance: ₹${userData.balance}`);
                 withdrawResult.style.color = "green";
                 withdrawResult.textContent = `₹${amount} withdraw successfully. New Balance: ₹${userData.balance}`;
             } 
 
 
         } else {
             alert("❌ Please enter a valid withdraw amount.");
         }
     } else {
        withdrawResult.style.color = "red";
        withdrawResult.textContent = "Account not found or incorrect information.";
         console.warn("❌ Withdraw Failed: Info mismatch.");
     }
 
     withdrawBalanceForm.reset();
 })
 //  Contact Us
 // --- Contact Form ---
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
const contactSection = document.getElementById("contactSection");
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("message").value.trim();

    console.log("📩 Contact Message Sent:", { name, email, message });

    contactStatus.style.color = "green";
    contactStatus.textContent = "✅ Your message has been sent! We'll get back to you shortly.";

    contactForm.reset();

    setTimeout(() => {
        contactStatus.textContent = "";
    }, 4000);
});
});

 

