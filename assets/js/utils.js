function hex2Buffer(hex) {
    return new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16))).buffer;
}

function buffer2Hex(buffer) {
    return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function dialogClick(event) {
    if(event.target.tagName === 'DIALOG') {
        let rect = event.target.getBoundingClientRect();
        let isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog)
            event.target.close();
    }
}