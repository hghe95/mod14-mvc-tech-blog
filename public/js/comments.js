const commentForm = async (event) => {
    event.preventDefault();
    const post_id = document.querySelector(`.comment-form`);
    const comment_text = document.querySelector('textarea[name="comment-body"]');
    if (comment_text) {
        await fetch(`/api/comments`, {
            method: `post`,
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        document.location.reload();
    }
};

document.querySelector(`.comment-form`);
document.addEventListener(`submit`, commentForm);