Markdown# 🚀 Connect Auth — Ultimate Full-Stack Single-Page Auth Engine

A production-grade, highly responsive, single-page authentication web application built using the **MERN Stack**. Featuring reactive onboarding states, automated transactional SMTP emails, and a custom multi-box numeric OTP verification flow engineered to bypass component unmounting bugs.

---

## 📂 Master Directory Map

Create this documentation file directly in the primary workspace root alongside your decoupled client/server architecture:

```text
auth-web/             # 🏢 Project Workspace Root
├── client/           # 💻 Frontend Space (Vite, React, Tailwind CSS)
│   ├── src/
│   │   ├── assets/   # Graphics & Shared media assets (navLogo.png)
│   │   ├── context/  # AppContent Global Context Manager
│   │   └── pages/    # Main App Layouts (Hero Page + ResetPassword UI)
│   └── package.json
├── server/           # ⚙️ Backend Core (Node, Express, Mongoose)
│   ├── .env          # 🔒 SECRETS LIVE HERE ONLY (Never commit this!)
│   ├── server.js     # Server Initialization Entry-point
│   └── package.json
└── README.md         # 🎯 (You are reading this)
⚙️ Environment Configuration (server/.env)Create a .env file inside your server/ root folder and insert your explicit connection details:Code snippetPORT=5000
MONGODB_URI=your_mongodb_connection_uri_string
SECRET_KEY=your_jwt_signing_private_key
NODE_ENV=development

# SMTP NodeMailer Configuration
SENDER_EMAIL=your_verified_sender_email@domain.com
SMTP_PASSWORD=your_secure_smtp_app_password
🛠️ Architecture & DependenciesFrontend Components (client/)React.js (Single-Page Form State Engine): Implements dynamic multi-step interface workflows within a cohesive state layout to safeguard against data drops.Ref Array Focus Managers: Utilizes mutable useRef([]) arrays mapped to capture single-character fields with cross-input auto-focusing and Backspace reverse-traversal handlers.Tailwind CSS: Fully optimized UI featuring modern layout definitions (bg-linear-to-br from-purple-700 to-emerald-800).Axios (Stateful Layer): Transmits cookies with native payload bundles using withCredentials = true.Backend Components (server/)Node.js & Express.js: Strict REST API pipelines running over structured execution routing.MongoDB & Mongoose ODM: Schema-enforced user definitions backing security states.Bcryptjs Cryptography: Ensures secure encryption using one-way salt rounds for password modification.🗄️ Database Model Contract (userModel.js)JavaScript{
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: '' },
  resetOtpExpireAt: { type: Number, default: 0 }
}
🗺️ RESTful API Endpoint Directory (/api/auth)ProtocolRouteAccess MiddlewareFunctional ScopePOST/registerPublicRegisters entry model, salts passwords, and fires out an asynchronous welcome email.POST/loginPublicMatches structural parameters; assigns signed session payloads via HttpOnly cookies.POST/logoutPublicInstantly voids browser headers to terminate state activity securely.POST/send-Verify-OtpuserAuthForces token generations to verify active email account entities.POST/verify-OtpuserAuthAssesses validity profiles of user-provided registration verification keys.GET/is-authuserAuthChecks browser cookie health on navigation context hooks.POST/send-reset-otpPublicValidates email system existence and provisions a 15-minute recovery token.POST/reset-passwordPublicValidates string tokens to commit updated password hashes.🚀 Deployment Playbook1. Boot up Backend ResourcesBashcd server
npm install
npm start
2. Launch Client App & Hero LayoutsBashcd client
npm install
npm run dev
🔒 Crucial Architectural Security Features ImplementedDirect DOM Payload Extraction: Bypasses asynchronous React state delay bugs inside multi-stage workflows by extracting current OTP characters (inputRef.current.map()) directly during the password update sequence.Anti-Bypass Guardrails: Added missing termination vectors (return res.json(...)) ensuring that missing parameters drop execution instantly rather than updating documents with empty variables.Type-Coercion Neutralization: Wraps user inputs and database fields directly inside explicit string evaluation cast parameters String(db_otp) === String(input_otp) preventing Number-vs-String comparison mismatches.Shadow Variable Separation: Cleaned up iterative variables (el) => ... inside input mapping nodes to insulate Native Window Event listeners from event execution breaks.