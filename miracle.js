// The Miracle App - where hopes meet prayers
const MIRACLE_PROBABILITY = 0.001;

function requestMiracle(wish) {
    const roll = Math.random();
    if (roll < MIRACLE_PROBABILITY) {
        console.log(`✨ MIRACLE GRANTED: ${wish} ✨`);
        return { granted: true, wish, probability: roll };
    }
    console.log(`🙏 Keep hoping and praying... (${wish})`);
    return { granted: false, wish, probability: roll };
}

function bulkPray(wishes) {
    return wishes.map(requestMiracle);
}

module.exports = { requestMiracle, bulkPray, MIRACLE_PROBABILITY };
