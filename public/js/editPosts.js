const editPosts = async (event) => {
    event.preventDefault();
    const title = document.querySelector(`input[name="post-title"]`).value;
    const post_text = document.querySelector(`textarea[name="post-text"]`).value;
    const id = window.location.toString().split(`/`)[
        window.location.toString().split(`/`).length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: `put`,
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/dashbaord`);
    } else {
        alert(response.statusText);
    }
}