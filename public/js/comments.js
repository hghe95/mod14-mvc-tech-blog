const commentForm = async (event) => {
    event.preventDefault();
    const post_id = document.querySelector(`.new-comment-form`);
    const comment_text = document.querySelector('textarea[name="comment-body"]');
    if (comment_text) {
        const repsonse = await fetch(`/api/comments`, {
            method: `post`,
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector(`.new-comment-form`);
document.addEventListener(`submit`, commentForm);