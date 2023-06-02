const Loading = () => {
    return (
        <div 
            className="loading_container" 
            style={{width: '100%', height: '100vh', overflowY: 'hidden'}}
        >
            <iframe 
                style={{width: '100%', height: '100%', border: 'none'}} 
                src="https://embed.lottiefiles.com/animation/144435" 
                title="loading" 
            />
        </div>
    )
}

export default Loading