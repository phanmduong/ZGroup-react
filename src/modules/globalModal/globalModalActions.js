


export function openModalRegisterDetail(redirectUrl = '') {
    // redirectUrl = redirectUrl.match(/[0-9]+/)[0];
    console.log(redirectUrl);
    history.pushState({
        prevUrl: window.location.href
    }, "modal", redirectUrl);
    window.dispatchEvent(new Event('popstate'));
}
