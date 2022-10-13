
const pattern1 = /\((.*):(.*):(.*)\)/g;
const pattern2 = /at (.*):(.*):(.*)/g;
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

function currentTime() {
    const iso = new Date().toISOString();
    return iso.substring(0, iso.length -1);
}

function parseStackLine(line) {
    pattern1.lastIndex = 0;
    pattern2.lastIndex = 0;
    let match = pattern1.exec(line);
    if (match !== null) {
        return match.slice(1, 3);
    }
    match = pattern2.exec(line);
    if (match !== null) {
        return match.slice(1, 3);
    }
    return null;
}

function timeStampToIsoString(timestamp) {
    const iso = new Date(timestamp).toISOString();
    return iso.substring(0, iso.length - 1);
}

function currentTimestampAndTimeInIsoFormat() {
    const currentTimeStamp = new Date().getTime();
    const currentTimeAsISOString = timeStampToIsoString(currentTimeStamp);
    return {currentTimeStamp, currentTimeAsISOString};
}

function findCallerLine(baseDir, stack) {
    const lines = stack.split('\n');
    for (i = 2; i < lines.length; i++) {
        const result = parseStackLine(lines[i]);
        if (result === null) {
            continue;
        }
        if (result[0].startsWith(baseDir)) {
            return result;
        }
    }
    return null;
}

function getFileLine(baseDir, stack) {
    const result = findCallerLine(baseDir, stack);
    if (result === null) {
        return null;
    }
    [fileName, lineNo] = result;
    return [shortenFileName(baseDir, fileName), lineNo];
}

module.exports = {
    currentTime,
    currentTimestampAndTimeInIsoFormat, 
    getFileLine 
};
