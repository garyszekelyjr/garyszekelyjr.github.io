<script lang="ts">
    let name: HTMLInputElement;
    let email: HTMLInputElement;
    let message: HTMLTextAreaElement;
</script>

<form
    class="h-100 d-flex flex-column p-3"
    on:submit={async () => {
        if (name && email && message) {
            await fetch(`${import.meta.env.VITE_DATABASE}`, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    message: message.value,
                })
            });
            name.value = "";
            email.value = "";
            message.value = "";
            alert("Message Sent!");
        }
    }}
>
    <label for="name" class="form-label">Name</label>
    <input bind:this={name} name="name" class="form-control mb-3" required />
    <label for="email" class="form-label">Email</label>
    <input bind:this={email} name="email" type="email" class="form-control mb-3" required />
    <label for="message" class="form-label">Message</label>
    <textarea bind:this={message} name="message" class="form-control flex-fill" required />
    <hr />
    <input type="submit" value="Send" class="btn btn-primary" />
</form>
