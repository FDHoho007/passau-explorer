const User = {
    login: () => {
        if(localStorage.getItem("privateKey") == null || localStorage.getItem("publicKey") == null) {
            crypto.subtle.generateKey({name: "ECDSA", namedCurve:"P-256"}, true, ["sign", "verify"]).then(keys => {
                crypto.subtle.exportKey("pkcs8", keys.privateKey).then(exported_key => 
                    localStorage.setItem("privateKey", btoa(ab2str(exported_key))));
                crypto.subtle.exportKey("spki", keys.publicKey).then(exported_key => 
                    localStorage.setItem("publicKey", btoa(ab2str(exported_key))));
            });
        }
    },
    publicKey: () => {
        return localStorage.getItem("publicKey");
    },
    sign: () => {

    },
    getAdminToken: () => {
        return localStorage.getItem("adminToken");
    },
    setAdminToken: (adminToken) => {
        if(adminToken == null)
            localStorage.removeItem("adminToken");
        else
            localStorage.setItem("adminToken", adminToken);
    }
}