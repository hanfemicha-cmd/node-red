const bcrypt = require('bcryptjs');

// Read your variables directly from the Render Environment panel
const username = process.env.ADMIN_USER || "admin";
const clearPassword = process.env.ADMIN_PASSWORD || "password";

// Pre-hash your password so Node-RED can read it securely
const hashedPassword = bcrypt.hashSync(clearPassword, 8);

module.exports = {
    uiPort: process.env.PORT || 10000,
    mqttReconnectTime: 15000,
    serialReconnectTime: 15000,
    debugMaxLength: 1000,
    functionGlobalContext: {},
    exportGlobalContextKeys: false,
    
    // Hard-lock the Admin Login Gate
    adminAuth: {
        type: "credentials",
        users: [{
            username: username,
            password: hashedPassword,
            permissions: "*"
        }]
    },
    
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },
    editorTheme: {
        projects: {
            enabled: false
        }
    }
};
