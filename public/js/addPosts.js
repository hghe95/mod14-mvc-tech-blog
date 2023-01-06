const addPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector(`input[name="post-title"]`).value;
    const content = document.querySelector(`textarea[name="post-content"]`).value;

    await fetch(`/api/posts`, {
        method: `post`,
        body:JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        document.location.replace(`/dashboard`);
    })
    .catch(err => console.log(err))
}

document.querySelector(`.new-post`);
document.addEventListener(`submit`, addPostHandler);