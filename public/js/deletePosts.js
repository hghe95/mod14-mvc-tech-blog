const deletePosts = async (event) => {
    event.preventDefault();
    const id = window.location.toString().split(`/`)[
        window.location.toString().split(`/`).length - 1
    ];

    await fetch(`/api/posts/${id}`, {
        method: `delete`,
        body: JSON.stringify({
            post_id
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

document.querySelector(`.delete-post`);
document.addEventListener(`click`, deletePosts);