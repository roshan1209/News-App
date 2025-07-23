module.exports = {
    presets: [
        ['next/babel', {
            'preset-react': {
                runtime: 'automatic'  // 👈 Enables no-React import in files
            }
        }]
    ]
};
