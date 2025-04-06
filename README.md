# 🏆 Certificate Name Generator Web App

A fully responsive and modern Certificate Name Generator that allows users to generate personalized certificates in bulk using a certificate template and names from an Excel sheet or manual input.

---

## 🚀 Features – v1.0

### 🌗 Theme Toggle
- Switch between Light and Dark modes with a simple toggle.
- Smooth transition and accessible UI in both modes.

### 🖼️ Certificate Template Upload
- Upload certificate background image (`.png`, `.jpg`, etc.) via:
  - Click-to-upload
  - Drag-and-drop
- Displays the uploaded file name.

### 📥 Excel Upload for Name Import
- Upload an Excel file (`.xlsx` or `.xls`) with names in a single column.
- Automatically extracts and displays the names.
- Shows count and filename after import.

### ✍️ Manual Name Input
- Add names manually through an input field.
- "Enter" key also works as a quick add.
- No duplicate name entries.

### 🧾 Names List Management
- View all names with checkboxes.
- Built-in management tools:
  - ✅ **Select All**
  - ❌ **Unselect All**
  - 🧹 **Clear All**
  - ✏️ **Edit name inline**

### 👀 Certificate Preview
- Real-time preview of certificate for any selected name.
- Canvas-based rendering with accurate name positioning and styling.

### 🛠️ Generate Certificates
- Generate PNG certificates for all selected names.
- Automatically zipped and downloaded in a single `.zip` file.
- Live generation status with:
  - ✅ Count of completed vs total
  - 📊 Progress bar
  - 🔄 Spinner animation

### 📱 Responsive Design
- Two-column layout on desktop.
- Stacks into single-column layout on smaller screens.
- Fully mobile-friendly.
- 🌒 Dark Mode Styling
- 🗂️ Drag-and-Drop Support

### ♻️ File Reset
- Automatically resets file inputs for re-uploads.

---

## 👤 Credits

- 💡 **JavaScript Name Certificate Generator Logic**: Thanks to **Ashish** for contributing the core logic of name rendering and certificate generation on canvas.

---

## 🧪 Version 2 – Coming Soon

We're working on exciting new features for **v2.0**, including:

- 🎨 Font and color customization
- 🧾 Custom field mapping (Event, Date, Title, etc.)
- 📌 Drag-to-position for name placement
- 📝 Dynamic title & signature placement
- 🖨️ PDF export support
- 📁 Multiple template management
- 🔧 More settings for name formatting
- 🌐 Multi-language support
- 🎯 AI-based name auto-alignment
- 🔒 Better validations and auto-save
- 📤 Export logs or generation reports

Stay tuned... 💥

---

## 📂 Project Structure

```plaintext
📁 project-folder/
│
├── index.html         ← Main HTML structure
├── style.css          ← Custom styling with dark mode
├── script.js          ← All interactive functionality
└── README.md          ← You're here!