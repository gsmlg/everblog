exports.production = process.env.NODE_ENV === 'production';
exports.development = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
exports.test = process.env.NODE_ENV === 'test';
