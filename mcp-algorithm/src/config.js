import path from 'node:path';
export function loadConfig() {
    const defaultDir = path.join(process.env.USERPROFILE ?? process.env.HOME ?? '', 'Desktop', 'project', 'algorithm');
    return {
        algorithmDir: process.env.ALGORITHM_DIR || defaultDir,
        deepseekApiKey: process.env.DEEPSEEK_API_KEY ?? '',
        deepseekBaseUrl: process.env.DEEPSEEK_BASE_URL ?? 'https://api.deepseek.com/chat/completions',
        deepseekModel: process.env.DEEPSEEK_MODEL ?? 'deepseek-v4-flash',
        githubRepo: process.env.GITHUB_REPO ?? 'lmliheng/algorithm',
        githubBranch: process.env.GITHUB_BRANCH ?? 'master',
        maxResults: Number(process.env.MAX_RESULTS) || 5,
    };
}
