let login = document.querySelector("#login");
let pass = document.querySelector("#pass");
let mail = document.querySelector("#mail");
let name = document.querySelector("#name");

const createUser = (data) => {
    fetch('https://looklikeliedns.onrender.com/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'same-origin',
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return error();
            }
        })
        .then((response) => {
            setServerTime(response);
            alert('You are successfully registered in system');
            window.location.href = '/';
        });
};

const getSignUpData = () => {
    return {
        name: name,
        email: mail,
        login: login,
        password: pass,
        superToken: '',
    };
};


let btn = document.querySelector("#add-btn");
btn.addEventListener("click", () => {
    let data = getSignUpData();

    fetch('https://looklikeliedns.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'same-origin',
        body: JSON.stringify({
            formFields: [
                {
                    id: 'email',
                    value: data.email,
                },
                {
                    id: 'password',
                    value: data.password,
                },
            ],
        }),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Failed to sign un user: ${response.statusText}`);
        }
    }).then((response) => {
        data.superTokenId = response.user.id;
        createUser(data);
        window.location.href = '/';
    })
});
