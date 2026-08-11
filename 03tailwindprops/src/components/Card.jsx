
function Card({channel,btntext1='visit me',btntext2='visit me'}) {
    console.log(channel);
    
    return (
        <div className="max-w-sm mb-8 rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full" src="https://plus.unsplash.com/premium_photo-1709311897767-f6ce7e1fc227?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" alt="Card Image" />
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">Card Title</h2>
                <p className="text-gray-700 text-base">
                    {channel}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{btntext1}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{btntext2}</span>
            </div>
        </div>
    );
}

export default Card;