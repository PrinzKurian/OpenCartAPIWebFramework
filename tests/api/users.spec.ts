
import {test, expect} from '@playwright/test'
import { log } from 'node:console';
import { stat } from 'node:fs';

let AUTH_TOKEN = {Authorization: 'Bearer 826d731cfd9aba52921950866e857dfdc650f111bc4d9544d34b844756e2766f'};

test('get user test', async ({ request }) => {
    
    let response = await request.get('https://gorest.co.in/public/v2/users/', {
        headers: AUTH_TOKEN
    });

    // console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

})

test('create a user test', async ({ request }) => {

    //JS Object
    let userData = {
        name: "uday",
        email: `automation_${Date.now()}@open.com`,
        gender: "male",
        status: "active"
    };
    
    //JS object to JSON: Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users/', {
        headers: AUTH_TOKEN, data: userData
    });

    // console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//201
    console.log(response.statusText());//Created

})

test('update a user test', async ({ request }) => {

    //JS Object
    let userData = {
        name: "uday101",
        email: `automation_${Date.now()}@open.com`,
        gender: "male",
        status: "Inactive"
    };
    
    //JS object to JSON: Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8692149', {
        headers: AUTH_TOKEN, data: userData
    });

    // console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//200
    console.log(response.statusText());//Ok

})

test('delete a user test', async ({ request }) => {
    
    //JS object to JSON: Serialization
    let response = await request.delete('https://gorest.co.in/public/v2/users/8692149', {
        headers: AUTH_TOKEN,
    });

    console.log(response.status());//204
    console.log(response.statusText());//No Content

}); 