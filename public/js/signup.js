const signupForm = async (event) => {
    event.preventDefault();
    const username = document.querySelector(`#username-signup`).value;
    const password = document.querySelector(`#password-signup`).value;

    if (username && password) {
        const response = await fetch(`/api/users`, {
            method: `post`,
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector(`.signup-form`);
document.addEventListener(`submit`, signupForm);