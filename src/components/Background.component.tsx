function BackgroundComponent() {
    return (
        <div className="w-100 h-100 position-absolute d-flex flex-column justify-content-center text-end p-3">
            <div className="display-1">Hi, I'm Gary.</div>
            <div className="display-1">Welcome to my corner of the Internet.</div>
            <div className="text-start p-3" style={{ "width": "15%" }}>
                Email: gary.szekely.jr@gmail.com
                <br />
                Phone: (850) 628-9565
            </div>
        </div>
    );
}

export default BackgroundComponent;