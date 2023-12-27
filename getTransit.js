async function getTransit(stop) {
    let response = await fetch(`https://api-v3.mbta.com/predictions?filter[stop]=${stop}`, {
        headers: {'x-api-key': process.env.MBTAK}
    });
    let transit = await response.json();
    let westbound = [];
    let eastbound = [];
    for(let i = 0; i < transit.data.length; i++) {
        const now = Date.now();
        const arrival = new Date(transit.data[i].attributes.arrival_time);
        if (now < arrival && transit.data[i].attributes.direction_id == 0) { 
            let dif = Math.abs(arrival - Date.now());
            if (dif < 60000) {
                let trainin = `${Math.round(dif/1000)}s`
                eastbound.push(trainin)
            }
            else {
                let trainin = `${Math.round(dif/60000)}m`
                eastbound.push(trainin)               
            }}
        else if (now < arrival && transit.data[i].attributes.direction_id == 1) {
            let dif = Math.abs(arrival - Date.now());
            if (dif < 60000) {
                let trainin = `${Math.round(dif/1000)}s`
                westbound.push(trainin)
            }
            else {
                let trainin = `${Math.round(dif/60000)}m`
                westbound.push(trainin)               
            }}            
        };
        res = [westbound,eastbound]
        for(let i = 0; i < res.length; i++) {
            if (res[i].length > 3) {
                res[i] = res[i].slice(0,3)
            }
        };
    return res;
}

    module.exports = {
        getTransit,
      };


