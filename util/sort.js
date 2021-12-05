exports.byProperty = (name) => (o1, o2) => (o1[name] > o2[name]) - (o1[name] < o2[name]);
