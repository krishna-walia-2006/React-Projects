
import { useLoaderData } from "react-router-dom"

function Github() {
    const data = useLoaderData();

    

//         .then(response => response.json())
//         .then(data => setData(data))
//     }, [])
  return (
    <div className="text-center m-5 bg-gray-600 text-white text-3xl p-4">
      Github Followers: {data.followers}
      <img src={data.avatar_url} alt="Avatar" className="rounded-full mx-auto mt-4" />
    </div>
  )

}
export default Github

export const githubLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary');
    const data = await response.json();
    return data;
}