export default {
    input: './index.js',
    output: [{
        file: 'dist/ai_git.cjs',
        format: 'cjs',
        
    }, {
        file: 'dist/ai_git.mjs',
        format: 'esm'
    }]
}