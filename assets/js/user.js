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
    adminInfo: null,
    loadAdminInfo: async () => {
        let adminToken = localStorage.getItem("adminToken");
        if(adminToken != null) {
            let result = await fetch(Badge.HOST + "/admin-" + adminToken + ".json");
            if(result.status != 200) {
                User.setAdminToken(null);
                location.reload();
            } else {
                User.adminInfo = await result.json();
                for(let publicKey in User.adminInfo)
                    User.adminInfo[publicKey].meta = await (await fetch(Badge.HOST + "/meta/" + User.adminInfo[publicKey].uuid + ".json")).json();
            }
        }
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