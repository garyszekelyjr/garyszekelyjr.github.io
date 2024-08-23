import { useRef } from "react";

function ContactPage() {
    const name = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);
    const message = useRef<HTMLTextAreaElement | null>(null);

    return (
        <>
            <div className="row h-100">
                <div className="col d-flex flex-column p-3">
                    <label className="form-label">Name</label>
                    <input ref={name} className="form-control mb-3" required />
                    <label className="form-label">Email</label>
                    <input ref={email} type="email" className="form-control mb-3" required />
                    <label className="form-label">Message</label>
                    <textarea ref={message} className="form-control flex-fill" required />
                    <hr />
                    <button onClick={async () => {
                        if (name.current && email.current && message.current) {
                            await fetch(`${import.meta.env.VITE_DATABASE}`, {
                                method: 'POST',
                                mode: 'no-cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    name: name.current.value,
                                    email: email.current.value,
                                    message: message.current.value
                                })
                            });
                            name.current.value = '';
                            email.current.value = '';
                            message.current.value = '';
                            alert('Message Sent!');
                        }
                    }} className="btn btn-primary">Send</button>
                </div>
            </div>
        </>
    );
}

export default ContactPage;