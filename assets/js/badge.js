const ECDSA_P256 = {name: "ECDSA", namedCurve: "P-256", hash: {name: "SHA-256"}};

const Badge = {
    HOST: "https://badges.passau-explorer.fs-info.de",
    allBadges: async () => {
        let index = await (await fetch(Badge.HOST + "/svg/index.json")).json();
        let meta = JSON.parse(localStorage.getItem("meta") || "{}");
        let badges = {};
        for(let badge_pubKey in index) {
            let collection = index[badge_pubKey];
            if(!(collection in badges))
                badges[collection] = {};
            badges[collection][badge_pubKey] = {};
            if(badge_pubKey in meta)
                badges[collection][badge_pubKey] = meta[badge_pubKey];
            badges[collection][badge_pubKey]["collected"] = badge_pubKey in meta;
        }
        return badges;
    },
    collectBadge: async (bagde_public_key, badge_private_key, bagde_uuid) => {
        let badgeMeta = await (await fetch(Badge.HOST + "/meta/" + bagde_uuid + ".json")).json();
        let key = await crypto.subtle.importKey("pkcs8", str2ab(atob(badge_private_key)), ECDSA_P256, true, ["sign"]);
        let signature = btoa(ab2str(await crypto.subtle.sign(ECDSA_P256, key, new TextEncoder().encode(User.publicKey()))));
        let signatures = JSON.parse(localStorage.getItem("signatures") || "{}");
        signatures[bagde_public_key] = signature;
        localStorage.setItem("signatures", JSON.stringify(signatures));
        let meta = JSON.parse(localStorage.getItem("meta") || "{}");
        meta[bagde_public_key] = badgeMeta;
        localStorage.setItem("meta", JSON.stringify(meta));
    },
    loadBadges: async () => {
        let badges = await Badge.allBadges();
        let main = document.getElementsByTagName("main")[0];
        for(let e of [...main.children])
            if(e.classList.contains("collection"))
                e.remove();
        for(let collection in badges) {
            let collection_div = document.createElement("div");
            collection_div.classList.add("collection");
            let collection_title = document.createElement("div");
            collection_title.classList.add("title");
            collection_title.innerText = collection.replaceAll("_", " ");
            collection_div.appendChild(collection_title);
            let collection_content = document.createElement("div");
            collection_content.classList.add("content");
            for(let badge_public_key in badges[collection]) {
                let badge_img = document.createElement("img");
                badge_img.src = Badge.HOST + "/svg/" + encodeURIComponent(badge_public_key) + ".svg";
                if(badges[collection][badge_public_key].collected) {
                    badge_img.classList.add("collected");
                    badge_img.onclick = () => {};
                }
                else
                    badge_img.onclick = () => {};
                collection_content.appendChild(badge_img);
            }
            collection_div.appendChild(collection_content);
            main.appendChild(collection_div);
        }
    }
}