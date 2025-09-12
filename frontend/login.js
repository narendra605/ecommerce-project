window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginBtn = document.getElementById("loginBtn");
  const profileBtn = document.getElementById("profileBtn");
  const loginModal = document.getElementById("loginModal");
  const loginClose = document.getElementById("loginClose");

  // --- Show modal when login button clicked ---
  if (loginBtn && loginModal) {
    loginBtn.addEventListener("click", () => {
      loginModal.style.display = "block";
    });
  }

  // --- Close modal ---
  if (loginClose) {
    loginClose.addEventListener("click", () => {
      loginModal.style.display = "none";
    });
  }

  // --- Handle login form submit ---
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const identifier = document.getElementById("loginIdentifier")
        ? document.getElementById("loginIdentifier").value.trim()
        : document.getElementById("email").value.trim();

      const password = document.getElementById("loginPassword")
        ? document.getElementById("loginPassword").value.trim()
        : document.getElementById("password").value.trim();

      if (!identifier || !password) {
        alert("⚠️ Please enter both identifier (email/phone) and password.");
        return;
      }

      // Prepare payload
      let payload = {};
      if (identifier.includes("@")) {
        payload = { email: identifier, password: password };
      } else {
        payload = { phoneNumber: identifier, password: password };
      }

      console.log("📤 Sending payload:", payload);

      try {
        const response = await fetch("http://localhost:9091/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `❌ Login failed. Status: ${response.status} - ${response.statusText}. Server says: ${errorText}`
          );
        }

        // 👇 Check response type before parsing
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        console.log("✅ Login success:", data);

        // Show success message
        alert("🎉 " + (data.name || data || "Login successful!"));

        // Update UI
        if (loginBtn) loginBtn.style.display = "none";
        if (profileBtn) profileBtn.style.display = "inline-block";
        loginModal.style.display = "none";

      } catch (error) {
        console.error("⚠️ Login error:", error);
        alert("⚠️ " + error.message);
      }
    });
  } else {
    console.error("❌ No login form found in HTML!");
  }
});
