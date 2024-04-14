import { useEffect, useState } from 'react'

interface GithubData {
    followers: number;
    avatar_url: string;
}

function Github() {
    const [githubData, setGithubData] = useState<GithubData>({
        followers: 0,
        avatar_url: ''
    })

    useEffect(() => {
        fetch('https://api.github.com/users/ankitray-dev')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setGithubData(data)
        })
    }, [])
    
    return (
        <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {githubData.followers}
        <img src={githubData.avatar_url} alt="Github picture" width={300} />
        </div>
    )
}

export default Github

// eslint-disable-next-line react-refresh/only-export-components
export const githubInfoLoader = async (): Promise<GithubData> => {
    const response = await fetch('https://api.github.com/users/ankitray-dev')
    return response.json()
}

