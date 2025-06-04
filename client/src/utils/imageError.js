const handleImageError = (event) => {
    if (!event.target.dataset.error) {
        event.target.dataset.error = "true";
        event.target.src = "/imgs/default-img.png";
    }
}
export default handleImageError
