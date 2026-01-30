let allProfiles = [];
 function toggleDarkMode() {
      document.body.classList.toggle("dark");
    }


function getUserId() {
    return document.getElementById('IdCopy')?.value.trim() || document.getElementById('Id').value.trim();
}

function clearFormFields() {
    const ids = ['Id', 'IdCopy', 'name1', 'job1', 'info1', 'phone1', 'email1', 'location1', 'aiPrompt'];

    // Clear input fields
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });

    // Clear innerHTML fields
    const fieldsToClear = ['name', 'job', 'idUser', 'info', 'phone', 'email', 'location', 'experienceList'];
    fieldsToClear.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.innerHTML = '';
    });

    // Clear Experience Inputs (except the first empty template)
    const experienceContainer = document.getElementById('experienceInputs');
    if (experienceContainer) {
        experienceContainer.innerHTML = `
            <div class="experience-entry">
                <input type="text" placeholder="Date" class="dateInput" />
                <input type="text" placeholder="Experience" class="expInput" />
            </div>
        `;
    }
}



 async function generateProfileAI() {
     const prompt = document.getElementById('aiPrompt').value.trim();
     if (!prompt) return alert('Please enter a job description.');

     const loader = document.getElementById('aiLoader');

     // 👉 Show the spinner
     loader.style.display = 'block';

     try {
         const response = await fetch("http://localhost:9999/ai/generate-profile", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ prompt: prompt })
         });

         const text = await response.text();

         let profile = {};
         try {
             profile = JSON.parse(text);
         } catch (e) {
             showToast("⚠️ AI did not return valid JSON.");
             return;
         }

         // Fill out form fields
         document.getElementById('name1').value = profile.name || '';
         document.getElementById('job1').value = profile.job || '';
         document.getElementById('info1').value = profile.info || '';
         document.getElementById('email1').value = profile.email || '';
         document.getElementById('phone1').value = profile.phone || '';
         document.getElementById('location1').value = profile.location || '';

         showToast("✨ AI profile generated!");
     } catch (err) {
         showToast("❌ Failed to generate profile.");
         console.error(err);
     } finally {
         // 👉 Always hide the spinner after completion
         loader.style.display = 'none';
     }
 }


function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = message;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

function showAllProfilesPanel() {
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("mainPanel").style.flex = "2";
  document.querySelectorAll('.tabs').forEach(el => el.style.display = 'none');
  document.getElementById("main").style.display = 'none';
  document.getElementById("backBtn").style.display = 'none';
}

function showDetailPanel(sectionId) {
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("mainPanel").style.flex = "1";
  document.querySelectorAll('.tabs').forEach(el => el.style.display = 'none');
  document.getElementById("main").style.display = 'block';
  document.getElementById(sectionId).style.display = 'block';
  document.getElementById("backBtn").style.display = 'inline-block';
}

function addExperienceField() {
  const container = document.getElementById('experienceInputs');
  const entry = document.createElement('div');
  entry.className = 'experience-entry';
  entry.innerHTML = `
      <input type="text" placeholder="Enter date" class="dateInput" />
      <input type="text" placeholder="Enter experience" class="expInput" />
  `;
  container.appendChild(entry);
}

