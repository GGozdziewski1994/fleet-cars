const rand = function() {
    return Math.random().toString(36).substr(2);
};

const token = function() {
    return rand() + rand();
};

export default token;