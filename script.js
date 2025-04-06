document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const certificateUpload = document.getElementById("certificateUpload");
    const certificateUploadArea = document.getElementById("certificateUploadArea");
    const certificateFileName = document.getElementById("certificateFileName");
    const excelUpload = document.getElementById("excelUpload");
    const excelUploadArea = document.getElementById("excelUploadArea");
    const excelFileName = document.getElementById("excelFileName");
    const nameInput = document.getElementById("nameInput");
    const addNameBtn = document.getElementById("addNameBtn");
    const namesList = document.getElementById("namesList");
    const selectAllBtn = document.getElementById("selectAllBtn");
    const unselectAllBtn = document.getElementById("unselectAllBtn");
    const clearNamesBtn = document.getElementById("clearNamesBtn");
    const noCertificate = document.getElementById("noCertificate");
    const canvas = document.getElementById("certificateCanvas");
    const previewBtn = document.getElementById("previewBtn");
    const generateBtn = document.getElementById("generateBtn");
    const statusBar = document.getElementById("statusBar");
    const statusText = document.getElementById("statusText");
    const progressBar = document.getElementById("progressBar");
    const statusCount = document.getElementById("statusCount");
    
    // State
    let certificateImage = null;
    let names = [];
    let selectedName = "";
    const ctx = canvas.getContext("2d");
    let isDarkMode = false;
  
    // Theme Toggle
    themeToggle.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
      themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    });
  
    // Certificate Upload
    certificateUploadArea.addEventListener("click", () => certificateUpload.click());
    certificateUploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      certificateUploadArea.style.borderColor = "var(--primary-color)";
    });
    certificateUploadArea.addEventListener("dragleave", () => {
      certificateUploadArea.style.borderColor = "var(--border-color)";
    });
    certificateUploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      certificateUploadArea.style.borderColor = "var(--border-color)";
      if (e.dataTransfer.files.length > 0) {
        handleCertificateFile(e.dataTransfer.files[0]);
      }
    });
  
    certificateUpload.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        handleCertificateFile(e.target.files[0]);
      }
    });
  
    function handleCertificateFile(file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          certificateImage = new Image();
          certificateImage.onload = function () {
            canvas.width = certificateImage.width;
            canvas.height = certificateImage.height;
            ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);
            
            noCertificate.classList.add("hidden");
            canvas.classList.remove("hidden");
            
            // Display filename
            certificateFileName.textContent = `File: ${file.name}`;
            certificateFileName.classList.remove("hidden");
          };
          certificateImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
    // Excel Upload
    excelUploadArea.addEventListener("click", () => excelUpload.click());
    excelUploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      excelUploadArea.style.borderColor = "var(--primary-color)";
    });
    excelUploadArea.addEventListener("dragleave", () => {
      excelUploadArea.style.borderColor = "var(--border-color)";
    });
    excelUploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      excelUploadArea.style.borderColor = "var(--border-color)";
      if (e.dataTransfer.files.length > 0) {
        handleExcelFile(e.dataTransfer.files[0]);
      }
    });
  
    excelUpload.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        handleExcelFile(e.target.files[0]);
      }
    });
  
    function handleExcelFile(file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet);
          
          // Fix: Reset file input value to allow reloading the same file
          excelUpload.value = "";
          
          const importedNames = json.map(row => {
            // Try different possible column names
            return row["Name"] || row["name"] || row["NAME"] || Object.values(row)[0];
          }).filter(Boolean);
          
          // Add to names list
          importedNames.forEach(name => {
            if (!names.includes(name)) {
              names.push(name);
            }
          });
          
          // Display filename
          excelFileName.textContent = `File: ${file.name} (${importedNames.length} names)`;
          excelFileName.classList.remove("hidden");
          
          // Update names list
          renderNamesList();
        };
        reader.readAsArrayBuffer(file);
      }
    }
  
    // Manual Name Input
    addNameBtn.addEventListener("click", addName);
    nameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addName();
      }
    });
  
    function addName() {
      const name = nameInput.value.trim();
      if (name && !names.includes(name)) {
        names.push(name);
        nameInput.value = "";
        renderNamesList();
      }
    }
  
    // Direct Edit Function (replaces modal)
    function editName(index) {
      const currentName = names[index];
      const newName = prompt(`Edit name:`, currentName);
      
      if (newName && newName.trim() && newName !== currentName) {
        names[index] = newName.trim();
        renderNamesList();
      }
    }
  
    // Names List Management
    function renderNamesList() {
      if (names.length === 0) {
        namesList.innerHTML = `<p class="text-center">No names added yet</p>`;
        return;
      }
  
      namesList.innerHTML = "";
      names.forEach((name, index) => {
        const item = document.createElement("div");
        item.className = "checkbox-item";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `name-${index}`;
        checkbox.checked = true;
        checkbox.dataset.name = name;
        checkbox.dataset.index = index;
        
        const label = document.createElement("label");
        label.htmlFor = `name-${index}`;
        label.textContent = name;
        
        const actions = document.createElement("div");
        actions.className = "name-actions";
        
        const editIcon = document.createElement("span");
        editIcon.className = "action-icon";
        editIcon.innerHTML = "✏️";
        editIcon.title = "Edit name";
        editIcon.addEventListener("click", () => editName(index));
        
        actions.appendChild(editIcon);
        
        item.appendChild(checkbox);
        item.appendChild(label);
        item.appendChild(actions);
        namesList.appendChild(item);
        
        // Add click handler for preview
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            previewCertificate(name);
            selectedName = name;
          }
        });
        
        label.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          previewCertificate(name);
          selectedName = name;
          
          // Update checkbox state
          checkbox.checked = !checkbox.checked;
        });
      });
    }
  
    // Select/Unselect/Clear All
    selectAllBtn.addEventListener("click", () => {
      document.querySelectorAll("#namesList input[type='checkbox']").forEach(cb => {
        cb.checked = true;
      });
    });
  
    unselectAllBtn.addEventListener("click", () => {
      document.querySelectorAll("#namesList input[type='checkbox']").forEach(cb => {
        cb.checked = false;
      });
    });
  
    clearNamesBtn.addEventListener("click", () => {
      names = [];
      renderNamesList();
      excelFileName.classList.add("hidden");
      // Fix: Reset Excel file input
      excelUpload.value = "";
    });
  
    // Preview Certificate
    previewBtn.addEventListener("click", () => {
      const selectedCheckboxes = document.querySelectorAll("#namesList input[type='checkbox']:checked");
      if (selectedCheckboxes.length > 0) {
        const name = selectedCheckboxes[0].dataset.name;
        previewCertificate(name);
      }
    });
  
    function previewCertificate(name) {
      if (!certificateImage) {
        alert("Please upload a certificate template first");
        return;
      }
  
      canvas.width = certificateImage.width;
      canvas.height = certificateImage.height;
      ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);
  
      // Add name to certificate
      ctx.font = 'bold 60px Arial';
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      const nameX = (440 + 1550) / 2; // 995
      const nameY = 700;
      ctx.fillText(name, nameX, nameY);
    }
  
    // Generate Certificates
    generateBtn.addEventListener("click", generateCertificates);
  
    function generateCertificates() {
      const selectedCheckboxes = document.querySelectorAll("#namesList input[type='checkbox']:checked");
      const selectedNames = Array.from(selectedCheckboxes).map(cb => cb.dataset.name);
      
      if (!certificateImage || selectedNames.length === 0) {
        alert("Please upload a certificate template and select at least one name.");
        return;
      }
  
      // Show status bar
      statusBar.classList.remove("hidden");
      statusText.innerHTML = `<span class="spinner"></span> Generating certificates...`;
      statusCount.textContent = `0/${selectedNames.length}`;
      progressBar.style.width = "0%";
  
      let zip = new JSZip();
      let processed = 0;
  
      selectedNames.forEach((name, index) => {
        setTimeout(() => {
          generateCertificate(name, zip, () => {
            processed++;
            progressBar.style.width = `${(processed / selectedNames.length) * 100}%`;
            statusCount.textContent = `${processed}/${selectedNames.length}`;
            
            if (processed === selectedNames.length) {
              statusText.innerHTML = "Creating download file...";
              
              zip.generateAsync({ type: "blob" }).then(content => {
                statusText.innerHTML = "Complete!";
                
                const zipLink = document.createElement("a");
                zipLink.href = URL.createObjectURL(content);
                zipLink.download = "certificates.zip";
                zipLink.click();
                
                // Hide status bar after download starts
                setTimeout(() => {
                  statusBar.classList.add("hidden");
                }, 2000);
              });
            }
          });
        }, index * 300); // spacing out to avoid browser freeze
      });
    }
  
    function generateCertificate(name, zip, callback) {
      canvas.width = certificateImage.width;
      canvas.height = certificateImage.height;
      ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);
  
      // Set font and alignment
      ctx.font = 'bold 60px Arial';
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
  
      // Position name above the underline
      const nameX = (440 + 1550) / 2; // 995
      const nameY = 700; // 20px above the line
      ctx.fillText(name, nameX, nameY);
  
      // Export and add to ZIP
      canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onload = function (event) {
          const base64 = event.target.result.split(",")[1];
          zip.file(`certificate_${name}.png`, base64, { base64: true });
          callback();
        };
        reader.readAsDataURL(blob);
      }, "image/png");
    }
});