export function openModalRegisterDetail(redirectUrl = '') {
    // redirectUrl = redirectUrl.match(/[0-9]+/)[0];
    console.log(redirectUrl);
    history.pushState({
        prevUrl: window.location.href
    }, "modal", redirectUrl);
    window.dispatchEvent(new Event('popstate'));
}

export function openModalStaffDetail(staffId) {
    // redirectUrl = redirectUrl.match(/[0-9]+/)[0];
    const redirectUrl = `hr/staff/${staffId}`;
    console.log(redirectUrl);
    history.pushState({
        prevUrl: window.location.href
    }, "modal", redirectUrl);
    window.dispatchEvent(new Event('popstate'));
}
