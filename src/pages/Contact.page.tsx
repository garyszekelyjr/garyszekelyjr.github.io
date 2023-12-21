import { useState } from "react";

function Contact() {
    const [sending, setSending] = useState(false);

    return (sending ? (
        <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" />
        </div>
    ) : (
        <form onSubmit={async (e) => {
            e.preventDefault();
            setSending(true);
            const form = e.currentTarget;
            await fetch(`${import.meta.env.VITE_DATABASE}`, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    name: (form.elements.namedItem('name') as HTMLInputElement).value,
                    email: (form.elements.namedItem('email') as HTMLInputElement).value,
                    message: (form.elements.namedItem('message') as HTMLInputElement).value
                })
            });
            setSending(false);
        }}>
            <label className="form-label">Name</label>
            <input name='name' className="form-control" />
            <br />
            <label className="form-label">Email</label>
            <input name='email' className="form-control" />
            <br />
            <label className="form-label">Message</label>
            <textarea name='message' className="form-control flex-fill" />
            <br />
            <button type='submit' className="btn btn-primary w-100">Send</button>
        </form>
    ));

}

export default Contact;