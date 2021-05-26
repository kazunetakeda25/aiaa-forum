const TapCloseComponent = {
    init() {
        const handleClickEvent = (e) => {
            hideAll(e)
        }
        this.el.addEventListener('click', handleClickEvent, true)
    },
}
export { TapCloseComponent }