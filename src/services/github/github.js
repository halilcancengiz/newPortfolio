export const getProfileInfoFromGithub = async (setGithubInfo) => {
    const username = "halilcancengiz";
    const [userData, subscriptionData] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`).then(response => response.json()),
        fetch(`https://api.github.com/users/${username}/subscriptions`).then(response => response.json())
    ]);
    const totalStars = subscriptionData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const { public_repos, followers, following } = userData;
    const languagePercentages = await getLanguageStats(username);
    const allInfo = {
        publicRepos: public_repos,
        followers: followers,
        following: following,
        totalStars: totalStars,
        languagePercentages: languagePercentages
    };
    setGithubInfo(allInfo);
    return allInfo;
};

const getLanguageStats = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await response.json();
    const languageStats = {};
    for (let repo of repos) {
        const repoResponse = await fetch(repo.languages_url);
        const repoLanguages = await repoResponse.json();
        for (let language in repoLanguages) {
            if (!languageStats[language]) {
                languageStats[language] = 0;
            }
            languageStats[language] += repoLanguages[language];
        }
    }
    const totalBytes = Object.values(languageStats).reduce((a, b) => a + b, 0);
    for (let language in languageStats) {
        const percentage = ((languageStats[language] / totalBytes) * 100).toFixed(2);
        languageStats[language] = `${percentage}%`;
    }
    return languageStats;
}