async function save() {
  try {
    const sharedId = document.getElementById('Id').value.trim();

    const dateInputs = document.querySelectorAll('.dateInput');
    const expInputs = document.querySelectorAll('.expInput');
    const experienceList = [];

    for (let i = 0; i < dateInputs.length; i++) {
      const date = dateInputs[i].value.trim();
      const exp = expInputs[i].value.trim();
      if (date && exp) {
        experienceList.push({ date, experince: exp });
      }
    }

    const fullProfile = {
      id: sharedId || null,
      name: document.getElementById('name1').value.trim(),
      job: document.getElementById('job1').value.trim(),
      info: document.getElementById('info1').value.trim(),
      phone: document.getElementById('phone1').value.trim(),
      email: document.getElementById('email1').value.trim(),
      location: document.getElementById('location1').value.trim(),
      experinces: experienceList
    };

    const response = await fetch('/saveProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullProfile)
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    showToast(`✅ Profile saved with ID: ${data.id}`);
    showAllProfiles();
  } catch (error) {
    showToast(`❌ Error: ${error.message}`);
  }
}

async function update() {
const id = getUserId();
  if (!id) return alert("Enter ID to update.");

  const dateInputs = document.querySelectorAll('.dateInput');
  const expInputs = document.querySelectorAll('.expInput');
  const experienceList = [];

  for (let i = 0; i < dateInputs.length; i++) {
    const date = dateInputs[i].value.trim();
    const exp = expInputs[i].value.trim();
    if (date && exp) experienceList.push({ date, experince: exp });
  }

  const updatedProfile = {
    name: document.getElementById('name1').value.trim(),
    job: document.getElementById('job1').value.trim(),
    info: document.getElementById('info1').value.trim(),
    phone: document.getElementById('phone1').value.trim(),
    email: document.getElementById('email1').value.trim(),
    location: document.getElementById('location1').value.trim(),
    experinces: experienceList
  };

  const response = await fetch(`/About/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProfile)
  });

  if (!response.ok) {
    alert("❌ Failed to update");
  } else {
    showToast("✅ Profile updated");
    showAllProfiles();
  }
}

async function deleteProfile() {
const id = getUserId();
  if (!id) return alert("Enter ID to delete.");

  const confirmDelete = confirm(`Are you sure you want to delete profile ID ${id}?`);
  if (!confirmDelete) return;

  const response = await fetch(`/About/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    alert("❌ Failed to delete");
  } else {
    showToast("🗑️ Profile deleted");
    document.getElementById('result').innerText = "";
    showAllProfiles();
  }
}

async function aboutinfo() {
  try {
    const id = getUserId();
    if (!id) return alert("Please enter a user ID.");

    const response = await fetch('/About/' + id);

    if (!response.ok) {
        showToast(`❌ Server error: ${response.status}`);
        return;
    }

    const data = await response.json();

    if (data === null) {
        showToast(`🚫 No profile found for ID: ${id}`);
        return;
    }

    document.getElementById('name').innerHTML = `name: ${data.name || 'N/A'}`;
    document.getElementById('job').innerHTML = `job: ${data.job || 'N/A'}`;
    document.getElementById('idUser').innerHTML = `id: ${data.id || id}`;
    document.getElementById('info').innerHTML = `info: ${data.info || 'No info provided'}`;

    showDetailPanel('About');
    document.getElementById('About').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    console.error("About Info Error:", error);
    showToast(`❌ Network or unexpected error.`);
  }
}
async function experinceinfo() {
  const id = getUserId();
  if (!id) return alert("Please enter a user ID.");

  try {
    const response = await fetch(`/About/${id}`);

    if (!response.ok) {
        showToast(`❌ Server error: ${response.status}`);
        return;
    }

    const data = await response.json();

    if (data === null) {
        showToast(`🚫 No profile found for ID: ${id}`);
        return;
    }

    const list = document.getElementById('experienceList');
    list.innerHTML = '';

    const experiences = data.experincesList || data.experinceslist;

    if (!experiences || experiences.length === 0) {
      list.innerHTML = '<li>No experiences found.</li>';
    } else {
      experiences.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${e.date}</strong>: ${e.experince}`;
        list.appendChild(li);
      });
    }

    showDetailPanel('Experinces');
    document.getElementById('Experinces').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    console.error("Experience Info Error:", error);
    showToast(`❌ Network or unexpected error.`);
  }
}

async function contactinfo() {
  const id = getUserId();
  if (!id) return alert("Please enter a user ID.");

  try {
    const response = await fetch(`/About/${id}`);

    if (!response.ok) {
        showToast(`❌ Server error: ${response.status}`);
        return;
    }

    const data = await response.json();

    if (data === null) {
        showToast(`🚫 No profile found for ID: ${id}`);
        return;
    }

    const contact = data.contact || {};

    document.getElementById('phone').innerText = contact.phone || "No phone";
    document.getElementById('email').innerText = contact.email || "No email";
    document.getElementById('location').innerText = contact.location || "No location";

    showDetailPanel('Contact');
    document.getElementById('Contact').scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (error) {
    console.error("Contact Info Error:", error);
    showToast(`❌ Network or unexpected error.`);
  }
}


async function showAllProfiles() {
  try {
    const response = await fetch('/About');
    allProfiles = await response.json();
    renderProfiles(allProfiles);
  } catch (error) {
    console.error("❌ Error loading profiles:", error);
    document.getElementById('allProfilesContainer').innerText = `❌ Failed to load profiles`;
  }
}
function renderProfiles(profiles, highlight = '') {
  const container = document.getElementById('allProfilesContainer');
  container.innerHTML = '';

  const highlightText = (text) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.replace(regex, `<mark>$1</mark>`);
  };

  profiles.forEach(profile => {
    const card = document.createElement('div');
    card.className = 'profile-card-mini';
    card.style.cursor = 'pointer';

    card.innerHTML = `
      <h4>${highlightText(profile.name)}</h4>
      <p><strong>Job:</strong> ${highlightText(profile.job)}</p>
      <p><strong>Info:</strong> ${highlightText(profile.info)}</p>
      <p><strong>Phone:</strong> ${highlightText(profile.contact?.phone || 'N/A')}</p>
      <p><strong>Email:</strong> ${highlightText(profile.contact?.email || 'N/A')}</p>
      <p><strong>Location:</strong> ${highlightText(profile.contact?.location || 'N/A')}</p>
      <ul>
        ${(profile.experincesList || []).map(exp =>
          `<li><strong>${highlightText(exp.date)}</strong>: ${highlightText(exp.experince)}</li>`).join('')}
      </ul>
      <button onclick="openAIQuestionModal('Profile: ${profile.name}, Job: ${profile.job}, Info: ${profile.info}, Location: ${profile.contact?.location || ''}')">💬 Ask AI</button>
      <hr />
    `;

 // When user clicks on the card (not the button), open About section
 card.onclick = (e) => {
     if (e.target.tagName.toLowerCase() === 'button') return;

     // Set both Id fields if they exist
     const idField = document.getElementById('Id');
     const idCopyField = document.getElementById('IdCopy');

     if (idField) idField.value = profile.id;
     if (idCopyField) idCopyField.value = profile.id;

     aboutinfo();
 };

    container.appendChild(card);
  });
}

let currentProfilePrompt = "";

function openAIQuestionModal(profilePrompt) {
  currentProfilePrompt = profilePrompt;
  document.getElementById("aiQuestion").value = "";
  document.getElementById("aiResponseContainer").innerText = "";
  document.getElementById("aiModal").style.display = "flex";
}

async function sendAIQuestion() {
  const question = document.getElementById("aiQuestion").value.trim();
  const responseBox = document.getElementById("aiResponseContainer");

  if (!question) return alert("Please enter a question.");

  // Show question with spinner
  responseBox.innerHTML = `<strong>You:</strong> ${question} <div class="spinner-inline"></div>`;

  try {
    const response = await fetch("http://localhost:9999/ai/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: currentProfilePrompt + '. ' + question })
    });

    const result = await response.text();

    responseBox.innerHTML = `<strong>You:</strong> ${question}\n\n<strong>AI:</strong> ${result}`;
    document.getElementById("aiQuestion").value = ""; // reset input
  } catch (err) {
    console.error(err);
    responseBox.innerHTML = `<strong>You:</strong> ${question}\n\n⚠️ Failed to get response.`;
  }
}



// ========== FILTER & SORT ==========
function filterProfiles() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortType = document.getElementById('sortFilter').value;

    let filtered = allProfiles.filter(profile => {
        const text = `${profile.name} ${profile.job} ${profile.info} ${profile.contact?.email} ${profile.contact?.location}`.toLowerCase();
        return text.includes(searchTerm);
    });

    if (sortType === 'newest') {
        filtered.sort((a, b) => b.id - a.id);
    } else if (sortType === 'alpha') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'beta') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    document.getElementById('sortStatus').innerText =
        sortType === 'newest' ? '🆕 Showing newest profiles'
      : sortType === 'alpha' ? '🔠 Sorted A-Z'
      : sortType === 'beta' ? '🔡 Sorted Z-A'
      : '';

    renderProfiles(filtered, searchTerm);
}


window.onload = () => {
  showAllProfiles();
};