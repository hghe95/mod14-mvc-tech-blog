const editPosts = async (event) => {
    event.preventDefault();
    const title = document.querySelector(`input[name="post-title"]`).value;
    const content = document.querySelector(`textarea[name="content"]`).value.trim();
    const id = window.location.toString().split(`/`)[
        window.location.toString().split(`/`).length - 1
    ];

    await fetch(`/api/posts/${id}`, {
        method: `put`,
        body: JSON.stringify({
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

document.querySelector('.edit-post')
document.addEventListener('submit', editPosts);