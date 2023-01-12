const logout = async () => {
    const response = await fetch(`/api/users/logout`, {
        method: `post`,
        headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
        document.location.replace(`/`);
    })
    .catch(err => console.log(err));
};
    
document.querySelector(`.logout`);
document.addEventListener(`click`, logout);