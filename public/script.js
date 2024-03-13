document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const response = await fetch("/users/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        const errorMsg = document.querySelector(".error-msg");
        errorMsg.innerHTML = data.errors[0].msg;
      } else {
        const responseData = await response.json();
        const user_id = responseData.user_id;
        localStorage.setItem("user_id", user_id);
        window.location.href = "/recipes";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        const errorList = document.querySelector(".error-list");
        errorList.innerHTML = "";
        const li = document.createElement("li");
        li.textContent = data.error;
        errorList.appendChild(li);
      } else {
        const responseData = await response.json();
        localStorage.setItem("user_id", responseData.user_id);
        localStorage.setItem("token", responseData.token);

        window.location.href = "/recipes";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
